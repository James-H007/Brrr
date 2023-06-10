import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./PostFormModal.css";
import { createNewPost } from "../../store/posts";
import { getCurrentUser } from "../../store/users";
import { useModal } from "../../context/Modal";

const VideoPostForm = ({ postType }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSizeError, setFileSizeError] = useState("");
  const [fileTypeError, setFileTypeError] = useState("")
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoEmbedCode, setVideoEmbedCode] = useState(null);
  const [description, setDescription] = useState("")
  const [isLoaded, setIsLoaded] = useState("false")
  const [blogDropdown, setBlogDropdown] = useState(false)
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  const [blogName, setBlogName] = useState("")
  const [blogAvatar, setBlogAvatar] = useState("")
  const { closeModal } = useModal();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();

  useEffect(() => {
    dispatch(getCurrentUser());
    if (user) {
      setBlogName(user.blogs[0].blogName)
      setBlogAvatar(user.blogs[0].blogAvatarUrl)
      setSelectedBlogId(user.blogs[0].id)
    }
    setIsLoaded(true)
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(user.blogs[0].id);
  // }, [user]);

  // const blogId = users.blogs[0].id; // <<-- HARDCODED NEEDS CHANGED

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileSizeError(
      validateFileSize(file) ? "" : "File size should be under 170MB."
    );

    setFileTypeError(
      validateFileType(file) ? "" : "File type should be a video."
    )

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

  const validateFileType = (file) => {
    const allowedTypes = ["video/mp4", "video/mov", "video/avi"];
    return file && allowedTypes.includes(file.type)
  }

  const handleTextChange = (e) => {
    setDescription(e.target.value);
  };

  const handleBlogSelect = () => {
    if (blogDropdown) {
      setBlogDropdown(false)
    }
    else {
      setBlogDropdown(true)
    }
  }


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

    if (!validateFileType(selectedFile)) {
      setFileTypeError("File type should be a video.")
    }

    // send data to backend
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("video_embed_code", videoEmbedCode);
    formData.append("post_type", postType)
    formData.append("description", description)

    dispatch(createNewPost(selectedBlogId, formData)); // <<-- HARDCODED NEEDS CHANGED

    setSelectedFile(null);
    setVideoPreview(null);
    setDescription("")
    closeModal();
    history.push(`/blog/${selectedBlogId}`);
  };

  return (
    <>
      {!isLoaded && (
        <p>
          Loading...
        </p>
      )}
      {isLoaded && (user.blogs.length == 0) && (
        <p>
          YOU DON'T HAVE ANY BLOGS! MAKE ONE!
        </p>
      )}
      {isLoaded && (user.blogs.length > 0) && (<div className="post-form-container">
        <div className="post-form-content">
          <header className="post-form-header" onClick={handleBlogSelect}>
            <img
              src={blogAvatar}
              alt="blog-icon"
              className="post-maker-icon"
            />
            <p className="post-form-header-name">{blogName} 🠋</p>
            {blogDropdown && (
              <ul className="blog-dropdown">
                {user.blogs.map((blog) => (
                  <li className="blog-dropdown-select" key={blog.id} onClick={() => {
                    setSelectedBlogId(blog.id)
                    setBlogName(blog.blogName)
                    setBlogAvatar(blog.blogAvatarUrl)
                  }}>
                    <img src={blog.blogAvatarUrl} alt="blog-icon" className="blog-select-icon" />
                    {blog.blogTitle}
                  </li>
                ))}
              </ul>
            )}
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
            {fileTypeError && <div className="errors">{fileTypeError}</div>}
            {videoPreview && !fileSizeError && !fileTypeError && (
              <div className="video-preview">
                <video src={videoPreview} controls className="preview-video" >
                  <source src={videoPreview} type="video/mp4" />
                  <source src={videoPreview} type="video/mp4" />
                </video>
              </div>
            )}
            <textarea
              type="textarea"
              className="post-form-input-text"
              placeholder="Maximum file size is 170MB... You can add a description..."
              name="text"
              value={description}
              onChange={handleTextChange}
            />
            <div className="close-post-buttons">
              <button className="poster-button" type="submit">
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

export default VideoPostForm;
