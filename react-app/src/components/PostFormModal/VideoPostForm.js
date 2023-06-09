import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./PostFormModal.css";
import { createNewPost } from "../../store/posts";
import { getCurrentUser } from "../../store/users";

const VideoPostForm = ({ postType }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSizeError, setFileSizeError] = useState("");
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoEmbedCode, setVideoEmbedCode] = useState(null);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.currentUser);
  const history = useHistory();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    console.log(users.blogs[0].id);
  }, [users]);

  const blogId = users.blogs[0].id; // <<-- HARDCODED NEEDS CHANGED

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileSizeError(
      validateFileSize(file) ? "" : "File size should be under 170MB."
    );

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setVideoPreview(null);
    }
  };

  const validateFileSize = (file) => {
    const maxSize = 80 * 1500 * 1500;
    return file && file.size <= maxSize;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setFileSizeError("Please select a file.");
      return;
    }

    if (!validateFileSize(selectedFile)) {
      setFileSizeError("File size should be under 170MB.");
      return;
    }

    // send data to backend
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("video_embed_code", videoEmbedCode);
    formData.append("post_type", postType)

    dispatch(createNewPost(blogId, formData)); // <<-- HARDCODED NEEDS CHANGED

    setSelectedFile(null);
    setVideoPreview(null);
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
        <div className="file-input-wrapper">
          <input
            type="file"
            id="fileInput"
            name="filename"
            onChange={handleFileChange}
          />
          <label htmlFor="fileInput" className="custom-file-upload">
            Select a file
          </label>
        </div>
        {fileSizeError && <div className="errors">{fileSizeError}</div>}
        {videoPreview && (
          <div className="video-preview">
            <video src={videoPreview} controls className="preview-video" />
          </div>
        )}
        <textarea
          type="textarea"
          className="post-form-input-text"
          placeholder="Maximum file size is 170MB..."
          name="text"
        />
        <div className="close-post-buttons">
          <button className="poster-button" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default VideoPostForm;
