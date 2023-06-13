// import BlogPreview from "../BlogPreview/BlogPreview"
import "./Explore.css"
import ExploreBlog from "./ExploreBlog"
import { getAllBlogs } from "../../store/blogs"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import loadingCat from "../../assets/cat.gif"


const Explore = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()
  const allBlogs = useSelector(state => state.blogs.blogs)

  useEffect(() => {
    dispatch(getAllBlogs()).then(() => setIsLoaded(true))
    // setIsLoaded(true)
    /*
    allBlogs ===

     [
        {
          bannerImgUrl:
            'https://img.freepik.com/premium-photo/wide-banner-with-many-random-square-hexagons-charcoal-dark-black-color_105589-1820.jpg',
          blogAvatarUrl:
            'https://64.media.tumblr.com/ac46b069c7bb24e2ee5bf368a32b84fe/5c65a2189e2d73b7-9d/s540x810/384c42854b3fca915f79ffcb8dc711665b7c3519.jpg',
          blogName: 'Demo',
          blogTitle: 'My Demo Blog',
          createdAt: 'Wed, 31 May 2023 22:49:58 GMT',
          defaultBlog: true,
          description: 'This is Demo User\'s blog',
          followerCount: 0,
          id: 1,
          ownerId: 1,
          posts: [
            {
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
            }
          ],
          updatedAt: 'Wed, 31 May 2023 22:49:58 GMT'

        }, {...}

    */
  }, [dispatch])



  return (<>
    {!isLoaded && (
      <>
        <div className="loading-box">
          <img src={loadingCat} alt="loading-cat" className="loading-cat" />
          <p className="loading-message">Loading...</p>
        </div>
      </>
    )}
    {isLoaded && (
      <div className="explore-page">
        <div className="explore-container">
          {
            allBlogs.map((blog, i) => (
              <>
                <ExploreBlog blog={blog} />
              </>
            ))
          }

        </div>
      </div>
    )}


  </>

  )
}

export default Explore
