import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchFollowedBlogs } from "../../store/blogs";
import { getAllPosts } from "../../store/posts";
import LinkPostForm from "../PostFormModal/LinkPostForm";

const Feed = () => {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch()
    const currentUsersFollowedBlogs = useSelector(state => Object.values(state.blogs.followedBlogs))
    const allPosts = useSelector(state => Object.values(state.posts.allPosts))

    // When you query, do this:
    // currentUsersFollowedBlogs.map((i) => i.id === allPosts.blogId)
    // const currentFeed = currentUsersFollowedBlogs.map((i) => i.id === allPosts.blogId)

    const followedBlogsIds = currentUsersFollowedBlogs.map((blog) => blog.id)
    const currentFeed = allPosts.filter(post => followedBlogsIds.includes(post.blogId))
    // console.log(followedBlogsIds, "--------Array of followed blog ids")
    // console.log(currentFeed, "-------------LOOOK HERE CURRENT FEED")
    useEffect(() => {
        dispatch(fetchFollowedBlogs())
        /*
         currentUsersFollowedBlogs === [ { blog_avatar: 'djsbbkbkjbkbkjkdvd.png', blog_name: 'Marnie', id: 2 } ]
        */
    }, [dispatch])



    useEffect(() => {
        dispatch(getAllPosts())
        /*
        allPosts ===
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
       },
       */
    }, dispatch)



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
                <div className='main-post-area'>
                    <div className='post-select'>
                        <PostOpenModalButton
                            buttonText="Text"
                            iconType={text}
                            modalComponent={<TextPostForm postType="text" />}
                        />
                        <PostOpenModalButton
                            buttonText="Image"
                            iconType={image}
                            modalComponent={<ImagePostForm postType="image" />}
                        />
                        <PostOpenModalButton
                            buttonText="Link"
                            iconType={link}
                            modalComponent={<LinkPostForm postType="link" />}
                        />
                        <PostOpenModalButton
                            buttonText="Video"
                            iconType={video}
                            modalComponent={<ImagePostForm postType="video" />}
                        />
                    </div>
                    <div className='post-comp'>
                        {
                            currentFeed.map((post, i) => (
                                <>
                                    <Post post={post} />
                                </>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed
