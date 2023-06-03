import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import heart from "../../assets/heart-regular.svg"
import comment from "../../assets/comment-regular.svg"
import share from "../../assets/share.svg"
import pencil from "../../assets/pencil-solid.svg"
import trash from "../../assets/trash-can-regular.svg"
import "./post.css"
import BlogPreview from "../BlogPreview/BlogPreview";


const Post = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch()

    const handleHover = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <>

            <div className="post-container">
                {isHovered && (<BlogPreview />)}
                <div
                    onMouseEnter={handleHover}
                    onMouseLeave={handleMouseLeave}>
                    <header className="post-header">
                        <div>
                            <img src="https://thelifeofyourtime.files.wordpress.com/2016/05/bloodroot.jpg" alt="flower" className="post-owner-icon" />
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
                    <div className="post-body">
                        <p className="post-content">
                            Post Content
                        </p>
                        <p className="post-description">
                            Post description
                        </p>
                    </div>
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
