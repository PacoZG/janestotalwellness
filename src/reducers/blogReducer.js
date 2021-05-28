import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'UPDATE_BLOG':
      const id = action.data.id
      const toChange = state.find(blog => blog.id === id)
      const changedBlog = { ...toChange, content: action.data.content }
      return state.map(blog => (blog.id !== id ? blog : changedBlog))
    case 'LIKE_BLOG': {
      const id = action.data.id
      const toChange = state.find(blog => blog.id === id)
      const changedBlog = { ...toChange, likes: toChange.likes + 1 }
      return state.map(blog => (blog.id !== id ? blog : changedBlog))
    }
    case 'DISLIKE_BLOG': {
      const id = action.data.id
      const toChange = state.find(blog => blog.id === id)
      const changedBlog = { ...toChange, dislikes: toChange.dislikes + 1 }
      return state.map(blog => (blog.id !== id ? blog : changedBlog))
    }
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    case 'COMMENT_BLOG': {
      const id = action.data.id
      const blogToComment = state.find(blog => blog.id === id)
      const changedBlog = { ...blogToComment, comments: action.data.comments }
      return state.map(blog => (blog.id !== id ? blog : changedBlog))
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAllBlogs()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const editBlog = editedBlog => {
  return async dispatch => {
    const changedBlog = await blogService.updateBlog(editedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: changedBlog,
    })
  }
}

export const likeBlog = blog => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 }
  return async dispatch => {
    const changedBlog = await blogService.updateBlog(updatedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: changedBlog,
    })
  }
}

export const dislikeBlog = blog => {
  const updatedBlog = { ...blog, dislikes: blog.dislikes + 1 }
  return async dispatch => {
    const changedBlog = await blogService.updateBlog(updatedBlog)
    dispatch({
      type: 'DISLIKE_BLOG',
      data: changedBlog,
    })
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.removeBlog(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog.id,
    })
  }
}

export const commentBlog = commentedBlog => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(commentedBlog)
    dispatch({
      type: 'COMMENT_BLOG',
      data: updatedBlog,
    })
  }
}

export default blogReducer
