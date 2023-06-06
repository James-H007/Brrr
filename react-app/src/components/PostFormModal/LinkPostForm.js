
import "./PostFormModal.css"

const LinkPostForm = ({ postType }) => {
    //Should receive a prop of what the post type is based on the click

    return (
        <div className="post-form-container">
            <div className="post-form-content">
                <header className="post-form-header">
                    <img src="https://thelifeofyourtime.files.wordpress.com/2016/05/bloodroot.jpg" alt="flower" className="post-maker-icon" />
                    Username
                </header>
                <form className="post-form">
                    <input
                        type="text"
                        className="post-form-input-link"
                        placeholder="Link..."
                        name="link"
                    />
                    <div className="close-post-buttons">
                        <button className="poster-button">Close</button>
                        <button className="poster-button">Post</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default LinkPostForm
