
import "./PostFormModal.css"

const ImagePostForm = ({ postType }) => {
    //Should receive a prop of what the post type is based on the click

    return (
        <div className="post-form-container">
            <div className="post-form-content">
                <header className="post-form-header">
                    <img src="https://thelifeofyourtime.files.wordpress.com/2016/05/bloodroot.jpg" alt="flower" className="post-maker-icon" />
                    Username
                </header>
                <form className="post-form">
                    <div class="file-input-wrapper">
                        <input type="file" id="fileInput" name="filename" />
                        <label for="fileInput" class="custom-file-upload">
                            Select a file
                        </label>

                    </div>
                    <textarea
                        type="textarea"
                        className="post-form-input-text"
                        placeholder="Maximum file size is 20mb..."
                        name="text"
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

export default ImagePostForm
