import Post from "../Post"
import "./Blog.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../../store/blogs";
import loadingCat from "../../assets/cat.gif"
import pencil from "../../assets/pencil-solid.svg"
import trash from "../../assets/trash-can-regular.svg"
import { getCurrentUser } from "../../store/users";

const Blog = ({ data }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [blogAvatar, setBlogAvatar] = useState("")
    const [blogBanner, setBlogBanner] = useState("")
    const [blogTitle, setBlogTitle] = useState("")
    const [blogName, setBlogName] = useState("")
    const [blogDescription, setBlogDescription] = useState("")
    const [blogPosts, setBlogPosts] = useState([])

    const blog_banner = "https://images.squarespace-cdn.com/content/v1/5c524a52a9e0288eb5cfa3ee/1616108169603-VV7YD0OXJUPST28QPEKI/LofiVineyard-09+blank+Banner.jpg?format=2500w"
    const iconImage = "https://lofigirl.com/wp-content/uploads/2023/02/DAY_UPDATE_ILLU.jpg"

    const { id } = useParams()

    // blog by id
    // grab all posts from that blog
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const blogById = useSelector(state => state.blogs.currentBlog)
    // console.log(blogById, '-------------------HERE')
    useEffect(() => {
        // dispatch(getBlogById(id))
        // setIsLoaded(true)
        dispatch(getCurrentUser())
        dispatch(getBlogById(id)).then(() => setIsLoaded(true))
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

    }, [dispatch, id])

    return (
        <>
            {(!isLoaded || !blogById || !currentUser) && (
                <>
                    <div className="loading-box">
                        <img src={loadingCat} alt="loading-cat" className="loading-cat" />
                        <p className="loading-message">Loading...</p>
                    </div>

                </>
            )}
            {isLoaded && blogById && currentUser && (
                <div>
                    <div className="main-feed">
                        <div className="main-post-area">
                            <div className="blog-header">
                                <div className="blog-icon-wrapper">
                                    <img
                                        src={blogById.blogAvatarUrl}
                                        alt="icon"
                                        className="blog-avatar-icon"
                                    />
                                </div>
                                <img src={blogById.bannerImgUrl} alt="blog-banner" className="blog-banner" />
                                <p className="blog-title">{blogById.blogTitle}</p>
                                <p className="blog-url">@{blogById.blogName}</p>
                                <p className="blog-description">{blogById.description}</p>

                                {
                                    (currentUser.id === blogById.ownerId) && (
                                        <div className="blog-icons">
                                            <img src={pencil} alt="pencil" className="blog-edit" />
                                            <img src={trash} alt="trash" className="blog-edit" />
                                        </div>
                                    )
                                }


                            </div>
                            <div className="post-comp">
                                {blogById.posts.map((post, i) => (
                                    <>
                                        <Post post={post} key={i} />
                                    </>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            )

            }
        </>

    )
}

export default Blog
