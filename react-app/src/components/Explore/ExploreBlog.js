import { useEffect, useState } from "react"
import "./Explore.css"
import { Link } from "react-router-dom"

const ExploreBlog = ({ blog }) => {
    const [isLoaded, setIsLoaded] = useState()
    const testImage = "https://static.vecteezy.com/system/resources/previews/010/819/805/non_2x/random-minimalist-abstract-illustration-for-logo-card-banner-web-and-printing-free-vector.jpg"
    const iconImage = "https://static-00.iconduck.com/assets.00/perspective-dice-random-icon-469x512-mm6xb9so.png"
    const { bannerImgUrl, blogAvatarUrl, blogName, blogTitle, id } = blog
    useEffect(() => {
        setIsLoaded(true)
    }, [blog])
    return (
        <>
            {
                isLoaded && blog && (
                    <Link to={`/blog/${id}`} className="explore-blog-card" >
                        <div className="explore-preview">
                            <div className="blog-preview-container">
                                <div className="icon-wrapper">
                                    <img
                                        src={blogAvatarUrl}
                                        alt="icon"
                                        className="blog-preview-icon"
                                    />
                                </div>
                                <img
                                    src={bannerImgUrl}
                                    alt="banner"
                                    className="blog-preview-banner"
                                />
                                <div className="preview-bottom-half">
                                    <p className="blog-preview-title">{blogTitle}</p>
                                    <p className="blog-preview-name">@{blogName}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )

            }
        </>
    )
}

export default ExploreBlog
