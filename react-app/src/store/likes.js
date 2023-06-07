// constants
const GET_ALL_LIKES = "likes/GET_ALL_LIKES";
const GET_MY_LIKES = "likes/GET_MY_LIKES";


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

    default:
      return state;
  }
}
