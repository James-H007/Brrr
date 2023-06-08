
import "./MyBlogCollection.css"
import ExploreBlog from "../Explore/ExploreBlog"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../store/users"
import loadingCat from "../../assets/cat.gif"

const MyBlogCollection = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const currentUserBlogs = useSelector(state => state.user.currentUser.blogs)
    console.log(currentUserBlogs)

    useEffect(() => {
        dispatch(getCurrentUser())
        setIsLoaded(true)
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
            {isLoaded && currentUserBlogs && (
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
            )}
        </>

    )
}

export default MyBlogCollection
