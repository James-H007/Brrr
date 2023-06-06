import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import heart from "../../assets/heart-regular.svg"
import comment from "../../assets/comment-regular.svg"
import share from "../../assets/share.svg"
import pencil from "../../assets/pencil-solid.svg"
import trash from "../../assets/trash-can-regular.svg"
import "./post.css"
import BlogPreview from "../BlogPreview/BlogPreview";
import { getAllBlogs } from "../../store/blogs";
import stockVideo from "../../assets/stock.mp4"


const Post = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch()
    const image = "https://pbs.twimg.com/media/Fx1uzZJacAEjHI4?format=jpg&name=small"
    let postContent;
    const postUrl = "youtube.com"
    let postType = "video"
    if (postType == "text") {
        postContent = (
            <div className="post-body">
                <p className="post-title">
                    Post Content
                </p>
                <p className="post-description">
                    Post description
                </p>
            </div>
        )
    }

    else if (postType == "image") {
        postContent = (
            <div>
                <img src={image} alt="post-image" className="post-image" />
                <p className="post-description">
                    Post description
                </p>
            </div>

        )
    }

    else if (postType == "link") {
        postContent = (
            <div className="post-body">
                <a href={postUrl} className="post-url"> {postUrl}</a>
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
                    Post description
                </p>
            </div>
        )
    }






    useEffect(() => {
        const test = dispatch(getAllBlogs())
        console.log(test)
    }, [dispatch])

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

    return (
        <>
            {isHovered && (<BlogPreview />)}
            <div className="post-container">

                <div>

                    <header className="post-header">
                        <div>
                            <img
                                src="https://thelifeofyourtime.files.wordpress.com/2016/05/bloodroot.jpg"
                                alt="flower"
                                className="post-owner-icon"
                                onMouseEnter={handleHover}
                                onMouseLeave={handleMouseLeave}
                            />
                        </div>

                        <div className="post-owner-time">
                            <div className="post-owner">
                                Post Owner
                                <div className="post-owner-follow">Follow</div>
                            </div>
                            <div className="post-time">
                                Post Time
                            </div>
                        </div>
                    </header>
                    {postContent}
                    <footer>
                        <div className="post-stats">
                            <p className="post-notes"># Notes</p>
                            <div className="post-icons">
                                <div className="post-icon"><img src={trash} alt="trash-icon" /></div>
                                <div className="post-icon"><img src={pencil} alt="pencil-icon" /></div>
                                <div className="post-icon"><img src={share} alt="heart-icon" /></div>
                                <div className="post-icon"><img src={comment} alt="comment-icon" /></div>
                                <div className="post-icon"><img src={heart} alt="heart-icon" /></div>

                            </div>
                        </div>
                    </footer>
                </div>
            </div >
        </>
    )
}

export default Post
