import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editAblog, getBlogById } from '../../store/blogs'
import "./EditBlogPage.css"
import loadingCat from "../../assets/cat.gif"

// import { getCurrentUser } from '../../store/users'

import { currentUser, getCurrentUser } from '../../store/users'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function EditBlogPage() {

  const [blogTitle, setBlogTitle] = useState("")
  const [bannerImg, setBannerImg] = useState("")
  const [blogAvatar, setBlogAvatar] = useState("")
  const [description, setDescription] = useState("")
  // const [defaultBlog, setDefaultBlog] = useState(true)
  const [descriptionError, setDescriptionError] = useState("");
  const [bannerImgError, setBannerImgError] = useState("")
  const [blogAvatarError, setBlogAvatarError] = useState("")
  const [titleError, setTitleError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const { blogId } = useParams()
  const blogData = useSelector(state => state.blogs.currentBlog)
  const user = useSelector((state) => state.user.currentUser)
  const notAccessGif = "https://media1.giphy.com/media/Rk6prl6CKYy52/giphy.gif?cid=6c09b952ldqwj5w6yo7puysa1i90hzbfbxrk0glyern3e78m&ep=v1_gifs_search&rid=giphy.gif&ct=g"
  const noBlogGif = "https://media.tenor.com/5MibLt95scAAAAAC/%ED%98%BC%ED%8C%8C%EB%A7%9D-%ED%94%BC%EC%9E%90.gif"
  // console.log(blogData, "BLOG DATA")
  // console.log(user, "USER DATA")
  useEffect(() => {
    if (isLoaded && blogData && user) {
      setBlogTitle(blogData.blogTitle)
      setBannerImg(blogData.bannerImgUrl)
      setBlogAvatar(blogData.blogAvatarUrl)
      setDescription(blogData.description)
      if (blogData.ownerId === user.id) {
        setIsAuthorized(true)
      }
    }



  }, [isLoaded, blogData, user])


  useEffect(() => {
    const fetchBlogData = async () => {
      await dispatch(getBlogById(blogId))

    }

    fetchBlogData()
      .then(() => dispatch(getCurrentUser()))
      .then(() => setIsLoaded(true))

  }, [dispatch, blogId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!isAuthorized) {
        history.push(`/blog/${blogId}`)
      }
      if (!validateForm()) {
        return;
      }


      const updatedBlog = {
        blog_title: blogTitle,
        banner_img_url: bannerImg,
        blog_avatar_url: blogAvatar,
        description: description
      }

      const editedBlog = await dispatch(editAblog(blogId, updatedBlog))

      if (editedBlog) {
        history.push(`/blog/${blogId}`)
      }
    }
    catch (error) {
      console.error("Error creating blog:", error);
    }


  }
  const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  const validateForm = () => {
    let isValid = true;

    if (blogTitle.length === 0 || blogTitle.length > 24) {
      setTitleError("Title must be between 1 and 24 characters");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (description.length > 500) {
      setDescriptionError("Description cannot exceed 500 characters");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!isImage(bannerImg)) {
      setBannerImgError("Not a valid image url. Must end in .jpg, .jpeg, .png, .webp, .avif, .gif, .svg")
      isValid = false;
    }

    if (!isImage(blogAvatar)) {
      setBlogAvatarError("Not a valid image url. Must end in .jpg, .jpeg, .png, .webp, .avif, .gif, .svg")
      isValid = false;
    }

    return isValid;
  };


  return (
    <>
      {(!isLoaded) && (
        <>
          <div className="loading-box">
            <img src={loadingCat} alt="loading-cat" className="loading-cat" />
            <p className="loading-message">Loading...</p>
          </div>

        </>
      )}
      {isLoaded && !blogData && (
        <>
          <img src={noBlogGif} alt="gif" className="no-likes-gif" />
          <p className="no-likes">
            This blog does not exist.
          </p>
          <Link to="/feed">
            <button className='redirect-button'>Take me back home</button>
          </Link>

        </>
      )}

      {isLoaded && blogData && !isAuthorized && (
        <>
          <img src={notAccessGif} alt="gif" className="no-likes-gif" />
          <p className="no-likes">
            You're not the owner of this blog. Get out.
          </p>
        </>
      )}
      {isLoaded && blogData && isAuthorized && (
        <div className='entire-edit-blog'>
          <form onSubmit={handleSubmit} className="create-blog-form">
            <div className="create_blog_container">
              <h1 className="create_blog_h1">Edit blog</h1>
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
                  Banner Image: &nbsp;
                </label>
                <input
                  className="create_blog_input"
                  type="text"
                  id="blogName"
                  value={bannerImg}
                  onChange={(e) => setBannerImg(e.target.value)}
                />
              </div>
              {bannerImgError && <p className='errors'>{bannerImgError}</p>}

              <div className="create-blog-input-container">
                <label className="create_blog_label" htmlFor="blogName">
                  Blog Avatar: &nbsp;
                </label>
                <input
                  className="create_blog_input"
                  type="text"
                  id="blogName"
                  value={blogAvatar}
                  onChange={(e) => setBlogAvatar(e.target.value)}
                />
              </div>
              {blogAvatarError && <p className='errors'>{blogAvatarError}</p>}

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
          <div>
            <div className="edit-blog-preview">
              <div className="blog-preview-container">
                <div className="icon-wrapper">
                  <img
                    src={blogAvatar}
                    alt="icon"
                    className="blog-preview-icon"
                  />
                </div>
                <img
                  src={bannerImg}
                  alt="banner"
                  className="blog-preview-banner"
                />
                <div className="preview-bottom-half">
                  <p className="blog-preview-title">{blogTitle}</p>
                  <p className="blog-preview-name">@{blogData.blogName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default EditBlogPage
