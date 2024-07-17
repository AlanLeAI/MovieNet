import React, { useEffect } from "react";
import "./ViewBlog.css";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import { auth } from "../../../firebase";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import blogContentTheme from "./blogContentTheme";
import { $getRoot } from "lexical";

const UpdateEditorStatePlugin = ({ blogContent }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (blogContent) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        const editorState = editor.parseEditorState(blogContent);
        editor.setEditorState(editorState);
      });
    }
  }, [blogContent, editor]);

  return null;
};

const ViewBlog = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState();

  const [blog, setBlog] = React.useState({
    title: "",
    content:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"font-size: 29px;","text":"Loading...","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0},{"children":[{"detail":0,"format":1,"mode":"normal","style":"font-size: 23px;","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":1},{"children":[{"detail":0,"format":3,"mode":"normal","style":"font-size: 23px;","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":3}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    authorID: "",
  });

  const editorConfig = {
    namespace: "MyEditor",
    theme: blogContentTheme,
    onError(error) {
      throw error;
    },
    editorState: blog.content,
    editable: false,
  };

  useEffect(() => {
    // Get user Data
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Get the Blog
    const getBlog = async () => {
      const url = `http://localhost:3000/blogs/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setBlog(data);
    };
    getBlog();
  }, []);

  return (
    <>
      {/*Input title  */}
      <div className="d-flex ms-3 blogTitle">{blog.title}</div>

      {/* Input Content */}
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  aria-placeholder={"placeholder"}
                  placeholder={<div className="text-white">Start Writing</div>}
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <UpdateEditorStatePlugin blogContent={blog.content} />
          </div>
        </div>
      </LexicalComposer>
    </>
  );
};

export default ViewBlog;
