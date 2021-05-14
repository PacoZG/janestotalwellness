import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
const Modal = () => {
  const messageData = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const hideModal = () => {
    dispatch(setNotification({ message: '', title: '', show: false }))
  }

  if (!messageData.show) return <div></div>

  return (
    <div>
      <div id="modal">
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
              <button
                className="pt-2 pr-2 ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none"
                onClick={hideModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-start justify-between p-1 pl-4 border-b border-solid border-blueGray-200 rounded-t">
                <h3 id="title" className="text-xl font-semibold text-gray-700">
                  {messageData.title}
                </h3>
              </div>
              <div className="relative pl-4 pr-4 flex-auto">
                <p id="modal-message" className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  {messageData.message}
                </p>
              </div>
              <div className="flex items-center justify-end p-2 pr-4 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
                    text-white focus:outline-none bg-gray-500 hover:bg-gray-400 focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800 md:ml-3 md:w-auto md:text-base"
                  id="modal-ok"
                  type="button"
                  onClick={hideModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    </div>
  )
}

export default Modal
