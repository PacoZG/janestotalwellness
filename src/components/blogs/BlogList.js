import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const { t } = useTranslation()
  console.log('BLOGS: ', blogs.length)

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

  return (
    <div
      className="min-h-screen shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
    from-gray-300 via-white to-gray-200 "
    >
      {blogs.length > 0 ? (
        blogs.map((blog, i) => (
          <div key={i} className="bg-blue-100 border-b-2 border-t-2">
            <Link to={`/blogs/${blog.id}`} className="transition duration-500 text-gray-700 hover:text-red-700">
              <div className="flex items-center space-x-2 justify-evenly p-4">
                <img src={blog.imageURL} className="h-24 w-28 rounded-2xl" />
                <div>
                  <b className="text-sm md:text-base">{blog.title}</b>
                  <p>
                    <span className="text-base">by {blog.author}</span>
                  </p>{' '}
                  <p className="text-sm md:text-sm italic">Posted on {getDate(blog.createdAt)}</p>
                </div>

                <p>
                  <span className="flex items-center">
                    {blog.likes}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 pl-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <h1 className="text-center text-lg text-red-400 border p-4">
          Unfortunately we don&lsquo;t have blog posts to show, stay tuned.
        </h1>
      )}
    </div>
  )
}

export default BlogList
