import "./FollowingPage.css"
import { getCurrentUser } from "../../store/users"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"


const FollowingPage = () => {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)

    useEffect(() => {
        dispatch(getCurrentUser())

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



    const test_data = [
        {
            image: "https://xsgames.co/randomusers/assets/images/favicon.png",
            username: "Joe",
            createdAt: "10/10/2000",
        },
        {
            image: "https://www.harleytherapy.co.uk/counselling/wp-content/uploads/16297800391_5c6e812832.jpg",
            username: "Lily",
            createdAt: "11/10/2010"
        },
        {
            image: "https://cdn.drawception.com/images/avatars/647493-B9E.png",
            username: "CartoonMan",
            createdAt: "08/10/2210"
        }
    ]

    return (
        <div>
            <div>
            //---------Data We need for Following Page-----------
            // 1. We need to find the current user
            // 2. Find what blogs the current user follows
            // 3. With that map out the blogs and grab the blog_avatar_url, blogname, createdAt

            </div>
            <div className="following-feed">
                <div className="main-following-area">
                    <div>
                        {test_data.map((blog, i) => (
                            <div key={i} className={`following-blog-comp ${blog.loaded ? 'loaded' : ''}`}>
                                <div className="following-icon-users">
                                    <div ><img src={blog.image} alt="flower" className="post-owner-icon" /> </div>
                                    <div className="following-stat-stack">
                                        <span className="following-blog-name">{blog.username}</span>
                                        <span>{blog.createdAt}</span>
                                    </div>
                                </div>
                                <div className="following-unfollow">Unfollow</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowingPage
