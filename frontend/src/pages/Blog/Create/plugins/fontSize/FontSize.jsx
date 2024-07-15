import { $patchStyleText } from "@lexical/selection";
import { $getSelection } from "lexical";
import React from "react";
import "./FontSize.css";
const MIN_ALLOWED_FONT_SIZE = 8;
const MAX_ALLOWED_FONT_SIZE = 72;
const DEFAULT_FONT_SIZE = 15;

// eslint-disable-next-line react/prop-types
const FontSize = ({ selectionFontSize, editor }) => {
  const [inputValue, setInputValue] = React.useState(selectionFontSize);
  const [inputChangeFlag, setInputChangeFlag] = React.useState(false);
  const [selection, setSelection] = React.useState(getSelection());
  const calculateNextFontSize = (currentFontSize, updateType) => {
    if (updateType === "increment") currentFontSize++;
    else currentFontSize--;
    return currentFontSize;
  };

  const updateFontSizeInSelection = React.useCallback(
    (newFontSize, updateType) => {
      const getNextFontSize = (prevFontSize) => {
        if (!prevFontSize) {
          prevFontSize = `${DEFAULT_FONT_SIZE}px`;
        }
        prevFontSize = prevFontSize.slice(0, -2);
        const nextFontSize = calculateNextFontSize(
          Number(prevFontSize),
          updateType
        );
        return `${nextFontSize}px`;
      };

      editor.update(() => {
        if (editor.isEditable()) {
          const selection = $getSelection();
          console.log("selection.style: " + getNextFontSize());
          console.log(newFontSize);
          if (selection !== null) {
            $patchStyleText(selection, {
              "font-size": newFontSize || getNextFontSize,
            });
          }
        }
      });
    },
    [editor]
  );

  const handleButtonClick = (updateType) => {
    if (inputValue !== "") {
      const nextFontSize = calculateNextFontSize(
        parseInt(inputValue),
        updateType
      );
      setInputValue(nextFontSize + "");
      updateFontSizeInSelection(nextFontSize + "px", null);
    } else {
      updateFontSizeInSelection(null, updateType);
    }
  };

  const updateFontSizeByInputValue = (inputValueNumber) => {
    let updatedFontSize = inputValueNumber;
    if (inputValueNumber > MAX_ALLOWED_FONT_SIZE) {
      updatedFontSize = MAX_ALLOWED_FONT_SIZE;
    } else if (inputValueNumber < MIN_ALLOWED_FONT_SIZE) {
      updatedFontSize = MIN_ALLOWED_FONT_SIZE;
    }

    setInputValue(updatedFontSize);
    updateFontSizeInSelection(updatedFontSize + "px", null);
    setInputChangeFlag(false);
  };

  const handleKeyPress = (e) => {
    const inputValueNumber = Number(inputValue);

    if (["e", "E", "+", "-"].includes(e.key) || isNaN(inputValueNumber)) {
      e.preventDefault();
      setInputValue("");
      return;
    }
    setInputChangeFlag(true);
    if (e.key === "Enter" || e.key === "Tab" || e.key === "Escape") {
      e.preventDefault();

      updateFontSizeByInputValue(inputValueNumber);
    }
  };

  const handleInputBlur = () => {
    if (inputValue !== "" && inputChangeFlag) {
      const inputValueNumber = Number(inputValue);
      updateFontSizeByInputValue(inputValueNumber);
    }
  };

  React.useEffect(() => {
    setInputValue(selectionFontSize);
  }, [selectionFontSize]);

  React.useEffect(() => {
    setSelection(getSelection());
    console.log(selection);
  }, [selection]);

  return (
    <>
      <button
        type="button"
        disabled={
          selectionFontSize !== "" &&
          Number(inputValue) <= MIN_ALLOWED_FONT_SIZE
        }
        onClick={() => handleButtonClick("decrement")}
        className="toolbar-item font-decrement"
      >
        <i className="format minus-icon" />
      </button>
      <input
        type="number"
        value={inputValue}
        className="toolbar-item font-size-input bg-dark"
        min={MIN_ALLOWED_FONT_SIZE}
        max={MAX_ALLOWED_FONT_SIZE}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        onBlur={handleInputBlur}
      />
      <button
        type="button"
        disabled={
          selectionFontSize !== "" &&
          Number(inputValue) >= MAX_ALLOWED_FONT_SIZE
        }
        onClick={() => handleButtonClick("increment")}
        className="toolbar-item font-increment"
      >
        <i className="format add-icon" />
      </button>
    </>
  );
};

export default FontSize;
