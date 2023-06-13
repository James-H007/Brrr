// import "./PostFormModal.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createNewPost, getAllPosts, getPosts } from "../../store/posts";
import { getCurrentUser, userById } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { editMyPost } from "../../store/posts";
import { useModal } from "../../context/Modal";

const EditTextFormModal = ({ postType, postData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState("");
  const [textError, setTextError] = useState("");
  const [isLoaded, setIsLoaded] = useState("false");
  const { closeModal } = useModal();

  useEffect(() => {
    setTitle(postData.postTitle);
    setText(postData.postDescription);
  }, [postData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length < 1 || title.length > 225) {
      setTitleError("Title should be between 1 and 225 characters.");
      return;
    }

    if (text.trim().length < 1 || text.length > 1200) {
      setTextError("Text should be between 1 and 1200 characters.");
      return;
    }

    const updatedPost = {
      post_title: title,
      post_description: text,
    };

    const editTextPost = await dispatch(editMyPost(postData.id, updatedPost));

    setTitle("");
    setText("");

    if (editTextPost) {
      await closeModal()
      await dispatch(getAllPosts())
      history.push("/feed");
    }
  };
  return (
    <>
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && postData && (
        <div className="post-form-container">
          <div className="post-form-content">
            <form className="post-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="post-form-input-title"
                placeholder="Title..."
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {titleError && <div className="errors">{titleError}</div>}
              <textarea
                className="post-form-input-text"
                placeholder="Your post here..."
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              {textError && <div className="errors">{textError}</div>}
              <div className="close-post-buttons">
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
      )}
    </>
  );
};

export default EditTextFormModal;
