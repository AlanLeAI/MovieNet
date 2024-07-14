import React, { useEffect } from "react";
import "./ViewBlog.css";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import { auth } from "../../../firebase";
const ViewBlog = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState();
  const [blog, setBlog] = React.useState({
    title: "",
    content: "",
    authorID: "",
  });

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
      await setBlog(data);
      console.log(blog.title);
    };
    getBlog();
  }, []);

  return (
    <div>
      {/*Input title  */}
      <div className="d-flex ms-3 blogTitle">{blog.title}</div>

      {/* Input Content */}
      <div className="h3 p-2 ms-3 ">{blog.content}</div>
    </div>
  );
};

export default ViewBlog;
