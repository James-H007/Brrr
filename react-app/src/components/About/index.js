import "./About.css"
import github from "../../assets/github-mark.svg"
import linkedIn from "../../assets/linkedin.png"

const About = () => {
    const mountains = "https://i.redd.it/kk0d67auaat71.jpg"
    const snowflake = "https://static.vecteezy.com/system/resources/thumbnails/004/999/451/small/snowflake-icon-on-grey-background-free-vector.jpg"
    const matthew = "https://cdn.discordapp.com/attachments/1141529386860937236/1141837864989102140/image.png"
    const james = "https://media.licdn.com/dms/image/D5603AQH2XJHyBnxoXQ/profile-displayphoto-shrink_800_800/0/1684278216082?e=1697673600&v=beta&t=jZIl34k7_ivjtmrlib9O70cxnkvVYqfmdtzcoE8zmwc"
    const sterling = "https://ca.slack-edge.com/T03GU501J-U035EV1GQPN-55c8f85f0fcd-512"
    return (
        <div>
            <div className="main-feed-2">
                <div className="main-post-area">
                    <div className="blog-header">

                        <div className="blog-icon-wrapper">
                            <img
                                src={snowflake}
                                alt="icon"
                                className="blog-avatar-icon"
                            />
                        </div>
                        <img src={mountains} alt="blog-banner" className="blog-banner" />
                        <p className="blog-title">The Team</p>
                        {/* <p className="blog-url">@ADMIN</p> */}
                        <p className="blog-description-about">
                            <a href="" target="_blank"><img src={github} className="about-icon" /></a>
                            Brrr was created in inspiration of the website Tumblr. Users are able to create their own customizable blogs and post text, images, or videos! Users can follow other users for a unique social experience! Click on the GitHub icon above to view the repository.
                        </p>


                    </div>
                    <div className="post-container">
                        <div>

                            <header className="post-header">
                                <div>
                                    <img
                                        src={matthew}
                                        alt="blog-avatar"
                                        className="post-owner-icon"

                                    />
                                </div>

                                <div className="post-owner-time">
                                    <div className="post-owner">
                                        Matthew David
                                    </div>
                                </div>
                            </header>
                            <div>
                                <div className="post-body">
                                    <p className="post-title">Full-Stack Engineer</p>
                                    <p className="post-description">
                                        <li>Incorporated AWS3 and hosted the bucket to upload images and videos for users</li>
                                        <li>Created database and API routes</li>
                                        <li>Redux State Manager</li>
                                        <li>Designed the initial ideas for the website</li>
                                    </p>
                                </div>
                            </div>
                            <footer>
                                <div className="post-icons-about">
                                    <a href="https://github.com/MattDavid99" target="_blank"><img src={github} className="about-icon" /></a>
                                    <a href="https://www.linkedin.com/in/matthew-david-b57ae/" target="_blank"><img src={linkedIn} className="about-icon" /></a>
                                </div>
                            </footer>
                        </div>
                    </div>
                    <div className="post-container">
                        <div>

                            <header className="post-header">
                                <div>
                                    <img
                                        src={james}
                                        alt="blog-avatar"
                                        className="post-owner-icon"

                                    />
                                </div>

                                <div className="post-owner-time">
                                    <div className="post-owner">
                                        James Hoang
                                    </div>
                                </div>
                            </header>
                            <div>
                                <div className="post-body">
                                    <p className="post-title">Full-Stack Engineer</p>
                                    <p className="post-description">
                                        <li>UI/UX Lead for project</li>
                                        <li>Created documentation for the project</li>
                                        <li>Contributed to database and API routes</li>
                                        <li>Incorporated AWS3 and hosted the bucket to upload images and videos for users</li>
                                    </p>
                                </div>
                            </div>
                            <footer>
                                <div className="post-icons-about">
                                    <a href="https://github.com/James-H007" target="_blank"><img src={github} className="about-icon" /></a>
                                    <a href="https://www.linkedin.com/in/jamesh007/" target="_blank"><img src={linkedIn} className="about-icon" /></a>
                                </div>
                            </footer>
                        </div>
                    </div>
                    <div className="post-container">
                        <div>

                            <header className="post-header">
                                <div>
                                    <img
                                        src={sterling}
                                        alt="blog-avatar"
                                        className="post-owner-icon"

                                    />
                                </div>

                                <div className="post-owner-time">
                                    <div className="post-owner">
                                        Sterling Herbert
                                    </div>
                                </div>
                            </header>
                            <div>
                                <div className="post-body">
                                    <p className="post-title">Full-Stack Engineer</p>
                                    <p className="post-description">
                                        <li>Product Testing Manager</li>
                                        <li>Validation Engineer</li>
                                        <li>Created documentation for the project</li>
                                        <li>Incorporated AWS3 and hosted the bucket to upload images and videos for users</li>
                                    </p>
                                </div>
                            </div>
                            <footer>
                                <div className="post-icons-about">
                                    <a href="" target="_blank"><img src={github} className="about-icon" /></a>
                                    <a href="https://www.linkedin.com/in/sterling-hebert-615137238/" target="_blank"><img src={linkedIn} className="about-icon" /></a>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
