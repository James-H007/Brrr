
import "./MyBlogCollection.css"
import ExploreBlog from "../Explore/ExploreBlog"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../store/users"
import loadingCat from "../../assets/cat.gif"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const MyBlogCollection = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const currentUserBlogs = useSelector(state => state.user.currentUser.blogs)
    console.log(currentUserBlogs)

    const noBlogs = "https://media.tenor.com/KO7gk7WEvkAAAAAC/bob-ross-pointing.gif"

    useEffect(() => {
        dispatch(getCurrentUser())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <>
            {(!isLoaded || !currentUserBlogs) && (
                <>
                    <div className="loading-box">
                        <img src={loadingCat} alt="loading-cat" className="loading-cat" />
                        <p className="loading-message">Loading...</p>
                    </div>
                </>
            )}
            {isLoaded && currentUserBlogs && currentUserBlogs.length > 0 ? (
                <div>
                    <div className="explore-page">
                        <div className="explore-container">
                            {
                                currentUserBlogs.map((blog, i) => (
                                    <>
                                        <ExploreBlog blog={blog} />
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <img src={noBlogs} alt="gif" className="no-likes-gif" />
                    <p className="no-likes">
                        You have no blogs...
                        Get out there and create something!
                    </p>
                    <Link to="/blogs/create" className="create-blog">Create a Blog</Link>
                </>
            )}
        </>

    )
}

export default MyBlogCollection
