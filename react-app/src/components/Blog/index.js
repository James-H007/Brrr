import Post from "../Post"
import "./Blog.css"
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followABlog, getBlogById, getBlogFollowers, unFollowABlog, removeBlogById } from "../../store/blogs";
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
    const [isFollowed, setIsFollowed] = useState(null)

    const blog_banner = "https://images.squarespace-cdn.com/content/v1/5c524a52a9e0288eb5cfa3ee/1616108169603-VV7YD0OXJUPST28QPEKI/LofiVineyard-09+blank+Banner.jpg?format=2500w"
    const iconImage = "https://lofigirl.com/wp-content/uploads/2023/02/DAY_UPDATE_ILLU.jpg"

    const { id } = useParams()
    const history = useHistory()

    // blog by id
    // grab all posts from that blog
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const blogById = useSelector(state => state.blogs.currentBlog)
    const blogFollowers = useSelector(state => state.blogs.followers)
    const initialFollowState = blogFollowers.some(follower => follower.id == currentUser.id)

    console.log(blogById,"----------------------------BlogbyId");



    useEffect(() => {
        setIsFollowed(initialFollowState)
    }, [initialFollowState])

    useEffect(() => {
        // dispatch(getBlogById(id))
        // setIsLoaded(true)
        dispatch(getCurrentUser())
            .then(() => dispatch(getBlogFollowers(id)))
            .then(() => dispatch(getBlogFollowers(id)))
            .then(() => dispatch(getBlogById(id)))
            .then(() => setIsLoaded(true))
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

    }, [dispatch, id, isFollowed])

    const handleFollow = () => {
        if (!isFollowed) {
            setIsFollowed(true)
            dispatch(followABlog(id))
        }
        else {
            setIsFollowed(false)
            dispatch(unFollowABlog(id))
        }
    }

    const handleDelete = async () => {
        if (currentUser.id === blogById.ownerId) {
            dispatch(removeBlogById(blogById.id))
            .then(() => dispatch(getBlogById(id)))
            .then(() => history.push("/my-blogs"))
        }
    }

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
            {isLoaded && blogById && currentUser && id &&(
                <div>
                    <div className="main-feed">
                        <div className="main-post-area">
                            <div className="blog-header">
                                {isFollowed && (
                                    <div className="blog-follow-button-wrapper">
                                        <button className="blog-follow-button" onClick={handleFollow}>Unfollow</button>
                                    </div>
                                )}
                                {
                                    !isFollowed && (
                                        <div className="blog-follow-button-wrapper">
                                            <button className="blog-follow-button" onClick={handleFollow}>Follow</button>
                                        </div>
                                    )
                                }


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
                                            <Link to={`/blog/${id}/edit`}>
                                                <img src={pencil} alt="pencil" className="blog-edit" />
                                            </Link>

                                            <img src={trash} alt="trash" className="blog-edit" onClick={handleDelete}/>
                                        </div>
                                    )
                                }


                            </div>
                            <div className="post-comp">
                                {blogById.posts.slice().reverse().map((post, i) => (
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
