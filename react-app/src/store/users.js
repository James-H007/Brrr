// constants
const GET_ALL_USERS = "users/GET_ALL_USERS";
const GET_USER_BY_ID = "users/GET_USER_BY_ID"
const GET_CURRENT_USER = "users/GET_CURRENT_USER"

export const getUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    payload: users,
  }
};

export const userById = (user) => {
  return {
    type: GET_USER_BY_ID,
    payload: user
  }
}

export const currentUser = (user) => {
  return {
    type: GET_CURRENT_USER,
    payload: user
  }
}



// @user_routes.route('/')
export const getAllUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/', {
    headers: {
      "Content-Type": 'application/json'
    }
  })

  if (response.ok) {
    const { users } = await response.json()
    dispatch(getUsers(users))
    return users
  }
}

// @user_routes.route('/<int:id>')
export const getUserById = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (response.ok) {
    const user = await response.json()
    dispatch(userById(user))
    return user
  }
}

// @user_routes.route("/current")
export const getCurrentUser = () => async (dispatch) => {
  const response = await fetch('/api/users/current', {
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (response.ok) {
    const user = await response.json()
    dispatch(currentUser(user))
    return user
  }
}



const initialState = { allUsers: [], specificUser: {}, currentUser: {} };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      }

    case GET_USER_BY_ID:
      return {
        ...state,
        specificUser: action.payload
      }

    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    default:
      return state;
  }
}
