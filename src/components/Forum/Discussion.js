import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Transition } from '@tailwindui/react'
import { useField } from '../../hooks/index'
import { Link } from 'react-router-dom'

const Discussion = d => {
  const { t } = useTranslation()
  const loggedUser = useSelector(state => state.loggedUser)
  const [showContent, setShowContent] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [showInputReply, setShowInputReply] = useState(false)

  const author = useField('text')
  const reply = useField('text')

  const handleShowContent = () => {
    setShowContent(!showContent)
    if (showReplies) {
      setShowReplies(!showReplies)
    }
    if (showInputReply) {
      setShowInputReply(!showInputReply)
    }
  }

  const handleShowReplies = () => {
    setShowReplies(!showReplies)
    if (showInputReply) {
      setShowInputReply(!showInputReply)
    }
  }

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
  // console.log('DISCUSSION: ', d)
  return (
    <div className="relative bg-blue-100 ">
      <div>
        <p className="h-4 bg-blue-200 border-white"></p>
        <div className="flex justify-between bg-gradient-to-r from-gray-300 to-gray-200 p-2">
          <div className="md:pl-4">
            <h3 className="">
              <b>Topic: </b> {d.discussion.topic}
            </h3>
            <p>
              <b>Author: </b>
              {d.discussion.author}
            </p>
            <p>
              <b>Title: </b>
              {d.discussion.title}
            </p>
            <p className="text-xs">{getDate(d.discussion.date)}</p>
          </div>

          <div className="flex flex-col items-end justify-between">
            <div className="flex flex-row items-center">
              <label className="text-sm -mr-3 mt-2 pr-2 font-semibold text-gray-600">{d.discussion.dislikes}</label>
              <button
                type="button"
                id="mobile-updateNote"
                // onClick={handleDislikes}
                className="inline-flex justify-center py-1 px-1 font-medium rounded-full bg-transparent text-sm
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

              <label className="text-sm -mr-3 mt-2 pr-3 font-semibold text-gray-600">{d.discussion.likes}</label>
              <button
                type="button"
                id="mobile-updateNote"
                // onClick={handleLikes}
                className="inline-flex justify-center py-1 pr-1 font-medium rounded-full bg-transparent text-sm
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
              <label className="font-semibold text-xs justify-end">{showContent ? 'Hide' : 'Show'}</label>
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
        <div>
          <div className="px-3">
            <p className="md:px-8 md:py-2 md:text-justify">{d.discussion.content}</p>
          </div>
        </div>

        <div className="flex items-center border-t-2 pl-2 border-gray-300 w-full">
          <label className="transition duration-500 font-semibold md:pl-4 pt-1 text-xs">
            {showReplies ? 'Hide replies' : 'Show replies'}
          </label>
          <div>
            <button
              className={
                showReplies
                  ? 'transition duration-300 transform rotate-90 focus-within:outline-none p-1'
                  : 'transition duration-150 focus-within:outline-none p-1'
              }
              onClick={handleShowReplies}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
          </div>
        </div>
      </Transition>
      <Transition
        show={showReplies}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-75"
        leaveFrom="opacity-700"
        leaveTo="opacity-0"
      >
        <div className=" border-t-2 border-gray-200 bg-blue-100 pl-2 pr-2">
          {d.discussion.responses.map((response, i) => (
            <div key={i} className="md:pl-16">
              <h3 className="border-b border-gray-300 bg-gray-300 text-black pl-2 md:p-1">
                {response.author}
                {' - '} <span className="text-xs"> {getDate(response.date)}</span>
              </h3>
              <p className="text-sm pl-3 pr-2 bg-blue-200">{response.content}</p>
            </div>
          ))}
          <div className="md:pl-16">
            <div className="pl-2 bg-gray-300">
              <button
                onClick={() => setShowInputReply(!showInputReply)}
                className="flex items-center space-x-1 p-1 hover:text-gray-500 focus-within:outline-none"
              >
                <span className="font-semibold text-xs">Reply</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
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
              <div className="">
                {loggedUser ? (
                  <label className="bg-gray-300 border-t-2 border-gray-500 pl-2 p-1 mb-0 w-full text-sm">
                    Author: <span className="italic font-semibold">{loggedUser.username}</span>{' '}
                  </label>
                ) : (
                  <input {...author.params} className="editform-input" placeholder="Author" />
                )}

                <textarea {...reply.params} className="text-area max-h-14" placeholder="Write your response..." />
              </div>
            </Transition>
          </div>
        </div>
      </Transition>

      <div className="h-4 bg-blue-200 border-b-4 border-white"></div>
    </div>
  )
}

export default Discussion
