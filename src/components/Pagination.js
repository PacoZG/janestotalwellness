import React from 'react'
import { ReactComponent as ArrowLeftIcon } from '../assets/arrow-left.svg'
import { ReactComponent as ArrowRightIcon } from '../assets/arrow-right.svg'

const Pagination = ({ limit, numberOfDocuments, handlePages, page, handlePreviousPage, handleNextPage }) => {
  let pageNumbers = []
  for (let i = 1; i <= Math.ceil(numberOfDocuments / limit); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className="flex items-center">
      {page === 1 ? null : (
        <p
          className="transition duration-300 text-sm cursor-pointer text-gray-500 bg-gray-300 p-1.5 rounded-l-xl "
          onClick={handlePreviousPage}
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </p>
      )}
      {pageNumbers.map(number => (
        <p
          className={
            number === page
              ? 'transition duration-300 text-lg font-medium text-gray-500 cursor-pointer border-1 bg-gray-300 border-2 border-gray-500 p-1.5 z-20 rounded-sm'
              : 'transition duration-300 text-sm text-gray-500 cursor-pointer bg-gray-300 p-2 '
          }
          key={number}
          onClick={() => handlePages(number)}
        >
          {number}
        </p>
      ))}
      {page === pageNumbers.length ? null : (
        <p
          className="transition duration-300 text-sm cursor-pointer text-gray-500 bg-gray-300 p-1.5 rounded-r-xl "
          onClick={handleNextPage}
        >
          <ArrowRightIcon className="h-6 w-6" />
        </p>
      )}
    </div>
  )
}

export default Pagination
