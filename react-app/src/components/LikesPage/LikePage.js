import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post";
import "../Feed/Feed.css";
import "./LikesPage.css"
import { getMyLikes } from "../../store/likes"

const LikesPage = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   const fetchLikedPosts = async () => {
  //     // const likedPostsData = await get_user_liked_posts();
  //     setLikedPosts(likedPostsData);
  //   };

  //   fetchLikedPosts();
  // }, []);

  //<------------------------------------------------->
  //  1. pull data with user's liked post
  // 2. post data

  const dispatch = useDispatch()
  const currentUserLikes = useSelector(state => Object.values(state.likes.myLikes))
  console.log(currentUserLikes, "-------------------")

  useEffect(() => {
    dispatch(getMyLikes())
    setIsLoaded(true)
    /*
    currentUserLikes ===
        [
            {
              createdAt: 'Wed, 31 May 2023 22:49:58 GMT',
              id: 2,
              isLiked: true,
              post: {
                blogId: 1,
                comments: [],
                createdAt: 'Wed, 31 May 2023 22:49:58 GMT',
                id: 1,
                imageEmbedCode: 'fake.url',
                likes: 1,
                notes: 0,
                postDescription: 'Hello, Demo User here. It\'s my first post',
                postImages: [
                  {
                    createdAt: 'Wed, 31 May 2023 22:49:58 GMT',
                    id: 1,
                    imageUrl:
                      'https://www.state.gov/wp-content/uploads/2020/07/72-729738_youtube-red-circle-circle-youtube-logo-png-clipart.jpg',
                    postId: 1,
                    updatedAt: 'Wed, 31 May 2023 22:49:58 GMT'
                  }
                ],
                postTitle: 'Demo User\'s First Post',
                postType: 'text',
                reblogs: 0,
                updatedAt: 'Wed, 31 May 2023 22:49:58 GMT',
                userId: 1,
                videoEmbedCode: 'fake.url'
              },
              postId: 1,
              updatedAt: 'Wed, 31 May 2023 22:49:58 GMT',
              userId: 2
            }
        ]
    */

  }, [dispatch])


  return (
    <>
      {
        isLoaded && (
          <div className="main-feed">
            <div className="main-post-area">
              <div className="like-header">
                Likes ❤️
              </div>
              <div className="post-comp">
                {currentUserLikes.map((data) => (
                  <Post key={data.id} post={data.post} />
                ))}
                {/* <Post /> */}
              </div>
            </div>
          </div>
        )
      }

    </>
  );
};

export default LikesPage;
