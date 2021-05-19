import React, { useState } from 'react'
import { Transition } from '@tailwindui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { useField } from '../../hooks/index'
import { FacebookShareButton, FacebookShareCount, FacebookIcon } from 'react-share'
import { likeBlog, dislikeBlog, deleteBlog, commentBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const comment = useField('text')
  const author = useField('text')
  const url = String(window.location)
  const [isOpen, setIsOpen] = useState(false)

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
    if (author.params.value.length < 5) {
      dispatch(
        setNotification({
          message: t('Blog.Notification.Message'),
          title: t('Blog.Notification.Title'),
          show: true,
        })
      )
    }
    if (author.params.value.length >= 5) {
      const newComment = {
        author: author.params.value,
        content: comment.params.value,
        date: new Date(),
      }
      console.log('COMMENT:', newComment)
      const commentedBlog = { ...blog, comments: blog.comments.concat(newComment) }
      dispatch(commentBlog(commentedBlog))
    }
  }

  const handleLikes = () => {
    dispatch(likeBlog(blog))
  }

  const handleDislikes = () => {
    dispatch(dislikeBlog(blog))
  }
  if (!blog) {
    return (
      <div className="justify-center items-center flex outline-none bg-gray-100 min-h-screen">
        <div className="flex flex-row space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          <p className="pr-2">{t('loading...')}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br from-gray-300 via-white to-gray-200 ">
      <div
        className=" p-2 md:p-5 md:pb-5 shadow md:rounded-t-md md:overflow-hidden rounded-t-md bg-gradient-to-br
        from-gray-300 via-white to-gray-200  "
      >
        <div className="prose prose-red prose-sm md:prose-sm mx-auto md:max-w-7xl pl-3 pr-3 p-3 md:pl-10 md:pr-10">
          <div className="flex flex-col items-center">
            <h1>{blog.title}</h1>
            <img src={blog.imageURL} className="md:h-80 md:w-auto" />
          </div>
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:px-4 md:py-3 bg-blue-200 md:text-right rounded-sm md:space-x-2">
          <div>
            <label className="font-bold text-gray-700 pt-2 md:pl-3">
              {t('Blog.PostingDate')}
              <span className="text-gray-600">{getDate(blog.createdAt)}</span>
              <span>{` by ${blog.author}`}</span>
            </label>
          </div>
          <div className="flex flex-rowitems-center">
            <div className="flex flex-row items-center">
              <label className="text-xl -mr-3 mt-2 font-semibold text-white">{blog.dislikes}</label>
              <button
                type="button"
                id="mobile-updateNote"
                onClick={handleDislikes}
                className="inline-flex justify-center py-1 px-3 font-medium rounded-full bg-transparent text-sm
              text-white hover:text-gray-200 focus-within:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </button>
            </div>
            <FacebookShareCount url={url}>
              {shareCount => <span className="text-2xl text-black">{console.log('SHARE COUNT: ', shareCount)}</span>}
            </FacebookShareCount>
            <FacebookShareButton
              url={url}
              className="inline-flex justify-center py-1 px-3 -ml-4 font-medium focus-within:outline-none "
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col mx-auto max-w-auto md:p-5 p-3 pb-5 shadow md:rounded-b-md md:overflow-hidden rounded-b-md bg-gradient-to-br
        from-gray-300 via-white to-gray-200  "
      >
        <h1 className="edit-form-label text-2xl text-center p-2 bg-gray-400">{t('Blog.Comments')}</h1>
        {blog.comments.length > 0 ? (
          blog.comments.map((comment, i) => (
            <div key={i} className="p-1 pt-2 md:p-3 md:pl-4 border-2 border-gray-300 divide-solid ">
              <div className="space-y-2">
                <div className="md:flex md:space-x-2 border-b-2 border-blue-300 text-xs md:text-sm pb-2 pl-2 md:pl-3">
                  <p className="font-semibold">{`${comment.author}`}</p>
                  <p className="text-indigo-400">{getDate(comment.date)}</p>
                </div>
                <p className="text-justify p-2">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-xl border-t-2 border-b-2 p-2">{t('Blog.NoComments')}</h1>
        )}
        <div className="flex flex-col items-center">
          <label className="font-semibold p-2 inline-block border-b-2">{t('Blog.WriteComment')}</label>
          <button
            className={
              isOpen
                ? 'transition duration-500 transform rotate-180 focus-within:outline-none p-1'
                : 'transition duration-500 focus-within:outline-none p-1'
            }
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
            </svg>
          </button>
        </div>

        <Transition
          show={isOpen}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-500"
          leaveTo="opacity-0"
        >
          <label className="edit-form-label text-base pt-2 border-t-2 border-gray-300 mt-4 ">{t('Blog.Name')}</label>
          <input {...author.params} className="editform-input" />
          <label className="edit-form-label text-base pt-2">{t('Blog.WriteComment')}</label>
          <textarea {...comment.params} className="text-area rounded-t-md " minLength="10" maxLength="500" />
          <div className="flex justify-end items-center px-3 py-2 bg-gray-400 text-right rounded-b-md space-x-2">
            <button type="button" id="mobile-updateNote" onClick={handleSaveComment} className="buttons-web">
              {t('ButtonLabel.Save')}
            </button>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default Blog
