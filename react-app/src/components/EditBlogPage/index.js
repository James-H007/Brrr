import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editAblog, getBlogById } from '../../store/blogs'

function EditBlogPage() {

  const [blogTitle, setBlogTitle] = useState("")
  const [bannerImg, setBannerImg] = useState("")
  const [blogAvatar, setBlogAvatar] = useState("")
  const [description, setDescription] = useState("")
  const [defaultBlog, setDefaultBlog] = useState(true)

  const history = useHistory()
  const dispatch = useDispatch()

  const { blogId } = useParams()

  useEffect(() => {

    const fetchBlogData = async () => {
      const blogData = await dispatch(getBlogById(blogId))

      setBlogTitle(blogData.blog_title)
      setBannerImg(blogData.banner_img_url)
      setBlogAvatar(blogData.blog_avatar_url)
      setDescription(blogData.description)
    }

    fetchBlogData()

  }, [dispatch, blogId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedBlog = {
      blog_title: blogTitle,
      banner_img_url: bannerImg,
      blog_avatar_url: blogAvatar,
      description: description
    }

    const editedBlog = await dispatch(editAblog(blogId, updatedBlog))

    if (editedBlog) {
      history.push(`/blog/${editedBlog.id}`)
    }
  }


  return (

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
        </div>

        <button className="create_blog_button" type="submit">
          Create Blog
        </button>
      </div>
    </form>
  )
}

export default EditBlogPage
