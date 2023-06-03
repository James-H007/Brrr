import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Post from "../Post";
import "../Feed/Feed.css";

const LikesPage = () => {
  //   const [likedPosts, setLikedPosts] = useState([]);

  //   useEffect(() => {
  //     const fetchLikedPosts = async () => {
  //     // const likedPostsData = await get_user_liked_posts();
  //     setLikedPosts(likedPostsData);
  //     };

  //     fetchLikedPosts();
  //   }, []);

  //<------------------------------------------------->
  //  1. pull data with user's liked post
  // 2. post data

  return (
    <div className="main-feed">
      <div className="main-post-area">
        <div className="post-select"></div>
        <div className="post-comp">
          {/* {likedPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))} */}
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
};

export default LikesPage;
