import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createNewPost, getAllPosts, getPosts } from "../../store/posts";
import { getCurrentUser, userById } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { editMyPost } from "../../store/posts";
import { useModal } from "../../context/Modal";

const EditLinkFormModal = ({ postType, postData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
  const [isLoaded, setIsLoaded] = useState("false");
  const [urlError, setUrlError] = useState("")
  const { closeModal } = useModal();


  useEffect(() => {
    // console.log(postData, "Post Data HERE")
    setText(postData.postTitle);
  }, [postData]);

  const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.trim().length < 1 || text.length > 1200) {
      setTextError("Text should be between 1 and 1200 characters.");
      return;
    }

    if (!isValidUrl(text)) {
      setUrlError("Not a valid URL")
      return;
    }

    const updatedPost = {
      post_title: text,
      post_description: text
    };



    const editLinkPost = await dispatch(editMyPost(postData.id, updatedPost));

    setText("");

    if (editLinkPost) {
      await closeModal()
      await dispatch(getAllPosts())
      await history.push("/feed");
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
                className="post-form-input-title"
                placeholder="Your post here..."
                type="text"
                name="link"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              {textError && <div className="errors">{textError}</div>}
              {urlError && <div className="errors">{urlError}</div>}
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
