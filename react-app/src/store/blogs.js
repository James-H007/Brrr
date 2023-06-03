// NORMALIZE
// const normalizeData = (arr) => {
//   const obj = {}
//   arr.forEach((i) => {
//     obj[i.id] = i
//   })
//   return obj
// }


// constants
const GET_BLOGS = "blogs/GET_BLOGS";
const GET_BLOG_BY_ID = "blogs/GET_BLOG_BY_ID"
const DELETE_BLOG_BY_ID = "blogs/DELETE_BLOG_BY_ID"
const EDIT_BLOG_BY_ID = "blogs/EDIT_BLOG_BY_ID"
const CREATE_BLOG = "blogs/CREATE_BLOG"
const GET_FOLLOWED_BLOGS = "blogs/GET_FOLLOWED_BLOGS"

const getBlogs = (blogs) => {
  return {
    type: GET_BLOGS,
    payload: blogs,
  }
};

const setBlog = (blog) => {
  return {
    type: GET_BLOG_BY_ID,
    payload: blog
  }
}

const deleteBlog = (id) => {
  return {
    type: DELETE_BLOG_BY_ID,
    payload: id
  }
}

const editBlog = (blog) => {
  return {
    type: EDIT_BLOG_BY_ID,
    payload: blog
  }
}

const createNewBlog = (blog) => {
  return {
    type: CREATE_BLOG,
    payload: blog
  }
}

const getFollowedBlogs = (blogs) => {
  return {
    type: GET_FOLLOWED_BLOGS,
    payload: blogs
  }
}


// @blog_routes.route('/')
export const getAllBlogs = () => async (dispatch) => {
  const response = await fetch("/api/blogs/", {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (response.ok) {
    const data = await response.json();
    // const dataObj = normalizeData(data)
    dispatch(getBlogs(data.blogs));  // <<--  Might need to be just "data" not "data.blogs"
  }
};

// @blog_routes.route('/<int:id>', methods = ["GET"])
export const getBlogById = (id) => async (dispatch) => {
  const response = await fetch(`/api/blogs/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (response.ok) {
    const blog = await response.json()
    dispatch(setBlog(blog))
    return blog

  } else {
    console.log('Error: Blog not found');
  }
}

// @blog_routes.route('/<int:id>', methods = ["DELETE"])
export const removeBlogById = (id) => async (dispatch) => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (response.ok) {
    dispatch(deleteBlog(id))
  }
}

// @blog_routes.route('/<int:id>/edit', methods = ["PUT"])
export const editAblog = (id, blog) => async (dispatch) => {
  const response = await fetch(`/api/blogs/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(blog)
  })

  if (response.ok) {
    const updatedBlog = await response.json()
    dispatch(editBlog(updatedBlog.blog)) // <<-- probs just "updatedBlog" not "updatedBlog.blog"
    return updatedBlog
  }
}

// @blog_routes.route('/create', methods=["POST"])
export const createBlog = (blog) => async (dispatch) => {
  const response = await fetch(`/api/blogs/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(blog)
  })

  if (response.ok) {
    const newBlog = await response.json()
    dispatch(createNewBlog(newBlog)) // or newBlog.blog
    return newBlog
  }
}

// @blog_routes.route("/following")
export const fetchFollowedBlogs = () => async (dispatch) => {
  const response = await fetch('/api/blogs/following', {
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (response.ok) {
    const { followedBlogs } = await response.json()
    /*
    followedBlogs returns:
        {
          "followed_blogs": [
               {
                "blog_avatar": "https://64.media.tumblr.com/ac46b069c7bb24e2ee5bf368a32b84fe/5c65a2189e2d73b7-9d/s540x810/384c42854b3fca915f79ffcb8dc711665b7c3519.jpg",
                "blog_name": "Turkey"
              }
            ]
        }
    */
    dispatch(getFollowedBlogs(followedBlogs))
  }

}



const initialState = { blogs: [], currentBlog: null, followedBlogs: [] };


export default function blogsReducer(state = initialState, action) {

  switch (action.type) {
    case GET_BLOGS:
      console.log("unspread--->", state, "\n", "spread--->", ...state);
      return {
        ...state,
        blogs: action.payload  // <<-- state => state.blogs.blogs
      }

    case GET_BLOG_BY_ID:
      console.log(...state);
      return {
        ...state,
        currentBlog: action.payload // <<-- state => state.blogs.currentBlogs
      }

    case DELETE_BLOG_BY_ID:
      return {
        ...state,
        blogs: state.blogs.filter(i => i.id !== action.payload)
        /*
          Or we could do this, by adding it under "blogs":
          currentBlog: state.currentBlog && state.currentBlog.id === action.payload ? null : state.currentBlog

          This code is setting currentBlog back to null when the currently viewed blog is deleted.
              -This could avoid bugs down the line, so maybe go back and add this.
        */
      }

    case EDIT_BLOG_BY_ID:
      const index = state.blogs.findIndex(i => i.id === action.payload.id)
      let newBlogs = [...state.blogs]
      if (index !== -1) {
        newBlogs[index] = action.payload
      }
      return {
        ...state,
        blogs: newBlogs
      }

    case CREATE_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload]
      }

    case GET_FOLLOWED_BLOGS:
      return {
        ...state,
        followedBlogs: action.payload
      }


    default:
      return state;
  }
}
