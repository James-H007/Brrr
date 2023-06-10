import React, { useState, useEffect } from "react";
import "./PostFormModal.css";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getCurrentUser } from "../../store/users";
import { createNewPost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LinkPostForm = ({ postType }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState("");
  const [textError, setTextError] = useState("");
  const [blogName, setBlogName] = useState("")
  const [blogAvatar, setBlogAvatar] = useState("")
  const [isLoaded, setIsLoaded] = useState("false")
  const [blogDropdown, setBlogDropdown] = useState(false)
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  const { closeModal } = useModal();

  const user = useSelector(state => state.user.currentUser)
  const noBlog = "https://media.tenor.com/mjKlCBWywDgAAAAC/sarcastic-bob.gif"
  // console.log("HERE IS THE USER", user)

  useEffect(() => {
    dispatch(getCurrentUser())
    if (user && (user.blogs.length > 0)) {
      setBlogName(user.blogs[0].blogName)
      setBlogAvatar(user.blogs[0].blogAvatarUrl)
      setSelectedBlogId(user.blogs[0].id)
    }
    setIsLoaded(true)

  }, [dispatch])

  useEffect(() => {
    console.log(user);
  }, [user])

  // const blogId = 2



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
      let createdTextPost = await dispatch(createNewPost(selectedBlogId, formData));

      setTitle("");
      setText("");
      closeModal();

      if (createdTextPost) {
        history.push(`/blog/${selectedBlogId}`);
      }
    } catch (error) {
      console.log("Error creating post:", error);
    }
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
                alt="flower"
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
              {text &&
                <p>Link preview: <a href={text} target="_blank" rel="noopener noreferrer">{text}</a></p>
              }
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
      )}
    </>

  );
};

export default LinkPostForm;
