import React from 'react'
import "./Feed.css"
import text from "../../assets/font-solid.svg"
import image from "../../assets/image.svg"
import link from "../../assets/link.svg"
import video from "../../assets/video.svg"
import Post from '../Post'

const Feed = () => {


    return (
        <>
            <div className='main-feed'>
                <div className='main-post-area'>
                    <div className='post-select'>
                        <div className='post-type-box'>
                            <button className='post-type-button'><img src={text} alt="text icon" className='post-type-icon' /></button>
                            <p className='post-type-text'>Text</p>
                        </div>
                        <div className='post-type-box'>
                            <button className='post-type-button'><img src={image} alt="image icon" className='post-type-icon' /></button>
                            <p className='post-type-text'>Image</p>
                        </div>
                        <div className='post-type-box'>
                            <button className='post-type-button'><img src={link} alt="link icon" className='post-type-icon' /></button>
                            <p className='post-type-text'>Link</p>
                        </div>
                        <div className='post-type-box'>
                            <button className='post-type-button'><img src={video} alt="video icon" className='post-type-icon' /></button>
                            <p className='post-type-text'>Video</p>
                        </div>
                    </div>
                    <div className='post-comp'>
                        <Post />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed
