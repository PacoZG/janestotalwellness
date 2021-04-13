import React from 'react'

const Modal = ({ showModal, setShowModal, message, title }) => {

  return (
    <div>
      {showModal ? (
        <div>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                {/*header*/}
                <button
                  className="p-1 pr-2 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-start justify-between p-2 pl-4 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold text-gray-700">{title}</h3>

                </div>
                {/*body*/}
                <div className="relative pl-4 pr-4 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">{message}</p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 pr-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >OK</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  )
}

export default Modal