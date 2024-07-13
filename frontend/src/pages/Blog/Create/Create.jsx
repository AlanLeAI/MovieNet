import React from "react";
import "./Create.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
const CreateBlog = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [user, setUser] = React.useState();
  const publishBlog = async () => {
    const url = `http://localhost:3000/blogs`;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    const req = { title: title, content: content, authorID: user.uid };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    console.log(response.ok);
  };

  return (
    <div>
      {/* Button */}
      <div className="d-flex flex-row-reverse mt-3 mb-3">
        <button
          className="border me-5 p-1 bg-dark"
          type="button"
          onClick={publishBlog}
        >
          Publish
        </button>
        <div className="border me-2 p-1">Preview</div>
      </div>

      {/*Input title  */}
      <div className="ms-3">
        <input
          onChange={(event) => {
            setTitle(event.target.value);
            console.log(title);
          }}
          type="text"
          placeholder="Input your title"
          value={title}
          className="h2 bg-dark border-0 p-2 "
        ></input>
      </div>

      {/* Input Content */}
      <div className="ms-3 mt-3">
        <textarea
          onChange={(event) => {
            setContent(event.target.value);
          }}
          name="blogContent"
          cols="75"
          rows="10"
          className="h2 bg-dark border-0 p-2 "
          placeholder="Your content"
        ></textarea>
      </div>
    </div>
  );
};

export default CreateBlog;
