
import "./MyBlogCollection.css"
import ExploreBlog from "../Explore/ExploreBlog"

const MyBlogCollection = () => {
    return (
        <div>
            <div className="explore-page">
                <div>
                    Data to Fetch -----------------------------------------------
                    1. Fetch all of the blogs the user owns
                    2. Map out the data and pass it as a prop
                    3. The Explore Blog will receive that data and display it
                </div>
                <div className="explore-container">
                    <ExploreBlog />
                </div>
            </div>
        </div>
    )
}

export default MyBlogCollection

