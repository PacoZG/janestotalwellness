import React from 'react'

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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </p>
      )}
    </div>
  )
}

export default Pagination
