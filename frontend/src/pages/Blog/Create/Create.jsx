import React, { useEffect } from "react";
import "./Create.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
const CreateBlog = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [user, setUser] = React.useState();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const publishBlog = async () => {
    const url = `http://localhost:3000/blogs`;

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
          className="border me-5 p-1 text-white rounded bgTransparent"
          type="button"
          onClick={publishBlog}
        >
          Publish
        </button>

        <button
          className="border me-2 p-1 text-white rounded bgTransparent"
          type="button"
        >
          Preview
        </button>
      </div>

      {/*Input title  */}

      <input
        onChange={(event) => {
          setTitle(event.target.value);
          console.log(title);
        }}
        type="text"
        placeholder="title"
        value={title}
        className="h3 border  p-2 rounded ms-3 bgTransparent"
      ></input>

      {/* Input Content */}
      <textarea
        onChange={(event) => {
          setContent(event.target.value);
        }}
        name="blogContent"
        cols="85"
        rows="10"
        className="h3 border p-2 pt-3 rounded ms-3 mt-3 bgTransparent"
        placeholder="What's on your mind?"
      ></textarea>
    </div>
  );
};

export default CreateBlog;
