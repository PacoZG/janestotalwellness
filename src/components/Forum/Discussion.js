import React, { useState } from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Transition } from '@tailwindui/react'
import { useField } from '../../hooks/index'
import { likeDiscussion, dislikeDiscussion, editDiscussion, deleteDiscussion } from '../../reducers/discussionReducer'
import { createComment } from '../../reducers/commentReducers'
import Comment from './Comment'
import Loading from '../../utils/Loading'
import { ReactComponent as DislikeButton } from '../../assets/dislike.svg'
import { ReactComponent as LikeButton } from '../../assets/like.svg'
import { ReactComponent as DoubleLeftArrow } from '../../assets/double-left-arrow.svg'
import { ReactComponent as DoubleRightArrow } from '../../assets/double-right-arrow.svg'

const Discussion = ({ discussion }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const comments = useSelector(state => state.comments.filter(comment => comment.discussion === discussion.id))
  const [showContent, setShowContent] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [showEditInput, setShowEditInput] = useState(false)
  const commentAuthor = useField('text')
  const commentContent = useField('text')
  const [textareaState, setTextAreaState] = useState(discussion.content)

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

  const handleShowContent = () => {
    setShowContent(!showContent)
    if (showComments) {
      setShowComments(!showComments)
    }
    if (showCommentInput) {
      setShowCommentInput(!showCommentInput)
    }
  }

  const handleTextareaChange = event => {
    event.preventDefault()
    setTextAreaState(event.target.value)
  }

  const handleSubmitEditDiscussion = async () => {
    const editedDiscussion = {
      ...discussion,
      content: textareaState,
    }
    try {
      dispatch(editDiscussion(editedDiscussion))
      setShowEditInput(!showEditInput)
    } catch (error) {
      console.log('ERROR: ', error.response.data.error)
    }
  }

  const handleLikes = () => {
    dispatch(likeDiscussion(discussion))
  }

  const handleDislikes = () => {
    dispatch(dislikeDiscussion(discussion))
  }

  const handleDeleteDiscussion = () => {
    dispatch(deleteDiscussion(discussion.id))
  }

  const handleShowComments = () => {
    if (showCommentInput && showComments) {
      setShowCommentInput(!showCommentInput)
    }
    setShowComments(!showComments)
  }

  const handlePostComment = () => {
    const newComment = {
      discussion: discussion.id,
      userId: loggedUser ? loggedUser.id : 'visitor',
      author: loggedUser ? loggedUser.username : commentAuthor.params.value,
      content: commentContent.params.value,
    }

    if (commentContent.params.value.length > 1 && newComment.author.length > 3) {
      try {
        dispatch(createComment(newComment))
        discussion.comments = discussion.comments.concat({ ...newComment, createdAt: new Date(), replies: [] })
        commentAuthor.reset()
        commentContent.reset()
        setShowCommentInput(!showCommentInput)
        if (!showComments) {
          setShowComments(!showComments)
        }
      } catch (error) {
        console.log('ERROR: ', error.response.data.error)
      }
    }
  }

  const handleDiscardComment = () => {
    setShowCommentInput(!showCommentInput)
    commentAuthor.reset()
    commentContent.reset()
  }

  if (!discussion) {
    return <Loading />
  }

  return (
    <div className="relative w-full bg-blue-100 ">
      <div>
        <p className="h-4 bg-blue-100 border-white"></p>
        <div className="flex justify-between bg-gradient-to-r from-gray-300 to-gray-200 p-2">
          <div className="md:pl-4">
            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="text-sm w-16 md:w-24">
                    <b>{t('Discussion.Topic')}</b>
                  </td>
                  <td className="text-sm">{discussion.topic}</td>
                </tr>
                <tr>
                  <td className="text-sm">
                    <b className="text-sm">{t('Discussion.Author')}</b>
                  </td>
                  <td className="text-sm">{discussion.author}</td>
                </tr>
                <tr>
                  <td className="text-sm">
                    <b className="text-sm">{t('Discussion.Title')}</b>
                  </td>
                  <td className="text-sm">{discussion.title}</td>
                </tr>
                <tr>
                  <td className="text-sm">
                    <b className="text-sm">{t('Discussion.Date')}</b>
                  </td>
                  <td className="text-sm">{getDate(discussion.createdAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-end justify-between">
            <div className="flex flex-row items-center">
              <label className="text-sm -mr-3 mt-2 pr-3 font-semibold text-gray-600">{discussion.dislikes}</label>
              <button
                type="button"
                id="dislike-discussion"
                onClick={handleDislikes}
                className="inline-flex justify-center pr-3 font-medium rounded-full bg-transparent text-sm
                text-gray-600 hover:text-gray-400 focus-within:outline-none"
              >
                <DislikeButton className="h-3 w-3 md:h-4 md:w-4" />
              </button>

              <label className="text-sm -mr-3 mt-2 pr-3  font-semibold text-gray-600">{discussion.likes}</label>
              <button
                type="button"
                id="like-discussion"
                onClick={handleLikes}
                className="inline-flex justify-center pr-2 font-medium rounded-full bg-transparent text-sm
                text-gray-600 hover:text-gray-400 hover:bg-gray-300 focus-within:outline-none"
              >
                <LikeButton className="h-3 w-3 md:h-4 md:w-4" />
              </button>
            </div>
            <div>
              <p className="text-xs md:text-sm w-full mr-2">
                {comments.length}
                <span> {comments.length === 1 ? t('Discussion.Comment') : t('Discussion.Comments')}</span>
              </p>
            </div>
            <div className="flex items-center pr-2 md:pr-3 ">
              <div className="pr-1">
                <div
                  className={showContent ? 'transition duration-300 transform -rotate-90 ' : 'transition duration-150'}
                >
                  <DoubleLeftArrow className="h-4 w-4" />
                </div>
              </div>
              <button
                id="show-discussion"
                className="font-semibold text-sm justify-end transition duration-300 hover:text-blue-600 focus-within:outline-none"
                onClick={handleShowContent}
              >
                {showContent ? t('Discussion.Hide') : t('Discussion.Show')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Transition
        show={showContent}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-75"
        leaveFrom="opacity-700"
        leaveTo="opacity-0"
      >
        <div className="px-3">
          {showEditInput ? (
            <textarea
              className="text-area rounded-lg m-1"
              id="discussion-edit-input"
              value={textareaState}
              onChange={handleTextareaChange}
            />
          ) : (
            <p className="pt-3 pb-3 md:px-8 md:py-2 text-sm md:text-justify">{discussion.content}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:justify-between border-t-2 pl-2 p-1 border-gray-300 w-full">
          <div className="flex items-center">
            <button
              id="show-comment-input"
              className="text-sm md:pl-3 transition duration-300 hover:text-blue-600 focus-within:outline-none"
              onClick={() => setShowCommentInput(!showCommentInput)}
            >
              <span>{showCommentInput ? t('Discussion.Cancel') : t('Discussion.MakeAComment')}</span>
            </button>
            <div className=" flex items-center">
              <button
                id="show-comments-button"
                className="text-sm pl-2 transition duration-300 hover:text-blue-600 focus-within:outline-none "
                onClick={handleShowComments}
              >
                {showComments ? t('Discussion.HideComments') : t('Discussion.ShowComments')}
              </button>
              <div className="pl-1">
                <div
                  className={showComments ? 'transition duration-300 transform rotate-90 ' : 'transition duration-150'}
                >
                  <DoubleRightArrow className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          {loggedUser && (discussion.userId === loggedUser.id || loggedUser.userType === 'admin') ? (
            <div className="flex items-center space-x-3 pr-3">
              {!showEditInput ? (
                <button
                  id="edit-discussion-button"
                  className="text-sm transition duration-300 hover:text-blue-400 focus-within:outline-none"
                  onClick={() => setShowEditInput(!showEditInput)}
                >
                  {t('ButtonLabel.Edit')}
                </button>
              ) : (
                <div className="flex space-x-3 ">
                  <button
                    id="cancel-discussion-edit"
                    className="text-sm transition duration-300 hover:text-blue-400 focus-within:outline-none"
                    onClick={() => setShowEditInput(!showEditInput)}
                  >
                    {t('ButtonLabel.Cancel')}
                  </button>
                  <button
                    id="delete-discussion-button"
                    className="text-sm transition duration-300 hover:text-blue-400 focus-within:outline-none"
                    onClick={handleSubmitEditDiscussion}
                  >
                    {t('ButtonLabel.Submit')}
                  </button>
                </div>
              )}

              <button
                className="text-sm transition duration-300 hover:text-blue-400 focus-within:outline-none"
                id="delete-discussion-button"
                onClick={handleDeleteDiscussion}
              >
                {t('ButtonLabel.Delete')}
              </button>
            </div>
          ) : null}
        </div>
        <Transition
          show={showCommentInput}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-75"
          leaveFrom="opacity-700"
          leaveTo="opacity-0"
        >
          <div className="flex flex-col pl-2 pr-2 justify-end w-full">
            {loggedUser ? (
              <label className="bg-gray-300  rounded-t-md border-t-2 border-gray-500 pl-2 p-1 mb-0  text-sm">
                {t('Discussion.Author')}: <span className="italic font-semibold">{loggedUser.username}</span>{' '}
              </label>
            ) : (
              <input
                id="comment-author-input"
                {...commentAuthor.params}
                className="editform-input rounded-b-none"
                placeholder={t('Discussion.Author')}
              />
            )}

            <textarea
              id="comment-content-input"
              {...commentContent.params}
              className="text-area rounded-b-md max-h-14"
              placeholder={t('Discussion.CommentPlaceholder')}
            />
            <div className="flex items-center justify-end space-x-2 pr-3">
              <button
                id="delete-comment-button"
                className="buttons-web text-sm text-black w-auto pl-1 pr-1 bg-gray-200 p-1 m-1"
                onClick={handleDiscardComment}
              >
                {t('ButtonLabel.Discard')}
              </button>
              <button
                id="post-comment-button"
                className="buttons-web text-sm text-black w-auto pl-1 pr-1 bg-gray-200 p-1 m-1"
                onClick={handlePostComment}
              >
                {t('ButtonLabel.Post')}
              </button>
            </div>
          </div>
        </Transition>
      </Transition>

      <Transition
        show={showComments}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-75"
        leaveFrom="opacity-700"
        leaveTo="opacity-0"
      >
        <div className=" border-t-2 border-gray-200 divide-solid divide-y-2 divide-gray-400 bg-blue-100 pl-2 pr-2">
          {comments.length > 0 ? (
            comments.map(comment => <Comment key={comment.id} comment={comment} />)
          ) : (
            <p className="text-xs pl-4 p-2 bg-gray-200">{t('Discussion.NoComments')}</p>
          )}
        </div>
      </Transition>
      <div className="h-4 bg-blue-100 border-b-4 border-white"></div>
    </div>
  )
}

Discussion.propTypes = {
  discussion: PropTypes.object.isRequired,
}

export default Discussion
