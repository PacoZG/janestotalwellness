import React, { useState } from 'react'
import Discussion from './Discussion'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useField } from '../../hooks/index'
import { setNotification } from '../../reducers/notificationReducer'
import { userLogin } from '../../reducers/loginReducer'
import loginService from '../../services/login'
import localdb from '../../utils/localdb'
import { Transition } from '@tailwindui/react'

const Salon = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [showTopicMenu, setShowTopicMenu] = useState(false)
  const [showDiscussionInput, setShowDiscussionInput] = useState(false)
  const [topic, setTopic] = useState('')
  const username = useField('text')
  const password = useField('password')
  const author = useField('text')
  const discussionContent = useField('text')
  const discussionTitle = useField('text')
  const typedTopic = useField('text')

  const topics = ['Exercise', 'Nutrition', 'Other']
  const handleTopic = topic => {
    setTopic(topic)
    setShowTopicMenu(!showTopicMenu)
  }

  const loginAgain = localdb.loadUserInfo(username.params.value)
  if (loginAgain) {
    // console.log('LOGIN AGAIN: ', loginAgain)
    if (username.params.value === loginAgain.username) {
      password.params.value = loginAgain.password
    }
  }

  const salon = 1

  const discussions = [
    {
      date: '2021-05-18T12:01:15.056+00:00',
      author: 'Paco Zavala',
      topic: 'Nutrition',
      title: 'I want to know more about Lorem',
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      likes: 12,
      dislikes: 2,
      comments: [
        {
          author: 'Paco',
          content:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,',
          date: '2021-05-07T09:27:00.733+00:00',
          replies: [],
        },
        {
          author: 'Samu',
          content:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters',
          date: '2021-05-21T09:27:00.733+00:00',
          replies: [
            {
              author: 'Paco',
              content: 'Yeah, yeah, sure.',
              date: '2021-07-04T13:01:15.056+00:00',
            },
            {
              author: 'Jane',
              content: 'This sounds bien sucio',
              date: '2021-07-10T12:30:15.056+00:00',
            },
          ],
        },
      ],
    },
    {
      date: '2021-06-30T12:01:15.056+00:00',
      author: 'Jane Pokkinen',
      topic: 'Exercise',
      title: 'I have some issues with my pito',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters',
      likes: 25,
      dislikes: 1,
      comments: [
        {
          author: 'Samu',
          content:
            "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy",
          date: '2021-07-04T12:01:15.056+00:00',
          replies: [
            {
              author: 'Paco',
              content: 'Yeah, yeah, sure.',
              date: '2021-07-04T13:01:15.056+00:00',
            },
            {
              author: 'Jane',
              content: 'This sounds bien sucio',
              date: '2021-07-10T12:30:15.056+00:00',
            },
          ],
        },
        {
          author: 'Jane',
          content:
            ' Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
          date: '2021-07-05T12:01:15.056+00:00',
          replies: [],
        },
      ],
    },
  ]
  // console.log('DISCUSSIONS: ', discussions)

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

  if (!salon) {
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
          <p className="pr-2">{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-gray-100 min-h-screen ">
        <h1 className="text-sm text-justify bg-blue-100 p-3 md:pl-5 md:pr-5 border-b-2 border-gray-600">
          {t('Salon.Welcome')}
          <Link className="transition duration-300 text-indigo-500 hover:text-red-400" to="#">
            {t('Salon.Code')}
          </Link>
          .
        </h1>

        <div className="relative">
          {/* side menu */}
          <div className="absolute inset-y-0 left-0 h-screen z-40 bg-gray-400 bg-gradient-to-br from-gray-400 via-gray-200 to-transparent border-r-1 bg-opacity-10 border-gray-300 border-opacity-10">
            <button
              className={
                showSideMenu
                  ? 'transition duration-500 transform rotate-180 focus-within:outline-none p-1'
                  : 'transition duration-75 focus-within:outline-none p-1'
              }
              onClick={() => setShowSideMenu(!showSideMenu)}
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
          <Transition
            show={showSideMenu}
            enter="transition transform duration-75 ease-out"
            enterFrom="-translate-x-4 z-0 opacity-0"
            enterTo="translate-x-0 z-40 opacity-100"
            leave="transition transform duration-75 ease-out"
            leaveFrom="translate-x-0 z-40 opacity-100"
            leaveTo="-translate-x-4 z-0 opacity-0"
          >
            <div className="absolute left-6 w-60 md:w-80 z-40 bg-gray-400 h-screen p-1 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 border-r-2 border-gray-400">
              {loggedUser ? (
                <div>
                  <h3 className="text-base p-1 border-b-2">
                    {t('Salon.LoggedAs')}
                    <span className="italic font-semibold"> {loggedUser.username}</span>
                  </h3>
                  <h2 className="text-center pt-1 bg-gray-400">{t('Salon.Topics')}</h2>
                  <p className="text-sm pt-1 ">{t('Salon.FindByTopics')}</p>
                </div>
              ) : (
                <div className=" border-gray-500 pb-2">
                  <h3 className="text-sm p-1">{t('Salon.AsLoggedUser')}</h3>
                  <label className="text-sm border-t border-gray-500 w-full pt-2 pl-1">{t('Signin.Username')}</label>
                  <input
                    className="editform-input"
                    {...username.params}
                    id="forum-username"
                    name="username"
                    autoComplete="on"
                    pattern="[a-z0-9]{4,}"
                    placeholder={t('Signin.Username')}
                    title="Username is required"
                    required
                  />
                  <label className="text-sm pl-1">{t('Signin.Password')}</label>
                  <input
                    className="editform-input"
                    {...password.params}
                    id="forum-password"
                    name="password"
                    autoComplete="current-password"
                    placeholder={t('Signin.Password')}
                    title="Password is required"
                    required
                  />
                  <button onClick={handleLogin} className="buttons-web w-full p-1 mt-1">
                    {t('Signin.SigninButton')}
                  </button>
                  <h2 className="text-center pt-1 border-t border-gray-600 ">{t('Salon.Topics')}</h2>
                  <p className="text-sm pt-1 ">{t('Salon.FindByTopics')}</p>
                </div>
              )}
            </div>
          </Transition>

          {/* Discussion inputs */}
          <div className="ml-6">
            <button
              onClick={() => setShowDiscussionInput(!showDiscussionInput)}
              className="w-full bg-gray-300 focus-within:outline-none hover:text-gray-500"
            >
              {showDiscussionInput ? 'Cancel' : 'Click here to open a discussion'}
            </button>

            <Transition
              show={showDiscussionInput}
              // show={true}
              enter="transition transform duration-500 ease-out"
              enterFrom="-translate-y-4 z-0 opacity-0"
              enterTo="translate-y-0 z-40 opacity-100"
              leave="transition transform duration-75 ease-out"
              leaveFrom="translate-y-0 z-40 opacity-100"
              leaveTo="-translate-y-4 z-0 opacity-0"
            >
              <div className="p-3 bg-gray-200">
                <div className="relative mb-1 w-60">
                  <div className=" space-x-3">
                    <div
                      name="topic"
                      type="text"
                      className="h-10 w-60 border border-gray-300 focus:ring-0 bg-white rounded-md shadow-sm md:text-base text-left"
                    >
                      <div className="flex justify-between ">
                        {topic ? (
                          <div className="flex text-sm text-gray-500 pr-2">
                            <div className="pr-28">{topic}</div>
                            <div onClick={() => setTopic(null)} className="opacity-50 z-30 cursor-pointer">
                              X
                            </div>
                          </div>
                        ) : (
                          <div className="opacity-25 text-sm ">Select your topic</div>
                        )}
                        <div>
                          <span
                            className="flex items-center border-l pl-2 cursor-pointer"
                            id="country-menu"
                            onClick={() => setShowTopicMenu(!showTopicMenu)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      {topic === 'Other' ? (
                        <input
                          className=" border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent focus-within:outline-none rounded-md h-10 w-60 pl-2 text-sm placeholder-gray-200"
                          {...typedTopic.params}
                          placeholder="Type you topic"
                        />
                      ) : null}
                    </div>
                  </div>

                  <Transition
                    show={showTopicMenu}
                    enter="transition transform duration-75 ease-out"
                    enterFrom="-translate-x-4 z-0 opacity-0"
                    enterTo="translate-x-0 z-40 opacity-100"
                    leave="transition transform duration-75 ease-out"
                    leaveFrom="translate-x-0 z-40 opacity-100"
                    leaveTo="-translate-x-4 z-0 opacity-0"
                  >
                    <div
                      id="topic-dropdown"
                      className="absolute border rounded-b-md rounded-sm bg-white z-50 divide-y divide-gray-50 w-48"
                    >
                      {topics.sort().map(topic => (
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
                <div className="">
                  {loggedUser ? (
                    <label className="w-full bg-gray-300 rounded-t-md border-t-2 border-gray-500 pl-2 p-1 mb-0  text-xs">
                      {t('Discussion.Author')}: <span className="italic font-semibold">{loggedUser.username}</span>{' '}
                    </label>
                  ) : (
                    <input
                      id="author-discussion"
                      {...author.params}
                      className="editform-input rounded-b-none"
                      placeholder={t('Discussion.Author')}
                    />
                  )}
                  <input
                    id="title-discussion"
                    {...discussionTitle.params}
                    className="editform-input rounded-none "
                    placeholder={t('Discussion.Title')}
                  />

                  <textarea
                    id="content-discussion"
                    {...discussionContent.params}
                    className="text-area rounded-b-md max-h-14"
                    placeholder="Write a reply..."
                  />
                </div>
              </div>
            </Transition>

            <div className="border-separate border-r-2 border-gray-300">
              {discussions.map((discussion, i) => (
                <Discussion key={i} discussion={discussion} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Salon
