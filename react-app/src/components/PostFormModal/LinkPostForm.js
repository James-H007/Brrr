import React, { useState } from "react";
import "./PostFormModal.css";
import { useHistory } from "react-router-dom";

const LinkPostForm = ({ postType }) => {
  const history = useHistory();
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");

  const handleLinkChange = (e) => {
    const linkValue = e.target.value;
    setLink(linkValue);
    setLinkError(validateLink(linkValue) ? "" : "Invalid link format.");
  };

  const validateLink = (enteredLink) => {
    const urlChecker = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlChecker.test(enteredLink);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!link) {
      setLinkError("Link cannot be empty.");
      return;
    }

    if (!validateLink(link)) {
      setLinkError("Invalid link format.");
      return;
    }

    //send data to the backend

    // Reset the form
    setLink("");
    history.push("/feed");
    window.location.reload();
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
            className="post-form-input-link"
            placeholder="Link..."
            name="link"
            value={link}
            onChange={handleLinkChange}
          />
          {linkError && <div className="errors">{linkError}</div>}
          <div className="close-post-buttons">
            {/* <button className="poster-button">Close</button> */}
            <button className="poster-button" type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkPostForm;
