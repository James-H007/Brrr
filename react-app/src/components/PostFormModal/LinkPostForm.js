import React, { useState, useEffect } from "react";
import "./PostFormModal.css";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getCurrentUser } from "../../store/users";
import { createNewPost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";

const LinkPostForm = ({ postType }) => {
  const history = useHistory();

  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const [isLoaded, setIsLoaded] = useState("false")
  const [blogDropdown, setBlogDropdown] = useState(false)
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  const [blogName, setBlogName] = useState("")
  const [blogAvatar, setBlogAvatar] = useState("")
  const { closeModal } = useModal();

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {

    dispatch(getCurrentUser())
    if (user) {
      setBlogName(user.blogs[0].blogName)
      setBlogAvatar(user.blogs[0].blogAvatarUrl)
      setSelectedBlogId(user.blogs[0].id)
    }
    setIsLoaded(true)
  }, [dispatch])


  const handleLinkChange = (e) => {
    const checkLink = e.target.value
    setLink(e.target.value);
    // setLinkError(validateLink(checkLink) ? "" : "Invalid link format.");
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
    console.log("Our link", link)
    //send data to the backend
    const formData = new FormData()
    formData.append('post_type', postType)
    formData.append('post_description', link)
    formData.append('description', link)

    console.log("Form data", formData)

    dispatch(createNewPost(selectedBlogId, formData))

    // Reset the form
    setLink("");
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
    <div className="post-form-container">
      <div className="post-form-content">
        <header className="post-form-header" onClick={handleBlogSelect}>
          <img
            src={blogAvatar}
            alt="flower"
            className="post-maker-icon"
          />
          <p className="post-form-header-name">{blogName} 🠋</p>
          {blogDropdown && (
            <ul className="blog-dropdown-link">
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
