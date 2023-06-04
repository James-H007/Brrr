// constants
const GET_ALL_POSTS = "posts/GET_ALL_POSTS";
const GET_MY_POSTS = "posts/GET_MY_POSTS"
const GET_POST_IMAGES = "posts/GET_POST_IMAGES"
const CREATE_POST = "posts/CREATE_POST"
const EDIT_POST = "posts/EDIT_POST"
const DELETE_POST = "posts/DELETE_POST"


export const getPosts = (posts) => {
  return {
    type: GET_ALL_POSTS,
    payload: posts,
  }
};

export const getUsersPosts = (posts) => {
  return {
    type: GET_MY_POSTS,
    payload: posts
  }
}

export const getPostImages = (postImages) => {
  return {
    type: GET_POST_IMAGES,
    payload: postImages
  }
}

export const createPost = (post) => {
  return {
    type: CREATE_POST,
    payload: post
  }
}

export const editPost = (post) => {
  return {
    type: EDIT_POST,
    payload: post
  }
}

export const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    payload: postId
  }
}


// @post_routes.route('/')
export const getAllPosts = () => async (dispatch) => {
  const response = await fetch('/api/posts/', {
    headers: {
      "Content-Type": 'application/json'
    }
  })

  if (response.ok) {
    const { posts } = await response.json()
    dispatch(getPosts(posts))
    return posts
  }
}


// @post_routes.route('/my-posts', methods=["GET"])
export const getMyPosts = () => async (dispatch) => {
  const response = await fetch('/api/posts/my-posts', {
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (response.ok) {
    const { posts } = await response.json()
    dispatch(getMyPosts(posts))
    return posts
  }
}

// @post_routes.route('/images')
export const getAllPostImages = () => async (dispatch) => {
  const response = await fetch('/api/posts/images', {
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (response.ok) {
    const { post_images } = await response.json()
    dispatch(getAllPostImages(post_images))
    return post_images
  }
}


// @post_routes.route('/create/<int:blog_id>', methods=["GET","POST"])
export const createNewPost = (blog_id, formData) => async (dispatch) => {
  const response = await fetch(`/api/posts/create/${blog_id}`, {
    method: "POST",
    body: formData
  })

  if (response.ok) {
    const { post } = await response.json()
    dispatch(createPost(post))
    return post
  }
  /*
  *****REMEMBER*****
    - We might need to change how we implement AWS, maybe create and do the route in that file.

  In our component:
      const formData = new FormData();
      formData.append('post_title', postTitle);
      formData.append('post_type', postType);
      formData.append('post_description', postDescription);
      formData.append('video_embed_code', videoEmbedCode);
      formData.append('image_embed_code', imageEmbedCode);
      formData.append('file', file);
      dispatch(createNewPost(blog_id, formData));
  */
}

// @post_routes.route('/<int:post_id>/edit', methods=["PUT"])
export const editMyPost = (post_id, postData) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post_id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })

  if (response.ok) {
    const { post } = await response.json()
    dispatch(editPost(post))
    return post
  }
}

// @post_routes.route('/<int:post_id>', methods=["DELETE"])
export const deleteMyPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    const data = await response.json()

    if (data.message === "Deleted Successfully") {
      dispatch(deletePost(postId))
    }
  }
}



const initialState = { allPosts: [], myPosts: [], allPostImages: [] };

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload
      }

    case GET_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload
      }

    case GET_POST_IMAGES:
      return {
        ...state,
        allPostImages: action.payload
      }

    case CREATE_POST:
      return {
        ...state,
        myPosts: state.myPosts.concat(action.payload)
        // We might need to update allPosts here as well.
      }

    case EDIT_POST:
      return {
        ...state,
        myPosts: state.myPosts.map(i => i.id === action.payload.id ? action.payload : i)
        // We might need to update allPosts here as well.
      }

    case DELETE_POST:
      return {
        ...state,
        myPosts: state.myPosts.filter(i => i.id !== action.payload)
        // We might need to update allPosts here as well.
      }

    default:
      return state;
  }
}
