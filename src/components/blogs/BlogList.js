import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const indexStart = (page - 1) * limit
  const indexEnd = page * limit
  const slicedBlogs = blogs.slice(indexStart, indexEnd)

  const handlePages = number => {
    setPage(number)
  }

  const handlePreviousPage = () => {
    setPage(page - 1)
  }

  const handleNextPage = () => {
    setPage(page + 1)
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

  return (
    <div className="min-h-screen shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br from-gray-300 via-white to-gray-200 pt-22 ">
      <div className="flex flex-col justify-between min-h-screen">
        <div>
          {blogs.length > 0 ? (
            slicedBlogs.map(blog => (
              <div key={blog.id} className="bg-blue-100 border-b-2 border-t-2">
                <Link to={`/blogs/${blog.id}`} className="transition duration-500 text-gray-700 hover:text-red-700">
                  <div className="flex items-center space-x-2 justify-evenly p-2">
                    <img src={blog.imageURL} alt="profile" className="h-24 w-28 rounded-2xl" />
                    <div>
                      <b className="text-sm md:text-base">{blog.title}</b>
                      <p>
                        <span className="text-base">{blog.author}</span>
                      </p>{' '}
                      <p className="text-sm md:text-sm italic">{t('Blog.PostingDate') + getDate(blog.createdAt)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p>
                        <span className="flex items-center ">
                          {blog.dislikes}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 pl-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                          </svg>
                        </span>
                      </p>
                      <p>
                        <span className="flex items-center">
                          {blog.likes}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 pl-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex flex-row items-center justify-around h-screen">
              <h1 className="text-center text-xl text-gray-500 shadow-md rounded-3xl bg-opacity-0 p-6">
                {t('Blog.NoBlogs')}
              </h1>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center m-2">
          <Pagination
            limit={limit}
            numberOfDocuments={blogs.length}
            handlePages={handlePages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  )
}

export default BlogList
