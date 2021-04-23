import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import user from '../services/user'

const Client = () => {
  const paramId = useParams().id
  console.log('CLIENT ID: ', paramId)
  const client = useSelector(state => state.users.find(u => u.id === paramId))
  console.log('CLIENT FOUND: ', client)

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-gray-200 p-2">

        <div className="min-h-screen shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
          from-gray-300 via-white to-gray-200 p-3">
          <h3 className=" text-2xl leading-snug tracking-wide uppercase text-center text-gray-600 font-bold border-b-2 pb-2" >{client.firstName + ' ' + client.lastName}</h3>
          <div className="grid grid-rows-12 gap-6">
            <div className="col-span-12 p-4 m-4 shadow-2xl bg-black bg-opacity-70 border rounded-md">
              <img src={client.imageURL} className="h-40 w-40 border rounded-lg" />
            </div>
            <div className="row-span-3 col-span-6 p-4 m-4 bg-blue-400" >
              <div>

              </div>
            </div>
            <div className=" col-span-6 p-4 m-4 bg-red-400" >
              <div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Client