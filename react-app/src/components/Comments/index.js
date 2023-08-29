import { useEffect, useState } from "react"
import "./comments.css"
import { useDispatch, useSelector } from "react-redux"
import { getAPostComment } from "../../store/comment";

const Comments = ({ post }) => {
    const [reply, setReply] = useState("");
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments.currentPostComments)
    console.log('COMMENTS?', post.id)

    useEffect(async () => {
        dispatch(getAPostComment(post.id))
    }, [])

    return (
        <div className="comment-wrapper">
            <div className="comment-container">
                <div>
                    <form className="comment-form">
                        <input
                            className="reply-input"
                            type="text"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Have something to say?"
                        />
                        <div className="reply-submit">
                            Submit
                        </div>
                    </form>
                </div>
                <div className="comment-section">
                    {comments.map((comment, i) => (
                        <>
                            <div className="single-comment" id={i}>
                                <div className="single-comment-header">
                                    <p className="comment-username">{comment.username}</p>
                                    <p className="comment-createdAt">{comment.createdAt}</p>
                                </div>
                                <div className="comment-content">
                                    {comment.comment}
                                </div>

                            </div>


                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Comments
