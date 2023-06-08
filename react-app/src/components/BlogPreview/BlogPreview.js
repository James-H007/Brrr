import { useEffect, useState } from "react"
import "./BlogPreview.css"
import { useDispatch, useSelector } from "react-redux"
import { getBlogById } from "../../store/blogs"
import loadingCat from "../../assets/cat.gif"


const BlogPreview = ({ blogId }) => {
    const testImage = "https://static.vecteezy.com/system/resources/previews/010/819/805/non_2x/random-minimalist-abstract-illustration-for-logo-card-banner-web-and-printing-free-vector.jpg"
    const iconImage = "https://static-00.iconduck.com/assets.00/perspective-dice-random-icon-469x512-mm6xb9so.png"
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState()
    const blogById = useSelector(state => state.blogs.currentBlog)
    useEffect(() => {
        dispatch(getBlogById(blogId))
        setIsLoaded(true)
    }, [dispatch])


    return (
        <>
            {(!isLoaded || !blogById) && (
                <>
                    Loading...
                </>
            )}
            {
                isLoaded && blogById && (
                    <div className="blog-preview">
                        <div className="blog-preview-container">
                            <div className="icon-wrapper">
                                <img
                                    src={blogById.blogAvatarUrl}
                                    alt="icon"
                                    className="blog-preview-icon"
                                />
                            </div>
                            <img
                                src={blogById.bannerImgUrl}
                                alt="banner"
                                className="blog-preview-banner"
                            />
                            <div className="preview-bottom-half">
                                <p className="blog-preview-title">{blogById.blogTitle}</p>
                                <p className="blog-preview-name">@{blogById.blogName}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </>


    )
}

export default BlogPreview
