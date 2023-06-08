import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import heart from "../../assets/heart-regular.svg"
import filledHeart from "../../assets/heart-solid.svg"
import comment from "../../assets/comment-regular.svg"
import share from "../../assets/share.svg"
import pencil from "../../assets/pencil-solid.svg"
import trash from "../../assets/trash-can-regular.svg"
import "./post.css"
import BlogPreview from "../BlogPreview/BlogPreview";
import { fetchFollowedBlogs, getAllBlogs } from "../../store/blogs";
import stockVideo from "../../assets/stock.mp4"
import { getBlogById } from "../../store/blogs";
import { getCurrentUser } from "../../store/users";
import { getMyLikes, likePostThunk, unlikePost, unlikePostThunk } from "../../store/likes";
import { Link } from "react-router-dom"

const Post = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLiked, setisLiked] = useState(false)
    const [isFollowed, setisFollowed] = useState(false)
    // const [blogAvatar, setBlogAvatar] = useState("")
    // const [blogName, setBlogName] = useState("")
    const dispatch = useDispatch()
    // console.log(post, "-----------------Here is the post!")

    // console.log(post)
    //If currentUser.id == blogById.ownerId
    // console.log("User LIKES ARRAY--------------", userLikes)

    const { blogId, createdAt, imageEmbedCode, notes, postDescription, postTitle, postType, videoEmbedCode, id, likes, blog } = post
    const blogById = useSelector(state => state.blogs.currentBlog)
    const currentUser = useSelector(state => state.user.currentUser)
    const currentUserLikes = useSelector(state => Object.values(state.likes.myLikes))



    const likesPostIds = currentUserLikes.map((like) => like.postId)
    const initialLikeState = likesPostIds.includes(post.id)
    console.log(currentUser, "---------------LOOKIE HERE")
    let postContent;
    let blogAvatarUrl
    if (!blog) {
        blogAvatarUrl = blogById.blogAvatarUrl
    }
    else if (blog) {
        blogAvatarUrl = blog.blogAvatarUrl
    }

    let blogName;
    if (!blog) {
        blogName = blogById.blogName
    }
    else if (blog) {
        blogName = blog.blogName
    }

    let ownerId;
    if (!blog) {
        ownerId = blogById.ownerId
    }
    else if (blog) {
        ownerId = blog.ownerId
    }


    if (postType == "text") {
        postContent = (
            <div className="post-body">
                <p className="post-title">
                    {postTitle}
                </p>
                <p className="post-description">
                    {postDescription}
                </p>
            </div>
        )
    }

    else if (postType == "image") {
        postContent = (
            <div>
                <img src={imageEmbedCode} alt="post-image" className="post-image" />
                <p className="post-description">
                    {postDescription}
                </p>
            </div>

        )
    }

    else if (postType == "link") {
        postContent = (
            <div className="post-body">
                <a href={postDescription} className="post-url"> {postDescription}</a>
                <p className="post-description">Click on our totally not suspicious link</p>
            </div>
        )
    }

    else if (postType == "video") {
        postContent = (
            <div>
                <video controls className="post-video">
                    <source src={stockVideo} type="video/mp4" />
                    <source src={stockVideo} type="video/webm" />
                </video>
                <p className="post-description">
                    {postDescription}
                </p>
            </div>
        )
    }


    useEffect(() => {
        dispatch(getBlogById(blogId))
            .then(() => dispatch(getCurrentUser()))
            .then(() => dispatch(getAllBlogs()))
            .then(() => dispatch(getMyLikes()))
            .then(() => dispatch(fetchFollowedBlogs()))
            .then(() => setIsLoaded(true))
    }, [dispatch, isLiked])

    useEffect(() => {
        setisLiked(initialLikeState);

    }, [initialLikeState])



    const handleHover = () => {
        setTimeout(() => {
            setIsHovered(true);
        }, 200); // Delay in milliseconds before showing the Blog Preview
    }

    const handleMouseLeave = () => {
        setTimeout(() => {
            setIsHovered(false);
        }, 200); // Delay in milliseconds before hiding the Blog Preview
    }

    const handleLike = () => {
        if (!isLiked) {
            setisLiked(true)
            dispatch(likePostThunk(id))
        }
        else {
            setisLiked(false)
            dispatch(unlikePostThunk(id))
        }
    }

    return (
        <>
            {(!isLoaded || !blog) && (
                <p>
                    Loading...
                </p>
            )}
            {
                isLoaded && currentUser && blogById && (
                    <>
                        {isHovered && (<BlogPreview blogId={blogId} />)}
                        <div className="post-container">

                            <div>

                                <header className="post-header">
                                    <div>
                                        <Link to={`/blog/${blogId}`}>
                                            <img
                                                src={blogAvatarUrl}
                                                alt="blog-avatar"
                                                className="post-owner-icon"
                                                onMouseEnter={handleHover}
                                                onMouseLeave={handleMouseLeave}
                                            />
                                        </Link>
                                    </div>

                                    <div className="post-owner-time">
                                        <div className="post-owner">
                                            {blogName}
                                            {/* <div className="post-owner-follow">Follow</div> */}
                                        </div>
                                        <div className="post-time">
                                            {createdAt}
                                        </div>
                                    </div>
                                </header>
                                {postContent}
                                <footer>
                                    <div className="post-stats">
                                        <p className="post-notes">{likes} Notes</p>
                                        <div className="post-icons">
                                            {(currentUser.id == ownerId) && (<div className="post-icon"><img src={trash} alt="trash-icon" /></div>)}
                                            {(currentUser.id == ownerId) && (<div className="post-icon"><img src={pencil} alt="pencil-icon" /></div>)}
                                            <div className="post-icon"><img src={share} alt="heart-icon" /></div>
                                            <div className="post-icon"><img src={comment} alt="comment-icon" /></div>
                                            {!isLiked && (<div className="post-icon"><img src={heart} alt="heart-icon" onClick={handleLike} className="heart" /></div>)}
                                            {isLiked && (<div className="post-icon"><img src={filledHeart} alt="heart-icon" onClick={handleLike} className="heart" /></div>)}
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div >
                    </>
                )
            }

        </>
    )
}

export default Post
