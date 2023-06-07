import "./PostFormModal.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createPost } from "../../store/posts";
import { useDispatch } from "react-redux";

const TextPostForm = ({ postType }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState("");
  const [textError, setTextError] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.length < 1 || title.length > 225) {
      setTitleError("Title should be between 1 and 225 characters.");
      return;
    }

    if (text.length < 1 || text.length > 1200) {
      setTextError("Text should be between 1 and 1200 characters.");
      return;
    }
    const payload = {
      title,
      text,
    };

    let createdTextPost = dispatch(createPost(payload));
    // send the data to a backend server
    console.log(createdTextPost);
    // Reset the form after submission
    setTitle("");
    setText("");
    // if (createdTextPost) {
    //   history.push("/feed");
    // }
  };

  return (
    <div className="post-form-container">
      <div className="post-form-content">
        <header className="post-form-header">
          <img
            src="https://thelifeofyourtime.files.wordpress.com/2016/05/bloodroot.jpg"
            alt="flower"
            className="post-maker-icon"
          />
          Username
        </header>
        <form className="post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="post-form-input-title"
            placeholder="Title..."
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <div className="errors">{titleError}</div>}
          <textarea
            className="post-form-input-text"
            placeholder="Your post here..."
            name="text"
            value={text}
            onChange={handleTextChange}
          />
          {textError && <div className="errors">{textError}</div>}
          <div className="close-post-buttons">
            {/* <button className="poster-button">Close</button> */}
            <button
              className="poster-button"
              type="submit"
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextPostForm;
