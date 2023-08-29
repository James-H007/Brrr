//constants
const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS"
const GET_POST_COMMENTS = "comments/GET_POST_COMMENTS"
const CREATE_COMMENT = "comments/CREATE_COMMENT"
const DELETE_COMMENT = "comments/DELETE_COMMENT"

export const getComments = (comments) => {
    return {
        type: GET_ALL_COMMENTS,
        payload: comments
    }
};

export const getPostComments = (comments) => {
    return {
        type: GET_POST_COMMENTS,
        payload: comments
    }
};

export const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        payload: comment
    }
}

export const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        payload: commentId
    }
}


//@comment_routes.route('/')
export const getAllComments = () => async (dispatch) => {
    const response = await fetch('/api/comments/', {
        headers: {
            "Content-Type": 'application/json'
        }
    })

    if (response.ok) {
        const { comments } = await response.json()
        dispatch(getComments(comments))
        return comments
    }
}

//@comment_routes.route('/post-comments/<int:id>', methods = ["GET"])
export const getAPostComment = (postId) => async (dispatch) => {
    const response = await fetch(`/api/comments/post-comments/${postId}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const { comments } = await response.json();
        dispatch(getPostComments(comments))
        return comments
    }
}


//@comment_routes.route('/<int:id>/create-comment', methods=["POST"])
export const makeAComment = (newComment, postId) => async (dispatch) => {

    const response = await fetch(`/api/comments/${postId}/create-comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set the content type to JSON
        },
        body: JSON.stringify(newComment)
    })
    console.log(response, "LOOK OVER HERE")
    if (response.ok) {
        const newComment = await response.json()
        dispatch(createComment(newComment))
        return newComment
    }
}


//@comment_routes.route('/<int:id>/delete-comment', methods=['DELETE'])
export const removeComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}/delete-comment`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.ok) {
        dispatch(deleteComment(commentId))
    }
}

const initialState = { allComments: [], currentPostComments: [] }


export default function commentsReducer(state = initialState, action) {

    switch (action.type) {
        case GET_ALL_COMMENTS:
            return {
                ...state,
                allComments: action.payload
            }
        case GET_POST_COMMENTS:
            return {
                ...state,
                currentPostComments: action.payload
            }
        case CREATE_COMMENT:
            return {
                ...state,
                allComments: [...state.allComments, action.payload]
            }
        case DELETE_COMMENT:
            return {
                ...state,
                allComments: state.allComments.filter(i => i.id !== action.payload)
            }
        default:
            return state
    }

}
