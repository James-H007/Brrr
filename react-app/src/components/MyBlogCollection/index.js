
import "./MyBlogCollection.css"
import ExploreBlog from "../Explore/ExploreBlog"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../store/users"

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
