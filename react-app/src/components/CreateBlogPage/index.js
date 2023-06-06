import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateBlogPage.css";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();

  const createBlog = (blogData) => {
    const newBlog = {
      title: blogData.title,
      url: blogData.url,
    };
    console.log("Blog created:", { newBlog });
    history.push("/feed");
  };

  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const urlOnChange = (e) => {
    setUrl(e.target.value);
  };

  const handleCreateBlog = () => {
    if (title && url) {
      createBlog({ title, url });
    }
    console.log("Creating blog:", title, url);
  };

  const handleCancel = () => {
    setTitle("");
    setUrl("");
    history.push("/feed");
  };

  return (
    <>
      <div className="create_blog_container">
        <h1 className="create_blog_h1">Create a new blog</h1>
        <div>
          <label className="create_blog_label" htmlFor="title">
            Title: &nbsp;
          </label>
          <input
            className="create_blog_input"
            type="text"
            id="title"
            value={title}
            onChange={titleOnChange}
          />
        </div>

        <label className="create_blog_label" htmlFor="url">
          Background Image Url: &nbsp;
        </label>
        <input
          className="create_blog_input"
          type="text"
          id="url"
          value={url}
          onChange={urlOnChange}
        />
        <button className="create_blog_button" onClick={handleCreateBlog}>
          Create Blog
        </button>
        <button className="create_blog_button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default CreateBlogPage;
