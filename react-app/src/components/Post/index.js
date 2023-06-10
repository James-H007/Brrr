import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import heart from "../../assets/heart-regular.svg";
import filledHeart from "../../assets/heart-solid.svg";
import comment from "../../assets/comment-regular.svg";
import share from "../../assets/share.svg";
import pencil from "../../assets/pencil-solid.svg";
import trash from "../../assets/trash-can-regular.svg";
import "./post.css";
import BlogPreview from "../BlogPreview/BlogPreview";
import { fetchFollowedBlogs, getAllBlogs } from "../../store/blogs";
import stockVideo from "../../assets/stock.mp4";
import { getBlogById } from "../../store/blogs";
import { getCurrentUser } from "../../store/users";
import {
    getMyLikes,
    likePostThunk,
    unlikePost,
    unlikePostThunk,
} from "../../store/likes";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditTextFormModal from "../editPostFormModal/editTextFormModal";
import EditImageFormModal from "../editPostFormModal/EditImageFormModal"
import EditVideoFormModal from "../editPostFormModal/EditVideoFormModal";
import PostOpenModalButton from "../PostOpenModalButton";

const Post = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLiked, setisLiked] = useState(false);
    const [isFollowed, setisFollowed] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [postLikes, setPostLikes] = useState(null)

    // const [blogAvatar, setBlogAvatar] = useState("")
    // const [blogName, setBlogName] = useState("")
    const dispatch = useDispatch();
    // console.log(post, "-----------------Here is the post!")

    // console.log(post)
    //If currentUser.id == blogById.ownerId
    // console.log("User LIKES ARRAY--------------", userLikes)
    const closeMenu = () => setShowMenu(false);

    const {
        blogId,
        createdAt,
        imageEmbedCode,
        notes,
        postDescription,
        postTitle,
        postType,
        videoEmbedCode,
        id,
        likes,
        blog,
    } = post;
    const blogById = useSelector((state) => state.blogs.currentBlog);
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentUserLikes = useSelector((state) =>
        Object.values(state.likes.myLikes)
    );

    const likesPostIds = currentUserLikes.map((like) => like.postId);
    const initialLikeState = likesPostIds.includes(post.id);
    // console.log(currentUser, "---------------LOOKIE HERE");
    let postContent;
    let blogAvatarUrl;
    if (!blog) {
        blogAvatarUrl = blogById.blogAvatarUrl;
    } else if (blog) {
        blogAvatarUrl = blog.blogAvatarUrl;
    }

    let blogName;
    if (!blog) {
        blogName = blogById.blogName;
    } else if (blog) {
        blogName = blog.blogName;
    }

    let ownerId;
    if (!blog) {
        ownerId = blogById.ownerId;
    } else if (blog) {
        ownerId = blog.ownerId;
    }

    if (postType == "text") {
        postContent = (
            <div className="post-body">
                <p className="post-title">{postTitle}</p>
                <p className="post-description">{postDescription}</p>
            </div>
        );
    } else if (postType == "image") {
        postContent = (
            <div>
                <img src={imageEmbedCode} alt="post-image" className="post-image" />
                <p className="post-description">{postDescription}</p>
            </div>
        );
    } else if (postType == "link") {
        postContent = (
            <div className="post-body">
                <a href={postDescription} className="post-url" target="_blank" rel="noopener noreferrer">
                    {" "}
                    {postDescription}
                </a>
                <p className="post-description">
                    Click on our totally not suspicious link
                </p>
            </div>
        );
    } else if (postType == "video") {
        postContent = (
            <div>
                <video controls className="post-video">
                    <source src={videoEmbedCode} type="video/mp4" />
                    <source src={videoEmbedCode} type="video/webm" />
                </video>
                <p className="post-description">{postDescription}</p>
            </div>
        );
    }

    useEffect(() => {
        dispatch(getBlogById(blogId))
            .then(() => dispatch(getCurrentUser()))
            .then(() => dispatch(getAllBlogs()))
            .then(() => dispatch(getMyLikes()))
            .then(() => dispatch(fetchFollowedBlogs()))
            .then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        setisLiked(initialLikeState);
    }, [initialLikeState]);

    useEffect(() => {
        setPostLikes(likes)
    }, [likes])

    const handleHover = () => {
        setTimeout(() => {
            setIsHovered(true);
        }, 200); // Delay in milliseconds before showing the Blog Preview
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            setIsHovered(false);
        }, 200); // Delay in milliseconds before hiding the Blog Preview
    };

    const handleLike = () => {
        if (!isLiked) {

            dispatch(likePostThunk(id));
        } else {

            dispatch(unlikePostThunk(id));
        }

        setisLiked(!isLiked)

        let updatedLikesCount = isLiked ? likes - 1 : likes + 1;
        if (updatedLikesCount < 0) {
            updatedLikesCount = 0;
        }
        setPostLikes(updatedLikesCount)
    };

    const handleEdit = () => {
        <OpenModalButton
            onItemClick={closeMenu}
            modalComponent={<editTextFormModal />}
        />;
    };

    return (
        <>
            {(!isLoaded || !blog) && <p>Loading...</p>}
            {isLoaded && currentUser && blogById && (
                <>
                    {isHovered && <BlogPreview blogId={blogId} />}
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
                                    <div className="post-time">{createdAt}</div>
                                </div>
                            </header>
                            {postContent}
                            <footer>
                                <div className="post-stats">
                                    <p className="post-notes">{postLikes} Notes</p>
                                    <div className="post-icons">
                                        {currentUser.id == ownerId && (
                                            <div className="post-icon">
                                                <img src={trash} alt="trash-icon" />
                                            </div>
                                        )}
                                        {currentUser.id == ownerId && postType == "text" && (
                                            <div className="post-icon">
                                                <PostOpenModalButton
                                                    iconType={pencil}
                                                    modalComponent={<EditTextFormModal postData={post} />}
                                                />
                                            </div>
                                        )}
                                        {currentUser.id == ownerId && postType == "image" && (
                                            <div className="post-icon">
                                                <PostOpenModalButton
                                                    iconType={pencil}
                                                    modalComponent={<EditImageFormModal postData={post} />}
                                                />
                                            </div>
                                        )}
                                        {currentUser.id == ownerId && postType == "video" && (
                                            <div className="post-icon">
                                                <PostOpenModalButton
                                                    iconType={pencil}
                                                    modalComponent={<EditVideoFormModal postData={post} />}
                                                />
                                            </div>
                                        )}
                                        <div className="post-icon">
                                            <img src={share} alt="heart-icon" />
                                        </div>
                                        <div className="post-icon">
                                            <img src={comment} alt="comment-icon" />
                                        </div>
                                        {!isLiked && (
                                            <div className="post-icon">
                                                <img
                                                    src={heart}
                                                    alt="heart-icon"
                                                    onClick={handleLike}
                                                    className="heart"
                                                />
                                            </div>
                                        )}
                                        {isLiked && (
                                            <div className="post-icon">
                                                <img
                                                    src={filledHeart}
                                                    alt="heart-icon"
                                                    onClick={handleLike}
                                                    className="heart"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </footer>

                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Post;
