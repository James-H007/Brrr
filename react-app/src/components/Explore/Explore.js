import BlogPreview from "../BlogPreview/BlogPreview"
import "./Explore.css"
import ExploreBlog from "./ExploreBlog"

const Explore = () => {



    return (
        <div className="explore-page">
            <div>
                Data to Fetch -----------------------------------------------
                1. Fetch all of the blogs
                2. Map out the data and pass it as a prop
                3. The Explore Blog will receive that data and display it
            </div>
            <div className="explore-container">
                <ExploreBlog />
            </div>
        </div>
    )
}

export default Explore
