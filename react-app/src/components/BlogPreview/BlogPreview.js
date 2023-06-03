import "./BlogPreview.css"


const BlogPreview = () => {
    const testImage = "https://static.vecteezy.com/system/resources/previews/010/819/805/non_2x/random-minimalist-abstract-illustration-for-logo-card-banner-web-and-printing-free-vector.jpg"
    const iconImage = "https://static-00.iconduck.com/assets.00/perspective-dice-random-icon-469x512-mm6xb9so.png"
    return (
        <div className="blog-preview">
            <div className="blog-preview-container">
                <div className="icon-wrapper">
                    <img
                        src={iconImage}
                        alt="icon"
                        className="blog-preview-icon"
                    />
                </div>
                <img
                    src={testImage}
                    alt="banner"
                    className="blog-preview-banner"
                />
                <div className="preview-bottom-half">
                    <p className="blog-preview-title">Blog title</p>
                    <p className="blog-preview-name">@blogname</p>
                </div>
            </div>
        </div>
    )
}

export default BlogPreview
