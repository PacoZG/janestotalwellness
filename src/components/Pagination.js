import React from 'react'

const Pagination = ({ limit, numberOfDocuments, handlePages, page, handlePreviousPage, handleNextPage }) => {
  let pageNumbers = []
  for (let i = 1; i <= Math.ceil(numberOfDocuments / limit); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className="flex items-center">
      {page === 1 ? null : (
        <p className="text-sm text-black cursor-pointer border border-gray-200 p-2" onClick={handlePreviousPage}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </p>
      )}
      {pageNumbers.map(number => (
        <p
          className={
            number === page
              ? 'text-sm font-medium text-red-500 cursor-pointer border-2 border-red-500 p-2'
              : 'text-sm text-black cursor-pointer border border-gray-200 p-2'
          }
          key={number}
          onClick={() => handlePages(number)}
        >
          {number}
        </p>
      ))}
      {page === pageNumbers.length ? null : (
        <p className="text-sm text-black cursor-pointer border border-gray-200 p-2" onClick={handleNextPage}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
        </p>
      )}
    </div>
  )
}

export default Pagination
