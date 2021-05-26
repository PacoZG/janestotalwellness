import React, { useState } from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Transition } from '@tailwindui/react'
import { useField } from '../../hooks/index'
import { createComment } from '../../reducers/commentReducers'
import Comment from './Comment'

const Discussion = ({ discussion }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const [showContent, setShowContent] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const author = useField('text')
  const content = useField('text')

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

  const handleShowComments = () => {
    if (showCommentInput && showComments) {
      setShowCommentInput(!showCommentInput)
    }
    setShowComments(!showComments)
  }

  const handlePostComment = () => {
    const newComment = {
      discussion: discussion.id,
      author: loggedUser ? loggedUser.username : author.params.value,
      content: content.params.value,
    }

    if (content.params.value.length > 1 && newComment.author.length > 3) {
      console.log('NEW COMMENT: ', newComment)
      try {
        dispatch(createComment(newComment))
      } catch (error) {
        console.log('ERROR: ', error.response.data)
      }
    }
  }

  // console.log('DISCUSSION: ', d)
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
                id="mobile-updateNote"
                // onClick={handleDislikes}
                className="inline-flex justify-center pr-3 font-medium rounded-full bg-transparent text-sm
                text-gray-600 hover:text-gray-400 focus-within:outline-none"
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

              <label className="text-sm -mr-3 mt-2 pr-3  font-semibold text-gray-600">{discussion.likes}</label>
              <button
                type="button"
                id="mobile-updateNote"
                // onClick={handleLikes}
                className="inline-flex justify-center pr-2 font-medium rounded-full bg-transparent text-sm
                text-gray-600 hover:text-gray-400 hover:bg-gray-300 focus-within:outline-none"
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
            <div className="flex flow-row items-center md:pr-3 ">
              <div className="pb-1 pr-1 ">
                <button
                  className={
                    showContent
                      ? 'transition duration-300 transform -rotate-90 focus-within:outline-none'
                      : 'transition duration-150 focus-within:outline-none'
                  }
                  onClick={handleShowContent}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <label className="font-semibold text-sm justify-end">
                {showContent ? t('Discussion.Hide') : t('Discussion.Show')}
              </label>
            </div>
          </div>
        </div>
      </div>

      <Transition
        show={showContent}
        // show={true}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-75"
        leaveFrom="opacity-700"
        leaveTo="opacity-0"
      >
        <div className="px-3">
          <p className="md:px-8 md:py-2 text-sm md:text-justify">{discussion.content}</p>
        </div>

        <div className="flex flex-row border-t-2 pl-2 p-1 border-gray-300 w-full">
          <label className="text-sm pl-2 pt-1 ">
            {showComments ? t('Discussion.HideComments') : t('Discussion.ShowComments')}
          </label>
          <button
            className={
              showComments
                ? 'transition duration-300 transform rotate-90 focus-within:outline-none p-1'
                : 'transition duration-150 focus-within:outline-none p-1'
            }
            onClick={handleShowComments}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="text-sm pl-1 pb-1 transition duration-300 hover:text-blue-600 focus-within:outline-none"
            onClick={() => setShowCommentInput(!showCommentInput)}
          >
            <span>{showCommentInput ? t('Discussion.Cancel') : t('Discussion.MakeAComment')}</span>
          </button>
        </div>
        <Transition
          show={showCommentInput}
          // show={true}
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
                id="author-comment"
                {...author.params}
                className="editform-input rounded-b-none"
                placeholder={t('Discussion.Author')}
              />
            )}

            <textarea
              id="content-comment"
              {...content.params}
              className="text-area rounded-b-md max-h-14"
              placeholder={t('Discussion.CommentPlaceholder')}
            />
            <div className="flex items-center justify-end space-x-2 pr-3">
              <button
                id="delete-comment"
                className="buttons-web text-sm text-black w-auto pl-1 pr-1 bg-gray-200 p-1 m-1"
                // onClick={handleDeleteComment}
              >
                {t('ButtonLabel.Cancel')}
              </button>
              <button
                id="post-comment"
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
          {discussion.comments.length > 0 ? (
            discussion.comments.map((comment, i) => <Comment key={i} comment={comment} />)
          ) : (
            <p className="text-xs pl-4 p-2 bg-gray-200">No comments yet</p>
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
