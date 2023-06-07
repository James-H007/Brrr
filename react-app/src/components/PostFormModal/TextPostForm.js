import "./PostFormModal.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createNewPost } from "../../store/posts";
import { getCurrentUser } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";

const TextPostForm = ({ postType }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState("");
  const [textError, setTextError] = useState("");

  const user = useSelector(state => state.user.currentUser)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  useEffect(() => {
    console.log(user);
  }, [user])

  const blogId = 2



  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length < 1 || title.length > 225) {
      setTitleError("Title should be between 1 and 225 characters.");
      return;
    }

    if (text.length < 1 || text.length > 1200) {
      setTextError("Text should be between 1 and 1200 characters.");
      return;
    }


    const formData = new FormData();

    formData.append('post_title', title);
    formData.append('post_description', text);
    formData.append('post_type', postType)

    try {
      let createdTextPost = await dispatch(createNewPost(blogId, formData));

      setTitle("");
      setText("");

      if (createdTextPost) {
        history.push("/feed");
      }
    } catch (error) {
      console.log("Error creating post:", error);
    }
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
