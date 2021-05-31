import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Transition } from '@tailwindui/react'
import { useField } from '../../hooks/index'
import { editComment, likeComment, dislikeComment, deleteComment, replyComment } from '../../reducers/commentReducers'

const Comment = ({ comment }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyInput, setShowInputReply] = useState(false)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [textareaState, setTextAreaState] = useState(null)

  const author = useField('text')
  const replyContent = useField('text')

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

  console.log('USER ID: ', comment.userId)

  const handleTextareaChange = event => {
    event.preventDefault()
    setTextAreaState(event.target.value)
  }

  const handleSetEditComment = () => {
    setTextAreaState(comment.content)
    setShowCommentInput(!showCommentInput)
  }

  const handleLikes = () => {
    dispatch(likeComment(comment))
  }

  const handleDislikes = () => {
    dispatch(dislikeComment(comment))
  }

  const handleSubmitEditedComment = () => {
    const editedComment = {
      ...comment,
      content: textareaState,
    }
    try {
      dispatch(editComment(editedComment))
      setShowCommentInput(!showCommentInput)
    } catch (error) {
      console.log('ERROR: ', error.response.data.error)
    }
  }

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment))
  }

  const handleShowReplies = () => {
    setShowReplies(!showReplies)
    if (showReplyInput) {
      setShowInputReply(!showReplyInput)
    }
  }

  const handleShowInputReply = () => {
    setShowInputReply(!showReplyInput)
    if (!showReplies) {
      setShowReplies(!showReplies)
    }
  }

  const handleSubmitReply = () => {
    const newReply = {
      author: loggedUser ? loggedUser.username : author.params.value,
      content: replyContent.params.value,
      createdAt: new Date(),
    }
    if (newReply.author.length > 3 && replyContent.params.value.length > 1) {
      const repliedComment = { ...comment, replies: comment.replies.concat(newReply) }
      console.log('REPLIED COMMENT: ', repliedComment)
      dispatch(replyComment(repliedComment))
      setShowInputReply(!showReplyInput)
    }
  }

  if (!comment) {
    return null
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b rounded-t-md border-gray-300 bg-gray-300">
        <h3 className="   text-black pl-2 md:p-1">
          {comment.author}
          {' - '} <span className="text-xs"> {getDate(comment.createdAt)}</span>
        </h3>
        <div className="flex flex-col items-end justify-between">
          <div className="flex flex-row items-center">
            <label className="text-sm -mr-3 mt-2 pr-3 font-semibold text-gray-600">{comment.dislikes}</label>
            <button
              type="button"
              id="dislike-comment"
              onClick={handleDislikes}
              className="inline-flex justify-center pr-3 font-medium rounded-full bg-transparent text-sm text-gray-600 hover:text-gray-400 focus-within:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 md:h-4 md:w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
              </svg>
            </button>

            <label className="text-sm -mr-3 mt-2 pr-3  font-semibold text-gray-600">{comment.likes}</label>
            <button
              type="button"
              id="like-comment"
              onClick={handleLikes}
              className="inline-flex justify-center pr-3 font-medium rounded-full bg-transparent text-sm text-gray-600 hover:text-gray-400 focus-within:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 md:h-4 md:w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pl-4 p-2 bg-blue-50">
        <div className="w-full">
          {!showCommentInput ? (
            <p className="text-xs">{comment.content}</p>
          ) : (
            <input
              className="text-area text-xs w-full h-6 rounded-lg"
              id="input-edit-blog"
              value={textareaState}
              onChange={handleTextareaChange}
            />
          )}
        </div>
        {loggedUser && (comment.userId === loggedUser.id || loggedUser.userType === 'admin') ? (
          <div className="flex items-center space-x-2">
            {showCommentInput ? (
              <div className="flex items-center space-x-2 ml-3">
                <button className="button-comment" onClick={() => setShowCommentInput(!showCommentInput)}>
                  {t('ButtonLabel.Cancel')}
                </button>
                <button className="button-comment pr-1" onClick={handleSubmitEditedComment}>
                  {t('ButtonLabel.Submit')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button className="button-comment" onClick={handleSetEditComment}>
                  {t('ButtonLabel.Edit')}
                </button>
                <button className="button-comment pr-1" onClick={handleDeleteComment}>
                  {t('ButtonLabel.Delete')}
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-end rounded-b-md space-x-1 pr-2 bg-gray-300">
        <div className="">
          <p className="text-xs pr-2">
            {comment.replies.length}
            <span>{comment.replies.length === 1 ? t('Comment.Reply') : t('Comment.Replies')}</span>
          </p>{' '}
        </div>
        <div className="flex items-center space-y-1">
          <button className="button-comment" onClick={handleShowReplies}>
            {showReplies ? t('Comment.HideReplies') : t('Comment.ShowReplies')}
          </button>
        </div>

        <button className="button-comment p-1" onClick={handleShowInputReply}>
          <div className="flex items-center space-x-1">
            {showReplyInput ? (
              <span className="text-xs">{t('ButtonLabel.Cancel')}</span>
            ) : (
              <div className="flex items-center space-x-1">
                <span className="text-xs">{t('Comment.ToReply')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </button>
        {showReplyInput ? (
          <button className="button-comment pr-1 " onClick={handleSubmitReply}>
            {t('ButtonLabel.Submit')}
          </button>
        ) : null}
      </div>
      <Transition
        show={showReplyInput}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-75"
        leaveFrom="opacity-700"
        leaveTo="opacity-0"
      >
        <div className="flex justify-end mt-0.5">
          <div className="flex flex-col justify-end w-3/4">
            {loggedUser ? (
              <label className="bg-gray-300 rounded-t-md border-t-2 border-gray-500 pl-2 p-1 mb-0  text-xs">
                {t('Comment.Author')}: <span className="italic font-semibold">{loggedUser.username}</span>{' '}
              </label>
            ) : (
              <input
                id="author-reply"
                {...author.params}
                className="editform-input rounded-b-none"
                placeholder={t('Comment.Author')}
              />
            )}

            <input
              id="content-reply"
              {...replyContent.params}
              className="text-area rounded-b-md max-h-9"
              placeholder={t('Comment.WriteReply')}
            />
          </div>
        </div>
      </Transition>
      <Transition
        show={showReplies}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-75"
        leaveFrom="opacity-700"
        leaveTo="opacity-0"
      >
        {comment.replies.length > 0 ? (
          comment.replies.map((reply, i) => (
            <div key={i} className="border-t flex flex-row justify-end">
              <div className="flex flex-col w-3/4">
                <p className="text-xs p-1 pl-2 rounded-t-md bg-gray-300">
                  {reply.author}
                  {' - '}
                  <span className="text-xs">{getDate(reply.createdAt)}</span>
                </p>
                <p className="text-xs text-right p-1 pl-2 pr-2 rounded-b-md bg-blue-50">{reply.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-end">
            <div className="w-3/4 text-right">
              <p className="text-xs p-1 pl-2 pr-2 rounded-md bg-blue-100">{t('Comment.NoReplies')}</p>
            </div>
          </div>
        )}
      </Transition>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment
