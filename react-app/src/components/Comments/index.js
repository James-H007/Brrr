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
                            placeholder="Your words here"
                        />
                    </form>
                </div>
                {/* {comments.map((comment) => (
                    <>
                        {comment.comment}
                    </>
                ))} */}
            </div>
        </div>
    )
}


export default Comments
