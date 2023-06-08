import "./FollowingPage.css"
import { getCurrentUser } from "../../store/users"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchFollowedBlogs, getBlogById } from "../../store/blogs"
import loadingCat from "../../assets/cat.gif"
import { Link } from "react-router-dom"

const FollowingPage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const followedBlogs = useSelector(state => state.blogs.followedBlogs)

    console.log("--------------------", followedBlogs)

    useEffect(() => {
        dispatch(getCurrentUser())
        dispatch(fetchFollowedBlogs()).then(() => setIsLoaded(true))
        /*
        currentUser (marnie@aa.io) ===
            {
                blogs: [
                {
                bannerImgUrl: 'djsb--------------------kds.png',
                blogAvatarUrl: 'djsbbkbkjbkbkjkdvd.png',
                blogName: 'Marnie',
                blogTitle: 'TESTTSTSTSTSTSTSTSTSTSTS____________________',
                createdAt: 'Wed, 31 May 2023 22:49:58 GMT',
                defaultBlog: false,
                description: 'vjsdkdvsddsv',
                followerCount: 1,
                id: 2,
                ownerId: 2,
                posts: [
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
                  }
                ],
                updatedAt: 'Thu, 01 Jun 2023 22:59:15 GMT'
              }, {
                bannerImgUrl: 'test.png',
                blogAvatarUrl: 'test2.png',
                blogName: 'TESTING',
                blogTitle: 'TEST',
                createdAt: 'Thu, 01 Jun 2023 22:20:39 GMT',
                defaultBlog: true,
                description: 'dvnsvlddsnvklsd',
                followerCount: 0,
                id: 5,
                ownerId: 2,
                posts: [],
                updatedAt: 'Thu, 01 Jun 2023 22:20:39 GMT'
              },

            ],
            createdAt: 'Wed, 31 May 2023 22:49:58 GMT',
            email: 'marnie@aa.io',
            firstName: 'Marnie',
            id: 2,
            lastName: 'Jones',
            profilePicUrl: 'https://64.media.tumblr.com/d713916b3661f9cae54f9f880168a2f2/tumblr_ny5vbt2nLA1umv52oo2_500.png',
            updatedAt: 'Wed, 31 May 2023 22:49:58 GMT',
            username: 'marnie'
        }
        */

    }, [dispatch])



    return (
        <div>
            {(!isLoaded || !followedBlogs) && (
                <>
                    <div className="loading-box">
                        <img src={loadingCat} alt="loading-cat" className="loading-cat" />
                        <p className="loading-message">Loading...</p>
                    </div>

                </>
            )}
            {
                isLoaded && followedBlogs && (
                    <div className="following-feed">
                        <div className="main-following-area">
                            <div>
                                {followedBlogs.map((blog, i) => (
                                    <Link to={`/blog/${blog.id}`} className="followed-blog-link">
                                        <div
                                            key={i}
                                            className='following-blog-comp'>

                                            <div className="following-info">
                                                <div ><img src={blog.blog_avatar} alt="blog-icon" className="post-owner-icon" /> </div>
                                                <div className="following-stat-stack">
                                                    <span className="following-blog-title">{blog.blog_title}</span>
                                                    <span className="following-blog-name">@{blog.blog_name}</span>
                                                </div>
                                            </div>
                                            <span className="following-blog-banner-prev"
                                                style={{
                                                    backgroundImage: `url(${blog.banner_img_url})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    backgroundColor: `rgba(0, 0, 0, 0.1)`,
                                                }}
                                            ></span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }


        </div>
    )
}

export default FollowingPage
