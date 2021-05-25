import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Transition } from '@tailwindui/react'
import { useField } from '../../hooks/index'

const Comment = props => {
  const comment = props
  const { t } = useTranslation()
  const loggedUser = useSelector(state => state.loggedUser)
  const [showReplies, setShowReplies] = useState(false)
  const [showInputReply, setShowInputReply] = useState(false)

  const author = useField('text')
  const reply = useField('text')

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

  const handleShowReplies = () => {
    setShowReplies(!showReplies)
    if (showInputReply) {
      setShowInputReply(!showInputReply)
    }
  }

  const handleShowInputReply = () => {
    setShowInputReply(!showInputReply)
    if (!showReplies) {
      setShowReplies(!showReplies)
    }
  }

  return (
    <div>
      <h3 className="border-b border-gray-300 bg-gray-300  text-black pl-2 md:p-1">
        {comment.author}
        {' - '} <span className="text-xs"> {getDate(comment.date)}</span>
      </h3>
      <p className="text-xs pl-4 p-2 bg-blue-100">{comment.content}</p>
      <div className="flex items-center justify-end space-x-1 pr-2 bg-gray-300">
        <div className="flex items-center space-y-1">
          <button
            className="text-xs transition duration-300 hover:text-blue-600 focus-within:outline-none"
            onClick={handleShowReplies}
          >
            {showReplies ? t('Comment.HideReplies') : t('Comment.ShowReplies')}
          </button>
        </div>
        <button
          onClick={handleShowInputReply}
          className="flex items-center space-x-1 p-1 hover:text-blue-600 focus-within:outline-none"
        >
          {showInputReply ? (
            <span className="text-xs">{t('Comment.Cancel')}</span>
          ) : (
            <div className="flex items-center space-x-1">
              <span className="text-xs">{t('Comment.Reply')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </button>
      </div>
      <Transition
        show={showInputReply}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-75"
        leaveFrom="opacity-700"
        leaveTo="opacity-0"
      >
        <div className="flex justify-end">
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

            <textarea
              id="content-reply"
              {...reply.params}
              className="text-area rounded-b-md max-h-14"
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
                  <span className="text-xs">{getDate(reply.date)}</span>
                </p>
                <p className="text-xs text-right p-1 pl-2 pr-2 rounded-b-md bg-blue-100">{reply.content}</p>
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

export default Comment
