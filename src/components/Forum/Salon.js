import React, { useState } from 'react'
import { Transition } from '@tailwindui/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useField } from '../../hooks/index'
import { setNotification } from '../../reducers/notificationReducer'
import { userLogin } from '../../reducers/loginReducer'
import loginService from '../../services/login'
import localdb from '../../utils/localdb'
import DiscussionsList from './DiscussionsList'
import Pagination from '../Pagination'
import { createDiscussion } from '../../reducers/discussionReducer'
import { SelectorIcon, CheckIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline'
import LoadingPage from '../../utils/LoadingPage'

const Salon = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const discussions = useSelector(state => state.discussions)
  const [showTopMenu, setShowTopMenu] = useState(false)
  const [showTopicMenu, setShowTopicMenu] = useState(false)
  const [topic, setTopic] = useState(null)
  const [topicFilter, setTopicFilter] = useState('')
  const [titleFilter, setTitleFilter] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')
  const username = useField('text')
  const password = useField('password')
  const author = useField('text')
  const discussionContent = useField('text')
  const discussionTitle = useField('text')
  const typedTopic = useField('text')

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const indexStart = (page - 1) * limit
  const indexEnd = page * limit
  const filteredDiscussions = discussions
    .filter(discussion => discussion.topic.toLowerCase().includes(topicFilter.toLowerCase()))
    .filter(discussion => discussion.author.toLowerCase().includes(authorFilter.toLowerCase()))
    .filter(discussion => discussion.title.toLowerCase().includes(titleFilter.toLowerCase()))
  const slicedDiscussions = filteredDiscussions.slice(indexStart, indexEnd)

  const handlePages = number => {
    setPage(number)
  }

  const handlePreviousPage = () => {
    setPage(page - 1)
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const handleTopicChange = event => {
    event.preventDefault()
    setTopicFilter(event.target.value)
    setPage(1)
  }

  const handleTitleChange = event => {
    event.preventDefault()
    setTitleFilter(event.target.value)
    setPage(1)
  }

  const handleAuthorChange = event => {
    event.preventDefault()
    setAuthorFilter(event.target.value)
    setPage(1)
  }

  const loginAgain = localdb.loadUserInfo(username.params.value)
  if (loginAgain) {
    if (username.params.value === loginAgain.username) {
      password.params.value = loginAgain.password
    }
  }

  const handleLogin = async event => {
    event.preventDefault()
    const credentials = {
      username: username.params.value.toLowerCase(),
      password: password.params.value,
    }

    try {
      var user = await loginService.login(credentials)
      dispatch(userLogin(user))
      if (user.userType === 'client') {
        dispatch(
          setNotification({
            message: t('Signin.Welcome') + user.username + t('Signin.SessionWelcome'),
            title: 'Success',
            show: true,
          })
        )
        username.reset()
        password.reset()
      } else {
        dispatch(
          setNotification({
            message: t('Signin.Welcome') + user.username,
            title: 'Success',
            show: true,
          })
        )
      }
    } catch (error) {
      dispatch(
        setNotification({
          message: `${error.response.data.error}`,
          title: 'Login error',
          show: true,
        })
      )
    }
  }

  const topics = ['Exercise', 'Groups', 'Meditation', 'Nutrition', 'Rest', 'Other']
  const handleTopic = topic => {
    setTopic(topic)
    setShowTopicMenu(!showTopicMenu)
  }

  const handleClearFields = () => {
    author.reset()
    discussionContent.reset()
    discussionTitle.reset()
    setTopic(null)
  }

  const handlePostDiscussion = () => {
    if (topic) {
      const newDiscussion = {
        userId: loggedUser ? loggedUser.id : 'visitor',
        topic: topic === 'Other' ? typedTopic.params.value : topic,
        author: loggedUser ? loggedUser.username : author.params.value,
        title: discussionTitle.params.value,
        content: discussionContent.params.value,
      }
      if (
        newDiscussion.author.length > 3 &&
        newDiscussion.topic.length >= 4 &&
        discussionTitle.params.value.length > 9 &&
        discussionContent.params.value.length > 49
      ) {
        try {
          dispatch(createDiscussion(newDiscussion))
          dispatch(
            setNotification({
              message: 'Your discussion has been succesfully created',
              title: 'Sucess',
              show: true,
            })
          )
          setTopic(null)
          typedTopic.reset()
          author.reset()
          discussionTitle.reset()
          discussionContent.reset()
        } catch (error) {
          console.log('ERROR:', error.response.data.error)
        }
      }
    }
  }

  if (!discussions) {
    return <LoadingPage />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-white to-gray-200 pt-20 md:pt-20 ">
      <div className="flex flex-col justify-between min-h-screen">
        <div>
          <h1 className="text-sm text-justify bg-blue-100 p-3 md:pl-5 md:pr-5 border-b-2 border-gray-600">
            {t('Salon.Welcome')}
            <Link
              to="/codeofconduct"
              target="blank"
              className="transition duration-300 text-indigo-500 hover:text-red-400"
            >
              {t('Salon.Code')}
            </Link>
            .{t('Salon.KeepInMind')}
          </h1>
          <div className="flex items-center bg-gradient-to-br from-gray-400 via-gray-200 to-transparent ">
            <button
              id="show-menu-button"
              className="focus-within:outline-none p-1 pl-3"
              onClick={() => setShowTopMenu(!showTopMenu)}
            >
              {t('Salon.Menu')}
            </button>
            <div
              className={
                showTopMenu
                  ? 'transition duration-500 transform rotate-90 focus-within:outline-none p-1'
                  : 'transition duration-75 focus-within:outline-none p-1'
              }
            >
              <ChevronDoubleRightIcon className="h-4 w-4" />
            </div>
          </div>

          <div className="relative w-full">
            <Transition
              show={showTopMenu}
              enter="transition transform duration-500 ease-out"
              enterFrom="-translate-y-4 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition transform duration-75 ease-out"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="-translate-y-4 opacity-0"
            >
              <div className="flex flex-col md:flex-row md:space-x-2 md:items-start p-3 bg-gradient-to-br from-gray-300 via-white to-gray-300 border-b-2 border-gray-300 mb-2">
                <div className="md:w-2/3 border-b-2 border-gray-300 mb-1 md:mb-0 pb-1 md:pb-0 md:border-b-0">
                  <div>
                    <div className="md:mb-1">
                      <div className="md:flex md:items-center md:space-x-2 mb-1">
                        <div
                          name="topic"
                          type="text"
                          className="h-9 w-60 border border-gray-300 focus:ring-0 bg-white rounded-md shadow-sm md:text-base text-left"
                        >
                          <div className="flex justify-between ">
                            {topic ? (
                              <div className="flex justify-between w-48 text-sm text-gray-500 pr-2">
                                <div className="">{topic}</div>
                                <div onClick={() => setTopic(null)} className="opacity-50 cursor-pointer">
                                  X
                                </div>
                              </div>
                            ) : (
                              <div className="opacity-25 text-sm text-center ">{t('Salon.SelectTopic')}</div>
                            )}
                            <div>
                              <span
                                className="flex items-center border-l pl-1 cursor-pointer"
                                id="topic-menu"
                                onClick={() => setShowTopicMenu(!showTopicMenu)}
                              >
                                <SelectorIcon className="h-5 w-5" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {topic && topic !== 'Other' && topic.length > 4 ? (
                          <p className="flex items-center">
                            <span className="text-sm pl-2 ">{t('Salon.Topic')} </span>
                            <span className="transition duration-1000 text-sm text-green-500 ml-2 p-1 ">
                              <CheckIcon className="h-4 w-4" />
                            </span>
                          </p>
                        ) : null}
                        <div className="">
                          {topic === 'Other' ? (
                            <input
                              className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent focus-within:outline-none rounded-md h-9 w-60 text-sm placeholder-gray-200"
                              {...typedTopic.params}
                              placeholder={t('Salon.TopicPlaceholder')}
                              title="A topic is required"
                              minLength="5"
                              required
                            />
                          ) : null}
                        </div>
                        {topic === 'Other' && typedTopic.params.value.length > 4 ? (
                          <p className="flex items-center">
                            <span className="text-sm pl-2 ">{t('Salon.Topic')} </span>
                            <span className="transition duration-1000 text-sm text-green-500 ml-2 p-1 ">
                              <CheckIcon className="h-4 w-4" />
                            </span>
                          </p>
                        ) : null}
                      </div>

                      <Transition
                        show={showTopicMenu}
                        enter="transition transform duration-75 ease-out"
                        enterFrom="-translate-y-2 opacity-0"
                        enterTo="translate-y-0 opacity-100"
                        leave="transition transform duration-75 ease-out"
                        leaveFrom="translate-y-0 opacity-100"
                        leaveTo="-translate-y-2 opacity-0"
                      >
                        <div
                          id="topic-dropdown"
                          className="absolute border rounded-b-md rounded-sm bg-white divide-y divide-gray-50 w-60"
                        >
                          {topics.map(topic => (
                            <p
                              className="p-1 pl-2 text-sm text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer "
                              id={`${topic}`}
                              onClick={() => handleTopic(topic)}
                              key={topic}
                            >
                              {topic}
                            </p>
                          ))}
                        </div>
                      </Transition>
                    </div>
                  </div>
                  <div className="">
                    {loggedUser ? (
                      <label className="w-full bg-gray-300 rounded-t-md border-t-2 border-gray-500 pl-2 p-1 mb-0 text-xs">
                        {t('Discussion.Author')}: <span className="italic font-semibold">{loggedUser.username}</span>{' '}
                      </label>
                    ) : (
                      <input
                        id="author-discussion-input"
                        {...author.params}
                        className="editform-input rounded-b-none"
                        placeholder={t('Discussion.Author')}
                        title="Author is required"
                        minLength="3"
                        required
                      />
                    )}
                    <input
                      id="title-discussion-input"
                      {...discussionTitle.params}
                      className="editform-input rounded-none h-9"
                      placeholder={t('Discussion.Title')}
                      title="Title is required"
                      minLength="10"
                      required
                    />

                    <textarea
                      id="content-discussion-input"
                      {...discussionContent.params}
                      className="text-area rounded-b-md"
                      placeholder={t('Salon.ContentPlaceholder')}
                      title={t('Salon.ContentRequired')}
                      minLength="50"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2 items-end md:flex-row md:items-center md:justify-between md:space-y-0 w-full p-1 pl-2 space-x-2">
                    <div className="flex flex-col items-end md:items-start">
                      <div>
                        {discussionTitle.params.value.length < 10 ? (
                          <span className="text-red-900 text-xs">
                            {t('Salon.TitleCharac') + `${discussionTitle.params.value.length}/10` + t('Salon.Minimum')}
                          </span>
                        ) : (
                          <p className="flex items-center">
                            <span className="text-sm">{t('Salon.Title')} </span>
                            <span className="transition duration-1000 text-sm text-green-500 ml-2 p-1 ">
                              <CheckIcon className="h-4 w-4" />
                            </span>
                          </p>
                        )}
                      </div>
                      <div>
                        {discussionContent.params.value.length < 50 ? (
                          <span className="text-red-900 text-xs">
                            {t('Salon.ContentCharac') +
                              `${discussionContent.params.value.length}/50` +
                              t('Salon.Minimum')}
                          </span>
                        ) : (
                          <p className="flex items-center">
                            <span className="text-sm">{t('Salon.Content')} </span>
                            <span className="transition duration-1000 text-sm text-green-500 ml-2 p-1">
                              <CheckIcon className="h-4 w-4" />
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                      <button
                        className="buttons-web text-black bg-blue-100 p-1 pr-2 pl-2 "
                        id="clear-discussion-button"
                        onClick={handleClearFields}
                      >
                        {t('ButtonLabel.Discard')}
                      </button>
                      <button
                        className="buttons-web text-black bg-blue-100 p-1 pr-2 pl-2 "
                        id="post-discussion-button"
                        onClick={handlePostDiscussion}
                      >
                        {t('ButtonLabel.Post')}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 border-gray-400">
                  <div>
                    {loggedUser ? (
                      <div className="md:pt-2">
                        <p className="text-base text-center p-1 md:pt-10">
                          {t('Salon.LoggedAs')}
                          <span className="italic font-semibold"> {loggedUser.username}</span>
                        </p>
                      </div>
                    ) : (
                      <div className=" border-gray-500">
                        <p className="text-sm text-center 2xl:pt-5">{t('Salon.AsLoggedUser')}</p>
                        <input
                          className="editform-input"
                          {...username.params}
                          id="forum-username-input"
                          name="username"
                          autoComplete="on"
                          pattern="[a-z0-9]{4,}"
                          placeholder={t('Signin.Username')}
                          title="Username is required"
                          required
                        />
                        <input
                          className="editform-input"
                          {...password.params}
                          id="forum-password-input"
                          name="password"
                          autoComplete="current-password"
                          placeholder={t('Signin.Password')}
                          title="Password is required"
                          required
                        />
                        <button id="salon-login-button" onClick={handleLogin} className="buttons-web w-full p-1 mt-1">
                          {t('Signin.SigninButton')}
                        </button>
                      </div>
                    )}
                    <p className="text-center text-sm h-7 pt-1 bg-gray-300  rounded-t-md border-t-2 border-gray-500 md:mb-0">
                      {t('Salon.FindByTopics')}
                    </p>
                    <input
                      className="editform-input rounded-t-none"
                      id="topic-filter"
                      onChange={handleTopicChange}
                      type="text"
                      placeholder={t('Salon.FindTopicPH')}
                    />
                    <p className="text-center text-sm h-7 pt-1 bg-gray-300  rounded-t-md border-t-2 border-gray-500 mt-1 md:mb-0">
                      {t('Salon.FindByAuthor')}
                    </p>
                    <input
                      className="editform-input rounded-t-none"
                      id="author-filter"
                      onChange={handleAuthorChange}
                      type="text"
                      placeholder={t('Salon.FindAuthorPH')}
                    />
                    <p className="text-center text-sm h-7 pt-1 bg-gray-300  rounded-t-md border-t-2 border-gray-500 mt-1 md:mb-0">
                      {t('Salon.FindByTitle')}
                    </p>
                    <input
                      className="editform-input rounded-t-none"
                      id="content-filter"
                      onChange={handleTitleChange}
                      type="text"
                      placeholder={t('Salon.FindTitlePH')}
                    />
                    <div className="container flex space-x-2 items-center justify-center text-center text-sm h-10 p-2 bg-gray-300  rounded-md border-t-2 border-gray-500 mt-1 md:mb-0 ">
                      <p>{t('Salon.Show')}</p>
                      <p
                        className="cursor-pointer transition duration-300 border-2 border-gray-400 hover:text-gray-100 hover:bg-gray-500 p-1 rounded-md"
                        onClick={() => {
                          setLimit(6)
                          setPage(1)
                        }}
                      >
                        6
                      </p>
                      <p
                        className="cursor-pointer transition duration-300 border-2 border-gray-400 hover:text-gray-100 hover:bg-gray-500 p-1 rounded-md"
                        onClick={() => {
                          setLimit(12)
                          setPage(1)
                        }}
                      >
                        12
                      </p>
                      <p
                        className="cursor-pointer transition duration-300 border-2 border-gray-400 hover:text-gray-100 hover:bg-gray-500 p-1 rounded-md"
                        onClick={() => {
                          setLimit(28)
                          setPage(1)
                        }}
                      >
                        28
                      </p>
                      <p>{t('Salon.DiscPP')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            {/* discussion list */}
            <div className="border-separate border-r-2 border-gray-300">
              {discussions.length > 0 ? (
                <DiscussionsList discussions={slicedDiscussions} />
              ) : (
                <div className="flex flex-row items-center justify-around h-screen">
                  <h1 className="text-center text-xl text-gray-500 shadow-md rounded-3xl bg-opacity-0 p-6">
                    {t('Salon.NoDiscussions')}
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
        {discussions.length > 0 && (
          <div className="flex items-center justify-center m-2">
            {topicFilter.length > 0 || titleFilter.length > 0 || authorFilter.length > 0 ? (
              <Pagination
                limit={limit}
                numberOfDocuments={filteredDiscussions.length}
                handlePages={handlePages}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                page={page}
                setPage={setPage}
              />
            ) : (
              <Pagination
                limit={limit}
                numberOfDocuments={discussions.length}
                handlePages={handlePages}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                page={page}
                setPage={setPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Salon
