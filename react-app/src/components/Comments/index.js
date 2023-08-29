import { useEffect, useState } from "react"
import "./comments.css"
import { useDispatch, useSelector } from "react-redux"
import { getAPostComment, getAllComments, makeAComment, removeComment } from "../../store/comment";

const Comments = ({ post }) => {
    const [reply, setReply] = useState("");
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments.allComments)
    const currentUser = useSelector((state) => state.user.currentUser)
    // console.log('COMMENTS?', comments)

    // useEffect(async () => {
    //     // dispatch(getAPostComment(post.id))
    //     await dispatch(getAllComments())
    // }, [])

    const isIncluded = (comment) => comment["postId"] === post.id

    const handleDelete = async (e, commentId) => {
        e.preventDefault();

        await dispatch(removeComment(commentId))
        await dispatch(getAllComments())
        return
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (reply.trimEnd().length === 0 || reply.length > 800) {
            setError("Your reply must be between 1 and 800 characters")
            return
        }

        const newComment = {
            comment: reply
        }
        console.log('newComment', newComment)
        let postId = post.id

        await dispatch(makeAComment(newComment, postId))
        await dispatch(getAllComments())
        setError("")
        setReply("")
        return
    }

    return (
        <div className="comment-wrapper">
            <div className="comment-container">
                <div>
                    {/* <p className="errors">{error}</p> */}
                    <p className="comment-error">{error}</p>
                    <form className="comment-form">
                        <input
                            className="reply-input"
                            type="text"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Have something to say?"
                        />
                        <div className="reply-submit" onClick={handleSubmit}>
                            Submit
                        </div>
                    </form>
                </div>
                <div className="comment-section">
                    {comments.slice().reverse().map((comment, i) => (
                        <>
                            {(comment.postId === post.id) &&
                                (<div id={i} className="single-comment">
                                    <div className="single-comment-header">
                                        <div className="comment-user-delete-pair">
                                            <p className="comment-username">{comment.username}</p>
                                            {(currentUser.id === comment.userId) && (
                                                <p className="comment-delete" onClick={(e) => handleDelete(e, comment.id)}> Delete</p>
                                            )}

                                        </div>
                                        <p className="comment-createdAt">{comment.createdAt}</p>
                                    </div>
                                    <div className="comment-content">
                                        {comment.comment}
                                    </div>

                                </div>)
                            }
                        </>
                    ))}
                    {!comments.some(isIncluded) && (
                        <div className="no-comments">
                            There are no comments... You could be the first to comment :)
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Comments
