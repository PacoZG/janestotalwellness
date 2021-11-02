import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Transition } from '@tailwindui/react'
import { useField } from '../../hooks/index'
import { formatDate } from '../../utils/helper'
import { editComment, likeComment, dislikeComment, deleteComment, replyComment } from '../../reducers/commentReducers'

import { ReactComponent as DislikeButton } from '../../assets/dislike.svg'
import { ReactComponent as LikeButton } from '../../assets/like.svg'
import { ReactComponent as ReplyButton } from '../../assets/reply.svg'

const Comment = ({ comment }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const months = t('Months').split(',')
  const weekDays = t('Weekdays').split(',')
  const loggedUser = useSelector(state => state.loggedUser)
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyInput, setShowInputReply] = useState(false)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [textareaState, setTextAreaState] = useState(null)

  const author = useField('text')
  const replyContent = useField('text')

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
      dispatch(replyComment(repliedComment))
      setShowInputReply(!showReplyInput)
      author.reset()
      replyContent.reset()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b rounded-t-md border-gray-300 bg-gray-300">
        <h3 className="   text-black pl-2 md:p-1">
          {comment.author}
          {' - '} <span className="text-xs"> {formatDate(comment.createdAt, months, weekDays)}</span>
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
              <DislikeButton className="h-4 w-4 md:h-4 md:w-4" />
            </button>

            <label className="text-sm -mr-3 mt-2 pr-3  font-semibold text-gray-600">{comment.likes}</label>
            <button
              type="button"
              id="like-comment"
              onClick={handleLikes}
              className="inline-flex justify-center pr-3 font-medium rounded-full bg-transparent text-sm text-gray-600 hover:text-gray-400 focus-within:outline-none"
            >
              <LikeButton className="h-4 w-4 md:h-4 md:w-4" />
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
              id="edit-comment-input"
              value={textareaState}
              onChange={handleTextareaChange}
            />
          )}
        </div>
        {loggedUser && (comment.userId === loggedUser.id || loggedUser.userType === 'admin') ? (
          <div className="flex items-center space-x-2">
            {showCommentInput ? (
              <div className="flex items-center space-x-2 ml-3">
                <button
                  id="cancel-comment-edit"
                  className="button-comment"
                  onClick={() => setShowCommentInput(!showCommentInput)}
                >
                  {t('ButtonLabel.Cancel')}
                </button>
                <button id="submit-comment-edit" className="button-comment pr-1" onClick={handleSubmitEditedComment}>
                  {t('ButtonLabel.Submit')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button id="edit-comment-button" className="button-comment" onClick={handleSetEditComment}>
                  {t('ButtonLabel.Edit')}
                </button>
                <button id="delete-comment-button" className="button-comment pr-1" onClick={handleDeleteComment}>
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
          <button id="show-replies-button" className="button-comment" onClick={handleShowReplies}>
            {showReplies ? t('Comment.HideReplies') : t('Comment.ShowReplies')}
          </button>
        </div>

        <button id="show-reply-fields-button" className="button-comment p-1" onClick={handleShowInputReply}>
          <div className="flex items-center space-x-1">
            {showReplyInput ? (
              <span className="text-xs">{t('ButtonLabel.Cancel')}</span>
            ) : (
              <div className="flex items-center space-x-1">
                <span className="text-xs">{t('Comment.ToReply')}</span>
                <ReplyButton />
              </div>
            )}
          </div>
        </button>
        {showReplyInput ? (
          <button id="submit-reply-button" className="button-comment pr-1 " onClick={handleSubmitReply}>
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
                id="author-reply-input"
                {...author.params}
                className="editform-input rounded-b-none"
                placeholder={t('Comment.Author')}
              />
            )}

            <input
              id="content-reply-input"
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
                  <span className="text-xs">{formatDate(reply.createdAt, months, weekDays)}</span>
                </p>
                <p className="text-xs text-right p-1 pl-2 pr-4 rounded-b-md bg-blue-50">{reply.content}</p>
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
