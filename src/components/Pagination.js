import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

const Pagination = ({ limit, numberOfDocuments, handlePages, page, handlePreviousPage, handleNextPage }) => {
  let pageNumbers = []
  for (let i = 1; i <= Math.ceil(numberOfDocuments / limit); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className="flex items-center">
      {page === 1 ? null : (
        <p
          className="transition duration-300 text-sm cursor-pointer text-gray-500 bg-gray-300 p-2 rounded-l-xl "
          onClick={handlePreviousPage}
        >
          <ChevronLeftIcon className="h-5 w-5" />
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
          className="transition duration-300 text-sm cursor-pointer text-gray-500 bg-gray-300 p-2 rounded-r-xl "
          onClick={handleNextPage}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </p>
      )}
    </div>
  )
}

export default Pagination
