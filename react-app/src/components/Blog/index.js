import Post from "../Post"
import "./Blog.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../../store/blogs";

const Blog = ({ data }) => {

    const blog_banner = "https://images.squarespace-cdn.com/content/v1/5c524a52a9e0288eb5cfa3ee/1616108169603-VV7YD0OXJUPST28QPEKI/LofiVineyard-09+blank+Banner.jpg?format=2500w"
    const iconImage = "https://lofigirl.com/wp-content/uploads/2023/02/DAY_UPDATE_ILLU.jpg"

    const { id } = useParams()

    // blog by id
    // grab all posts from that blog
    const dispatch = useDispatch()
    const blogById = useSelector(state => state.blogs.currentBlog)

    useEffect(() => {
       dispatch(getBlogById(id))

        /*

        blogById ===

        {
            bannerImgUrl: 'djsb--------------------kds.png',
            blogAvatarUrl: 'djsbbkbkjbkbkjkdvd.png',
            blogName: 'Marnie',
            blogTitle: 'TESTTSTSTSTSTSTSTSTSTSTS____________________',
            createdAt: 'Wed, 31 May 2023 22:49:58 GMT',
            defaultBlog: false,
            description: 'vjsdkdvsddsv',
            followerCount: 1,
            id: 2,
            ownerId: 2,
            posts: [
              {
                blogId: 2,
                comments: [],
                createdAt: 'Thu, 01 Jun 2023 02:28:32 GMT',
                id: 4,
                imageEmbedCode: 'svbjskbsvdjsv.png',
                likes: 0,
                notes: null,
                postDescription: 'ldskndsvklsdvdvs',
                postImages: [],
                postTitle: 'Test',
                postType: 'image',
                reblogs: null,
                updatedAt: 'Thu, 01 Jun 2023 02:28:32 GMT',
                userId: 2,
                videoEmbedCode: 'jdskbvkjdvsbsdvj'
              }
            ],
            updatedAt: 'Thu, 01 Jun 2023 22:59:15 GMT'
        }
        */

    }, [dispatch])



    return (
        <div>
            <div>
                //Data we need ------------------
            //1. The prop that will be passed through data is the blog id
            //2. Using the blog id, we'll find the blog and all of it's posts
            //3. We'll need all the posts, blog name, title, description, avatar, and url
            </div>
            <div className="main-feed">
                <div className="main-post-area">
                    <div className="blog-header">
                        <div className="blog-icon-wrapper">
                            <img
                                src={iconImage}
                                alt="icon"
                                className="blog-avatar-icon"
                            />
                        </div>
                        <img src={blog_banner} alt="blog-banner" className="blog-banner" />
                        <p className="blog-title">Blog Title</p>
                        <p className="blog-url">@blogname</p>
                        <p className="blog-description">Welcome to my blog!</p>
                    </div>
                    <div className="post-comp">
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog
