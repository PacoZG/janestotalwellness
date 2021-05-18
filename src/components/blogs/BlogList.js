import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  console.log('BLOGS: ', blogs)

  return (
    <div>
      {blogs.map(
        blog => (
          <Blog key={blog.id} blog={blog} />
        )
        // console.log('BLOG: ', blog)
      )}
    </div>
  )
}

export default BlogList
