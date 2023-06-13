import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "./PostFormModal.css";
import { createNewPost } from "../../store/posts";
import { getCurrentUser } from "../../store/users"
import { useModal } from "../../context/Modal";

const ImagePostForm = ({ postType }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSizeError, setFileSizeError] = useState("");
  // const [fileTypeError, setFileTypeError] = useState("")
  const [imagePreview, setImagePreview] = useState(null);
  const [imageEmbedCode, setImageEmbedCode] = useState(null)
  const [description, setDescription] = useState("")
  const [isLoaded, setIsLoaded] = useState("false")
  const [blogDropdown, setBlogDropdown] = useState(false)
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  const [blogName, setBlogName] = useState("")
  const [blogAvatar, setBlogAvatar] = useState("")
  const { closeModal } = useModal();


  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currentUser);
  const history = useHistory()
  const noBlog = "https://media.tenor.com/mjKlCBWywDgAAAAC/sarcastic-bob.gif"
  // console.log(user.blogs)

  useEffect(() => {
    dispatch(getCurrentUser())
    if (user && (user.blogs.length > 0)) {
      setBlogName(user.blogs[0].blogName)
      setBlogAvatar(user.blogs[0].blogAvatarUrl)
      setSelectedBlogId(user.blogs[0].id)
    }
    setIsLoaded(true)
  }, [dispatch])


  // useEffect(() => {
  //   console.log(users.blogs[0].id);
  // }, [users])

  // const blogId = 2 // <<-- HARDCODED NEEDS CHANGED

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileSizeError(
      validateFileSize(file) ? "" : "File size should be under 20MB."
    );

    // setFileSizeError(
    //   validateFileType(file) ? "" : "Only image files are allowed."
    // )

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const validateFileSize = (file) => {
    const maxSize = 20 * 1024 * 1024;
    return file && file.size <= maxSize;
  };

  // const validateFileType = (file) => {
  //   const notAllowedTypes = ["video/mp4", "video/mov", "video/avi"];
  //   return file && !notAllowedTypes.includes(file.types)
  // }

  const handleTextChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setFileSizeError("Please select a file.");
      return;
    }

    if (!validateFileSize(selectedFile)) {
      setFileSizeError("File size should be under 20MB.");
      return;
    }

    // if (!validateFileType(selectedFile)) {
    //   setFileTypeError("Only image files are allowed.")
    //   return;
    // }

    // send data to backend
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('post_type', postType)
    formData.append('description', description)
    formData.append('image_embed_code', imageEmbedCode);


    await dispatch(createNewPost(selectedBlogId, formData));



    setSelectedFile(null);
    setImagePreview(null);
    setDescription("")
    closeModal();
    history.push(`/blog/${selectedBlogId}`)
  };

  const handleBlogSelect = () => {
    if (blogDropdown) {
      setBlogDropdown(false)
    }
    else {
      setBlogDropdown(true)
    }
  }

  return (
    <>
      {!isLoaded && (
        <p>
          Loading...
        </p>
      )}
      {isLoaded && (user.blogs.length === 0) && (

        <>

          <div className="post-form-container">
            <div className="delete-form-container">
              <h2>Hey. You don't even have a blog.</h2>

              <img src={noBlog} alt="delete-gif" className="delete-image" />

            </div>

          </div>
        </>

      )}
      {isLoaded && (user.blogs.length > 0) && (
        <div className="post-form-container">
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
                      {blog.blogName}
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
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput" className="custom-file-upload">
                  Select a file
                </label>
              </div>
              {fileSizeError && <div className="errors">{fileSizeError}</div>}
              {/* {fileTypeError && <div className="errors">{fileTypeError}</div>} */}
              {imagePreview && !fileSizeError && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" className="preview-image" />
                </div>
              )}
              <textarea
                type="textarea"
                className="post-form-input-text"
                placeholder="Maximum file size is 20MB... You can add a description as well"
                name="text"
                value={description}
                onChange={handleTextChange}
              />
              <div className="close-post-buttons">
                {/* <button className="poster-button">Close</button> */}
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

export default ImagePostForm;
