import Post from "../Post"
import "./Blog.css"

const Blog = () => {
    const blog_banner = "https://images.squarespace-cdn.com/content/v1/5c524a52a9e0288eb5cfa3ee/1616108169603-VV7YD0OXJUPST28QPEKI/LofiVineyard-09+blank+Banner.jpg?format=2500w"
    const iconImage = "https://lofigirl.com/wp-content/uploads/2023/02/DAY_UPDATE_ILLU.jpg"
    return (
        <div>
            <div className="main-feed">
                <div className="main-post-area">
                    <div className="blog-header">
                        <div className="blog-icon-wrapper">
                            <img
                                src={iconImage}
                                alt="icon"
                                className="blog-avatar-icon"
                            />
                        </div>
                        <img src={blog_banner} alt="blog-banner" className="blog-banner" />
                        <p className="blog-title">Blog Title</p>
                        <p className="blog-url">@blogname</p>
                        <p className="blog-description">Welcome to my blog!</p>
                    </div>
                    <div className="post-comp">
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog
