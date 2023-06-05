import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import PostOpenModalButton from "../PostOpenModalButton";
import PostFormModal from "../PostFormModal";
import TextPostForm from "../PostFormModal/TextPostForm";
import ImagePostForm from "../PostFormModal/ImagePostForm";
import "./Feed.css"
import text from "../../assets/font-solid.svg"
import image from "../../assets/image.svg"
import link from "../../assets/link.svg"
import video from "../../assets/video.svg"
import Post from '../Post'

const Feed = () => {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();




    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            <div className='main-feed'>
                <div>
                //-------------Data We Need -------------
    // 1. All the blogs that the user follows
    // 2. Grab all the posts from those blogs and then combine them
    // 3. Sort the posts from most recent to oldest
    // 4. Pass it in as data inside of the <Post /> component
                </div>
                <div className='main-post-area'>
                    <div className='post-select'>
                        <PostOpenModalButton
                            buttonText="Text"
                            iconType={text}
                            modalComponent={<TextPostForm postType="TEXT" />}
                        />
                        <PostOpenModalButton
                            buttonText="Image"
                            iconType={image}
                            modalComponent={<ImagePostForm postType="IMAGE" />}
                        />
                        <PostOpenModalButton
                            buttonText="Link"
                            iconType={link}
                            modalComponent={<PostFormModal postType="LINK" />}
                        />
                        <PostOpenModalButton
                            buttonText="Video"
                            iconType={video}
                            modalComponent={<ImagePostForm postType="VIDEO" />}
                        />
                    </div>
                    <div className='post-comp'>
                        <Post />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed
