
import "./FollowingPage.css"

const FollowingPage = () => {

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
