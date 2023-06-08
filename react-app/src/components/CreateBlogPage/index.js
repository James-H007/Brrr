import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../store/blogs";
import { getCurrentUser } from "../../store/users";
import "./CreateBlogPage.css";
import loadingCat from "../../assets/cat.gif"

const CreateBlogPage = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [bannerImg, setBannerImg] = useState(
    "https://assets.tumblr.com/images/default_header/optica_pattern_05.png"
  );
  const [blogName, setBlogName] = useState("");
  const [blogAvatar, setBlogAvatar] = useState(
    "https://64.media.tumblr.com/bc21905428903d578557d130c89df226/3b296d0381ea9902-d0/s540x810/614684c8af1a0de38b3b7f5ace5f8de66e6c746d.png"
  );
  const [description, setDescription] = useState("");
  const [defaultBlog, setDefaultBlog] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [blogNameError, setBlogNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false)
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => { setIsLoaded(true) });
  }, [dispatch]);

  useEffect(() => {
    if (user.blogs && user.blogs.length === 0) {
      setDefaultBlog(true);
    } else {
      setDefaultBlog(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        return;
      }

      const userInput = {
        blog_title: blogTitle,
        banner_img_url: bannerImg,
        blog_name: blogName,
        blog_avatar_url: blogAvatar,
        description: description,
        default_blog: defaultBlog,
      };

      const newBlog = await dispatch(createBlog(userInput));
      if (newBlog) {
        history.push(`/blog/${newBlog.blog.id}`);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (blogTitle.length === 0 || blogTitle.length > 24) {
      setTitleError("Title must be between 1 and 24 characters");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (blogName.length === 0 || blogName.length > 255) {
      setBlogNameError("Blog name must be between 1 and 255 characters");
      isValid = false;
    } else {
      setBlogNameError("");
    }

    if (description.length > 500) {
      setDescriptionError("Description cannot exceed 500 characters");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  return (
    <>
      {!isLoaded && (
        <>
          <div className="loading-box">
            <img src={loadingCat} alt="loading-cat" className="loading-cat" />
            <p className="loading-message">Loading...</p>
          </div>
        </>
      )}
      {isLoaded && (
        <form onSubmit={handleSubmit} className="create-blog-form">
          <div className="create_blog_container">
            <h1 className="create_blog_h1">Create a new blog</h1>
            <div className="create-blog-input-container">
              <label className="create_blog_label" htmlFor="title">
                Title: &nbsp;
              </label>
              <input
                className="create_blog_input"
                type="text"
                id="title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
              {titleError && <p className="errors">{titleError}</p>}
            </div>

            <div className="create-blog-input-container">
              <label className="create_blog_label" htmlFor="blogName">
                Blog Name: &nbsp;
              </label>
              <input
                className="create_blog_input"
                type="text"
                id="blogName"
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
              />
              {blogNameError && <p className="errors">{blogNameError}</p>}
            </div>

            <div className="create-blog-input-container">
              <label className="create_blog_label" htmlFor="description">
                Description: &nbsp;
              </label>
              <input
                className="create_blog_input"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {descriptionError && <p className="errors">{descriptionError}</p>}
            </div>
            <button className="create_blog_button" type="submit">
              Create Blog
            </button>
          </div>
        </form>
      )}

    </>
  );
};

export default CreateBlogPage;
