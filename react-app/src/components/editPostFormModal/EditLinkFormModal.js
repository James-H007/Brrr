import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createNewPost, getPosts } from "../../store/posts";
import { getCurrentUser, userById } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { editMyPost } from "../../store/posts";

const EditLinkFormModal = ({ postType, postData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
  const [isLoaded, setIsLoaded] = useState("false");

  useEffect(() => {
    setText(postData.postDescription);
  }, [postData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.length < 1 || text.length > 1200) {
      setTextError("Text should be between 1 and 1200 characters.");
      return;
    }

    const updatedPost = {
      post_description: text,
    };

    const editLinkPost = await dispatch(editMyPost(postData.id, updatedPost));

    setText("");

    if (editLinkPost) {
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

export default EditLinkFormModal;
