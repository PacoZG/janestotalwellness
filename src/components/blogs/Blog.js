import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Transition } from '@tailwindui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { useField } from '../../hooks/index'
import { FacebookShareButton, FacebookShareCount, FacebookIcon } from 'react-share'
import { editBlog, likeBlog, dislikeBlog, deleteBlog, commentBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import imageService from '../../services/images'
import LoadingPage from '../../utils/LoadingPage'
import { ReactComponent as LikeIcon } from '../../assets/like.svg'
import { ReactComponent as DisikeIcon } from '../../assets/dislike.svg'
import { ReactComponent as DoubleUpArrowIcon } from '../../assets/double-up-arrow.svg'

const Blog = () => {
  const id = useParams().id
  const history = useHistory()
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const loggedUser = useSelector(state => state.loggedUser)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const comment = useField('text')
  const author = useField('text')
  const url = String(window.location)
  const [isOpen, setIsOpen] = useState(false)
  const [showEditBlog, setShowEditBlog] = useState(false)
  const [textareaState, setTextAreaState] = useState(null)

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

  const handleSubmitComment = () => {
    const newComment = {
      author: loggedUser ? loggedUser.username : author.params.value,
      content: comment.params.value,
      date: new Date(),
    }
    if (newComment.author.length < 4) {
      dispatch(
        setNotification({
          message: t('Blog.Notification.Message'),
          title: t('Blog.Notification.Title'),
          show: true,
        })
      )
    }
    if (newComment.author.length >= 4) {
      const commentedBlog = { ...blog, comments: blog.comments.concat(newComment) }
      dispatch(commentBlog(commentedBlog))
      comment.reset()
      setIsOpen(!isOpen)
    }
  }

  const handleTextareaChange = event => {
    event.preventDefault()
    setTextAreaState(event.target.value)
  }

  const handleSetEditblog = () => {
    setTextAreaState(blog.content)
    setShowEditBlog(!showEditBlog)
  }

  const handleSubmitEditedBlog = () => {
    const editedBlog = {
      ...blog,
      content: textareaState,
    }
    try {
      dispatch(editBlog(editedBlog))
      setShowEditBlog(!showEditBlog)
    } catch (error) {
      console.log('ERROR: ', error.response.data.error)
    }
  }

  const handleLikes = () => {
    dispatch(likeBlog(blog))
  }

  const handleDislikes = () => {
    dispatch(dislikeBlog(blog))
  }

  const handleDelete = () => {
    imageService.removeImage(blog.imageID)
    dispatch(deleteBlog(blog))
    dispatch(
      setNotification({
        message: t('Blog.Deleted'),
        title: 'Sucess',
        show: true,
      })
    )
    history.push('/blogs')
  }
  if (!blog) {
    return <LoadingPage />
  }

  return (
    <div className="min-h-screen  pt-22 shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br from-gray-300 via-white to-gray-200 ">
      <div className=" p-2 md:p-5 md:pb-5 shadow md:rounded-t-md md:overflow-hidden rounded-t-md bg-gradient-to-br from-gray-300 via-white to-gray-200 ">
        <div className="prose prose-red prose-sm md:prose-sm mx-auto md:max-w-7xl pl-3 pr-3 p-3 md:pl-10 md:pr-10">
          <div className="flex flex-col items-center">
            <h1>{blog.title}</h1>
            <img
              src={blog.imageURL}
              alt="profile"
              className="md:h-96 md:w-auto rounded-sm shadow-lg border-2 border-black m-4 p-3"
            />
          </div>
          <div className="md:pl-16 md:pr-16 text-justify">
            {!showEditBlog ? (
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            ) : (
              <textarea
                className="text-area h-96 rounded-lg m-1"
                id="input-edit-blog"
                value={textareaState}
                onChange={handleTextareaChange}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:px-4 md:py-3 bg-blue-100 md:text-right rounded-sm md:space-x-2">
          <div className="flex flex-col md:flex-row items-center">
            <label className="font-bold text-gray-500 pt-2 md:pl-3">
              {t('Blog.PostingDate')}
              <span className="font-bold text-gray-500 pl-1 pr-1">{getDate(blog.createdAt)}</span>
            </label>
            <p className="font-bold text-gray-500 pl-1 pr-1">{`by ${blog.author}`}</p>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center">
              <label className="text-xl -mr-3 mt-2 font-semibold text-gray-500">{blog.dislikes}</label>
              <button
                type="button"
                id="mobile-updateNote"
                onClick={handleDislikes}
                className="inline-flex justify-center py-1 px-3 font-medium rounded-full bg-transparent text-sm text-gray-500 hover:text-gray-300 focus-within:outline-none"
              >
                <DisikeIcon className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
            <div className="flex flex-row items-center">
              <label className="text-xl -mr-3 mt-2 font-semibold text-gray-500">{blog.likes}</label>
              <button
                type="button"
                id="mobile-updateNote"
                onClick={handleLikes}
                className="inline-flex justify-center py-1 px-3 font-medium rounded-full bg-transparent text-sm text-gray-500 hover:text-gray-300 focus-within:outline-none"
              >
                <LikeIcon className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
            <FacebookShareCount url={url}>
              {shareCount => <span className="text-2xl text-gray-500">{console.log('SHARE COUNT: ', shareCount)}</span>}
            </FacebookShareCount>
            <FacebookShareButton
              url={url}
              className="inline-flex justify-center py-1 px-3 -ml-4 font-medium focus-within:outline-none "
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </div>
        </div>
        <p className="text-center text-gray-600 bg-gray-400 p-2 border-b-2 rounded-b-md">
          {t('Blog.WannaTalk')}
          <Link to="/salon" className="text-indigo-600 hover:text-red-600">
            Jane&lsquo;s Salon&nbsp;
          </Link>
          {t('Blog.OpenDisc')}
        </p>
        {loggedUser && loggedUser.userType === 'admin' ? (
          <div className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-400 rounded-b-md md:px-6">
            {!showEditBlog ? (
              <button onClick={handleSetEditblog} className="buttons-web">
                {t('ButtonLabel.Edit')}
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button onClick={() => setShowEditBlog(!showEditBlog)} className="buttons-web">
                  {t('ButtonLabel.Cancel')}
                </button>
                <button onClick={handleSubmitEditedBlog} className="buttons-web">
                  {t('ButtonLabel.Submit')}
                </button>
              </div>
            )}
            <button onClick={handleDelete} className="buttons-web">
              {t('ButtonLabel.Delete')}
            </button>
          </div>
        ) : null}
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
                <div className="md:flex md:space-x-2 border-b-2 border-blue-200 text-xs md:text-sm pb-2 pl-2 md:pl-3">
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
            className="flex items-center justify-center rounded-md text-gray-300 bg-gray-400 w-32 transition duration-150 transform rotate-180 focus-within:outline-none p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <DoubleUpArrowIcon
              className={
                isOpen
                  ? ' transition duration-200 focus-within:outline-none p-1 h-8 w-8'
                  : ' transition duration-200 transform -rotate-180 focus-within:outline-none p-1 h-8 w-8'
              }
            />
          </button>
        </div>

        <Transition
          show={isOpen}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-700"
          leaveTo="opacity-0"
        >
          <label className="edit-form-label text-base pt-2 border-t-2 border-gray-300 mt-4 ">{t('Blog.Name')}</label>
          {loggedUser ? (
            <label className="bg-gray-300 rounded-md border-t-2 border-gray-500 pl-2 p-1 mb-0 h-7 text-xs w-full">
              <span className="italic font-semibold">{loggedUser.username}</span>{' '}
            </label>
          ) : (
            <input {...author.params} className="editform-input" />
          )}
          <label className="edit-form-label text-base pt-2">{t('Blog.WriteComment')}</label>
          <textarea {...comment.params} className="text-area rounded-t-md " minLength="10" maxLength="500" />
          <div className="flex justify-end items-center px-3 py-2 bg-gray-400 text-right rounded-b-md space-x-2">
            <button type="button" id="mobile-updateNote" onClick={handleSubmitComment} className="buttons-web">
              {t('ButtonLabel.Submit')}
            </button>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default Blog
