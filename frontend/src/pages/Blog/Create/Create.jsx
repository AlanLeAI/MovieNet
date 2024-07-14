import React, { useEffect } from "react";
import "./Create.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
const CreateBlog = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [user, setUser] = React.useState({ displayName: "", id: "" });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        console.log(user);
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
    <div className="d-flex flex-row mt-4 justify-content-between">
      <div className="border rounded p-4 d-flex flex-column userBlog m-3">
        <p>Blog Title</p>
        {/*Input title  */}
        <input
          onChange={(event) => {
            setTitle(event.target.value);
            console.log(title);
          }}
          type="text"
          placeholder="title"
          value={title}
          className="border p-2 rounded bgTransparent text-white"
        ></input>

        {/* Input Content */}
        <textarea
          onChange={(event) => {
            setContent(event.target.value);
          }}
          name="blogContent"
          className="border p-2 rounded text-white mt-3 bgTransparent"
          placeholder="What's on your mind?"
          rows={15}
        ></textarea>
      </div>

      {/* Blog Details */}
      <div className="border rounded p-3 m-3 blogDetail overflow-hidden">
        <div className="d-flex justify-content-center">
          <h5>Blog Details</h5>
        </div>

        {/* Author */}
        <div className="d-flex flex-row align-items-center">
          <div>Author:</div>
          <img
            src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
            alt="avatar"
            width={30}
            height={30}
            className="rounded-circle border m-3 d-flex align-self-center"
          ></img>
          <div>{user.displayName}</div>
        </div>

        {/* Button */}
        <div className="d-flex justify-content-around">
          <button
            className="border p-1 text-white rounded bgTransparent blogDetailButton"
            type="button"
          >
            Preview
          </button>

          <button
            className="border p-1 text-white rounded bgTransparent blogDetailButton"
            type="button"
            onClick={publishBlog}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
