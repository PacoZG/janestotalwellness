import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { useField } from '../../hooks/index'
import { FacebookShareButton, FacebookShareCount, FacebookIcon } from 'react-share'
import { likeBlog, dislikeBlog, deleteBlog, commentBlog } from '../../reducers/blogReducer'

const Blog = objectBlog => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const comment = useField('text')
  const blog = objectBlog.blog
  console.log('BLOG:', blog)
  const url = String(window.location)
  // console.log('URL: ', url)

  const getDate = objectDate => {
    const months = t('Months').split(',')
    const weekDays = t('Weekdays').split(',')
    const date = new Date(objectDate)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    const time = hours + ':' + minutes + ':' + seconds
    const creationDate =
      weekDays[date.getDay()] + ', ' + day + '.' + months[date.getMonth()] + '.' + date.getFullYear() + ' @' + time
    return creationDate
  }

  const handleSaveComment = () => {
    const newComment = {
      content: comment.params.value,
      date: new Date(),
    }
    console.log('COMMENT:', newComment)
    if (comment.params.value.length > 4) {
      const commentedBlog = { ...blog, comments: blog.comments.concat(newComment) }
      dispatch(commentBlog(commentedBlog))
    }
  }

  const handleLikes = () => {
    console.log('LIKE: ', blog.likes)
    dispatch(likeBlog(blog))
  }

  const handleDislikes = () => {
    console.log('DISLIKES: ', blog.dislikes)
    dispatch(dislikeBlog(blog))
  }
  return (
    <div
      className="min-h-screen shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
    from-gray-300 via-white to-gray-200 "
    >
      <div
        className="prose prose-red prose-md md:prose-sm mx-auto max-w-5xl p-5 pb-5 shadow md:rounded-t-md md:overflow-hidden rounded-t-md bg-gradient-to-br
        from-gray-300 via-white to-gray-200  "
      >
        <div className="pl-10 pr-10">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
        <div className="flex items-center justify-between px-3 py-3 bg-gray-400 text-right rounded-b-sm space-x-2">
          <div>
            <label className="font-bold text-gray-700">
              Posting date: <span className="text-gray-600">{getDate(blog.createdAt)}</span>
              {' by '}
              <span>{blog.author}</span>
            </label>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center">
              <label className="text-xl -mr-3 mt-2 font-semibold text-white">{blog.dislikes}</label>
              <button
                type="button"
                id="mobile-updateNote"
                onClick={handleDislikes}
                className="inline-flex justify-center py-1 px-3 font-medium rounded-full bg-transparent text-sm
              text-white hover:text-gray-200 focus-within:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-row items-center">
              <label className="text-xl -mr-3 mt-2 font-semibold text-white">{blog.likes}</label>
              <button
                type="button"
                id="mobile-updateNote"
                onClick={handleLikes}
                className="inline-flex justify-center py-1 px-3 font-medium rounded-full bg-transparent text-sm
              text-white hover:bg-gray-300 focus-within:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </button>
            </div>
            <FacebookShareCount url={url}>
              {shareCount => <span className="text-base text-black">{shareCount}</span>}
            </FacebookShareCount>
            <FacebookShareButton
              url={url}
              className="inline-flex justify-center py-1 px-3 font-medium focus-within:outline-none "
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col mx-auto max-w-5xl p-5 pb-5 shadow md:rounded-b-md md:overflow-hidden rounded-b-md bg-gradient-to-br
        from-gray-300 via-white to-gray-200  "
      >
        <h1 className="edit-form-label text-2xl text-center p-2 bg-red-300">Comments</h1>
        {blog.comments.length > 0 ? (
          blog.comments.map((comment, i) => (
            <div key={i} className="p-3 pl-4 border-2 border-red-200 ">
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <h1 className="text-center text-2xl border-t-2 border-b-2 p-2">No comments yet</h1>
        )}
        <label className="edit-form-label text-base pt-3">Write a comment</label>
        <textarea {...comment.params} className="text-area rounded-t-md " />
        <div className="flex justify-end items-center px-3 py-2 bg-gray-400 text-right rounded-b-sm space-x-2">
          <button
            type="button"
            id="mobile-updateNote"
            onClick={handleSaveComment}
            className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm font-medium rounded-md
                  bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1"
          >
            {t('ButtonLabel.Save')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
