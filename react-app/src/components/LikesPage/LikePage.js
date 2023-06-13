import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post";
import "../Feed/Feed.css";
import "./LikesPage.css"
import { getMyLikes } from "../../store/likes"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LikesPage = () => {
  const [likedPostsAmount, setLikedPostsAmount] = useState(null);
  const [noLikes, setNoLikes] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory()

  const noLikers = "https://media.tenor.com/V6viLE6UQPEAAAAC/john-travolta-where-are-you-guys.gif"
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
  const initialLikesAmount = currentUserLikes.length
  // console.log(currentUserLikes, "-------------------")

  // useEffect(() => {
  //   if (currentUserLikes.length === 0) {
  //     dispatch(getMyLikes())
  //     if (currentUserLikes.length === 0) {
  //       history.push("/feed")
  //     }
  //   }
  // }, [currentUserLikes, history]);

  useEffect(() => {
    setLikedPostsAmount(initialLikesAmount)
  }, [initialLikesAmount])

  useEffect(() => {
    setLikedPostsAmount(currentUserLikes.length)
    console.log(likedPostsAmount, "LIKED POST AMOUNT")

  }, [currentUserLikes, likedPostsAmount])

  useEffect(() => {
    setIsLoaded(false)
    if (likedPostsAmount === 0) {
      setNoLikes(true)
      // history.push("/feed")
    }
    else if (likedPostsAmount > 0) {
      dispatch(getMyLikes())
    }
    setIsLoaded(true)
  }, [likedPostsAmount, dispatch, history])



  useEffect(() => {
    dispatch(getMyLikes()).then(() => setIsLoaded(true))


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
      {!isLoaded && (
        <p>
          Loading...
        </p>
      )}
      {isLoaded && ((currentUserLikes === 0) || noLikes) && (
        <>

          <img src={noLikers} alt="gif" className="no-likes-gif" />
          <p className="no-likes">
            No likes are here. Try liking stuff first.
          </p>
        </>
      )}
      {
        isLoaded && (currentUserLikes.length > 0) && !noLikes && (
          <div className="main-feed">
            <div className="main-post-area">
              <div className="like-header">
                Likes ❤️
              </div>

              <div className="post-comp">
                {currentUserLikes.map((data) => (
                  <div key={data.id}>
                    <Post post={data.post} />
                  </div>

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
