// constants
const GET_ALL_LIKES = "likes/GET_ALL_LIKES";
const GET_MY_LIKES = "likes/GET_MY_LIKES";
const LIKE_POST = "likes/LIKE_POST"
const UNLIKE_POST = "likes/UNLIKE_POST"


export const getLikes = (likes) => {
  return {
    type: GET_ALL_LIKES,
    payload: likes,
  }
};

export const usersLikes = (likes) => {
  return {
    type: GET_MY_LIKES,
    payload: likes
  }
}

export const likePost = (post) => {
  return {
    type: LIKE_POST,
    payload: post
  }
}

export const unlikePost = (post) => {
  return {
    type: UNLIKE_POST,
    payload: post
  }
}


// @like_routes.route('/')
export const getAllLikes = () => async (dispatch) => {
  const response = await fetch('/api/likes/', {
    headers: {
      "Content-Type": 'application/json'
    }
  })

  if (response.ok) {
    const { likes } = await response.json()
    dispatch(getLikes(likes))
    return likes
  }
}

// @like_routes.route('/my-likes', methods=['GET'])
export const getMyLikes = () => async (dispatch) => {
  const response = await fetch('/api/likes/my-likes', {
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (response.ok) {
    const { likedPosts } = await response.json()
    dispatch(usersLikes(likedPosts))
    return likedPosts
  }
}

// @like_routes.route('/<int:post_id>/like', methods=["POST"])
export const likePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/likes/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(likePost(data.post))
    return data.post
  }
}


// @like_routes.route('/<int:post_id>/unlike', methods=["DELETE"])
export const unlikePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/likes/${postId}/unlike`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(unlikePost(data.post))
    return data.post
  }
}


const initialState = { allLikes: [], myLikes: [] };

export default function likesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LIKES:
      return {
        ...state,
        allLikes: action.payload
      }

    case GET_MY_LIKES:
      return {
        ...state,
        myLikes: action.payload
      }

    case LIKE_POST:
      return {
        ...state,
        myLikes: [...state.myLikes, action.payload],
        allLikes: [...state.allLikes, action.payload]
      }

    case UNLIKE_POST:
      return {
        ...state,
        myLikes: state.myLikes.filter(i => i.id !== action.payload.id),
        allLikes: state.allLikes.filter(i => i.id !== action.payload.id)
      }

    default:
      return state;
  }
}
