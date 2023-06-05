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


const Post = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch()



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
            <div>

    //------------Data We Need For Posts -----------------
            // 1. Once we receive our data, we're going to grab the information from it
            // 2. We're going to need a isLoaded useState
            // 3. We are going to have to fetch the data from destructuring the data
            // 4. Depending on the post-type inside data (aka data.postType) we're going to have different post structures
            // 5. Key into the data and then it will be placed inside of the post

            //------------Data We Need to Pass for Blog Preview -------
            // 1. Just pass in the blogId associated with the post
            </div>
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
