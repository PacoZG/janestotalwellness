import React, { useEffect, useState } from 'react'
import localdb from '../utils/localdb'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { updateUser } from '../reducers/userReducer'
import { createNote, deleteNote } from '../reducers/noteReducer'
import noteService from '../services/notes'


const Client = () => {
  const paramId = useParams().id
  const dispatch = useDispatch()
  //console.log('CLIENT ID: ', paramId)
  const client = useSelector(state => state.users.find(u => u.id === paramId))
  console.log('CLINET: ', client)
  const allNotes = useSelector(state => state.notes)
  const [notes, setNotes] = useState([])
  
  useEffect(() => {
    if (client) {
      setNotes(allNotes.filter(note => note.user.id === client.id))
    }
  }, [])
  console.log('NOTES: ', allNotes)


  const height = useField('text')
  const weight = useField('text')
  const title = useField('text')
  const content = useField('text')

  const getAge = () => {
    const birthday = new Date(client.dateOfBirth)
    const today = new Date()
    var age = today.getFullYear() - birthday.getFullYear()
    var m = today.getMonth() - birthday.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--
    }
    return age
  }

  const getDate = (objectDate) => {
    const months = ["Jan", "Fab", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const date = new Date(objectDate)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    const time = hours + ':' + minutes + ':' + seconds
    //console.log('DATE OF CREATION:', hours+':'+minutes+':'+seconds)
    const creationDate = weekDays[date.getDay()] + ', ' + day + '.' + months[date.getMonth()] + '.' + date.getFullYear() + ' @' + time
    return creationDate
  }

  const editClientsInfo = (event) => {
    event.preventDefault()
    let clientToUpdate = { ...client }
    let userUpdated = false
    //debugger
    console.log('USER TO UPDATE: ', height.params.value.length)
    console.log(parseInt(height.params.value) === client.height)
    if (parseInt(height.params.value) !== client.height && height.params.value.length > 1) {
      clientToUpdate = { ...clientToUpdate, height: parseInt(height.params.value) }
      console.log(clientToUpdate)
      userUpdated = true
      console.log('USER UPDATE: ', userUpdated)
    }
    if (parseInt(weight.params.value) !== client.weight && weight.params.value.length > 0) {
      clientToUpdate = { ...clientToUpdate, weight: parseInt(weight.params.value) }
      console.log(clientToUpdate)
      userUpdated = true
      console.log('USER UPDATED: ', userUpdated)
    }
    console.log('USER TO UPDATED: ', clientToUpdate)
    if (userUpdated) {
      updateClient(clientToUpdate)
      dispatch(setNotification({
        message: 'Your profile has been successfully updated.',
        title: 'Sucess',
        show: true
      }))
      userUpdated = false
      height.reset()
      weight.reset()
    }
  }

  const updateClient = (userToUpdate) => {
    try {
      dispatch(updateUser(userToUpdate))
    } catch (error) {
      console.log(error)
    }
  }

  const saveNote = async (event) => {
    event.preventDefault()
    const data = {
      clientId: client.id,
      note: {
        title: title.params.value,
        content: content.params.value
      },
      loggedUserType: localdb.loadUser().userType
    }
    //console.log('DATA TO SEND: ', data)
    if (title.params.value.length > 5 && content.params.value.length > 29) {
      debugger
      try {
        const newNote = await noteService.create(data)
        console.log('RESPONSE RECEIVED IN CLIENT: ', newNote)
        setNotes(notes.concat(newNote))
        dispatch(createNote(newNote))
        dispatch(setNotification({
          message: 'Note has been added',
          title: 'Sucess',
          show: true
        }))
        // title.reset()
        // content.reset()
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  const removeNote = (id) => {
    dispatch(deleteNote(id))
  }

  if (!client) {
    return (
      <div className="justify-center items-center flex outline-none bg-gray-100 min-h-screen">
        <div className="flex flex-row space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          <p className="pr-2" >loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      {/* MOBILE VIEW */}
      <div className="md:hidden flex flex-col">
        <div className="shadow overflow-hidden rounded-md bg-gradient-to-br from-gray-300 via-white to-gray-300 p-3">
          <div className="flex flex-col items-center pb-2">
            <label className="tracking-wide border-b pb-2">{`${client.username}`}</label>
            {client.imageURL ?
              <img src={client.imageURL} className="h-40 w-40 md:h-40 md:w-40 border rounded-full" /> :
              // <img className="opacity-10 h-32 w-32 rounded-full bg-white p-1 transform hover:rotate-6 transition" src={bruja} />
              <span className="inline-block rounded-full h-28 w-28 md:h-32 md:w-32 md:rounded-full overflow-hidden bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            }
            <label className="tracking-wide border-b pt-2 pb-1">{`${client.firstName} ${client.lastName}`}</label>
          </div>
          <div className="grid grid-cols-6 gap-4 place-items-center border-b pb-3">
            <div className="block col-span-6">
              <p className="text-md">{client.address ? client.address : 'Not yet provided'}</p>
            </div>
            <div className="block col-span-6">
              <p className="text-md ">
                {client.address && client.zipCode && client.city ? `${client.zipCode}, ${client.city}. ${client.country.toUpperCase()}` : 'Not yet provided'}</p>
            </div>
            <div className="block col-span-6">
              <p className="text-md"><span className="font-semibold">Email: </span>
                {client.email}</p>
            </div>
            <div className="block col-span-6">
              <p className="text-md"><span className="font-semibold">Mobile: </span>
                {client.mobileNumber ? client.mobileNumber : 'Not yet provided'}</p>
            </div>
            <div className="block col-span-3 capitalize">
              <p className="text-md"><span className="font-semibold">Gender: </span>
                {client.gender}</p>
            </div>
            <div className="block col-span-3">
              <p className="text-md"><span className="font-semibold">Age: </span>
                {getAge()} years old</p>
            </div>
            <div className="block col-span-3">
              <p className="text-md"><span className="font-semibold">Height: </span>{client.height}  cm</p>
            </div>
            <div className="block col-span-3">
              <p className="text-md"><span className="font-semibold">Weight: </span>{client.weight} kg</p>
            </div>
            <div className="block col-span-6">
              <p className="text-md"><span className="font-semibold">Member since: </span>{getDate(client.createdAt)}</p>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-8 place-items-start border-b p-4" >
            <div className="block col-span-6">
              <label className="text-left font-semibold ">Background</label>
              <p className="text-md w-full overflow-ellipsis">{client.background}</p>
            </div>
            <div className="block col-span-6">
              <label className="text-left font-semibold">Motivation</label>
              <p className="text-md w-full overflow-ellipsis">{client.motivation}</p>
            </div>
            <div className="block col-span-6">
              <label className="text-left font-semibold">Health information</label>
              <p className="text-md w-full overflow-ellipsis">{client.healthInfo ? client.healthInfo : 'Not yet provided'}</p>
            </div>
          </div>
          <div className="border-b-2 pb-3">
            <div className="p-3">
              <h2 className="font-semibold text-center">Update information</h2>
            </div>
            <div className="grid grid-cols-6 gap-1 place-items-start border-b ">
              <div className="col-span-3">
                <label className="text-sm font-medium text-gray-700 pl-1">Height</label>
                <input name="height" id="height" {...height.params}
                  className="focus:border-gray-500 block w-full shadow-sm border-gray-300 rounded-t-md" />
              </div>
              <div className="col-span-3">
                <label className="text-sm font-medium text-gray-700 pl-1">Weight</label>
                <input name="weight" id="weight" {...weight.params}
                  className="focus:border-gray-500 block w-full shadow-sm border-gray-300 rounded-t-md" />
              </div>
            </div>
            <div className="px-3 py-2 bg-gray-400 text-right rounded-b-md">
              <button type="button" onClick={editClientsInfo}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
                      bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1">
                Save</button>
            </div>
          </div>
          <div className="border-b-2 pb-2">
            <div className="p-3">
              <h2 className="font-semibold text-center">New note</h2>
            </div>
            <div className="">
              <div className="">
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 pl-1">Title</label>
                  <input name="title" id="title" minLength="5" maxLength="30" {...title.params}
                    className="mt-1 focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md" />
                </div>
                <label className="text-sm font-medium text-gray-700 pl-1 pt-2"> Note
                  {content.params.value.length > 29 ?
                    <span className="pl-1 text-xs font-normal">{`(${content.params.value.length}/500)`}</span>
                    :
                    <span className="pl-1 text-xs font-normal">{`(${content.params.value.length}/30 characters minimum)`}</span>
                  }
                </label>
                <textarea name="height" id="height" rows="10" minLength="30" maxLength="500" placeholder="30 characters minimum" {...content.params}
                  className="focus:border-gray-500 block w-full shadow-sm border-gray-300 rounded-t-md h-32 placeholder-gray-200" />
              </div>
            </div>
            <div className="px-3 py-2 bg-gray-400 text-right rounded-b-md">
              <button type="button" onClick={saveNote}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
                      bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1">
                Save</button>
            </div>
          </div>
          <h2 className="text-lg text-center font-semibold p-2 pt-3">Notes</h2>
          {notes.map(note =>
            <div key={note.id} className="p-2 border rounded-sm shadow-sm mt-2">
              <p className="text-lg font-semibold pl-2">{note.title}</p>
              <p className="text-xs text-gray-400 border-b pb-1 pl-2">{getDate(note.date)}</p>
              <p className="p-2">{note.content}</p>
              <div className="px-3 py-2 bg-gray-400 text-right rounded-b-md space-x-2">
                <button type="button" onClick={() => removeNote(note.id)}
                  className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm font-medium rounded-md
                  bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1">
                  Delete</button>
                <button type="button"
                  className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm font-medium rounded-md
                  bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1">
                  Update</button>
              </div>
            </div>
          )}
        </div>
      </div>



      {/* WEB VIEW */}
      <div className="bg-gray-200 p-2 ">

        <div className="hidden md:flex  min-h-screen shadow overflow-hidden rounded-md bg-gradient-to-br 
          from-gray-300 via-white to-gray-300 p-3">
          <div className="flex flex-col">
            <div className="flex flex-col items-center md:items-baseline p-4 m-4 shadow-2xl bg-gradient-to-br 
            from-gray-300 via-white to-gray-300 border-double border rounded-md space-y-2">
              <div className="grid grid-cols-9 gap-0 md:gap-12">
                <div className="col-span-9 md:col-span-3 md:pl-12 ">
                  <div className="flex flex-col items-center space-y-3 border-gray-700">
                    <label className="tracking-wide border-b pb-2">{`${client.username}`}</label>
                    {client.imageURL ?
                      <img src={client.imageURL} className="h-40 w-40 md:h-40 md:w-40 border rounded-full" /> :
                      // <img className="opacity-10 h-32 w-32 rounded-full bg-white p-1 transform hover:rotate-6 transition" src={bruja} />
                      <span className="inline-block rounded-full h-28 w-28 md:h-32 md:w-32 md:rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    }
                    <label className="tracking-wide border-b md:border-t md:border-b-0 pt-2 ">{`${client.firstName} ${client.lastName}`}</label>
                  </div>
                </div>
                <div className="col-span-9 md:col-span-6 pt-2 md:pt-4">
                  <div className="grid grid-cols-9 md:grid-cols-6">
                    <div className="block col-span-9 md:col-span-6 md:border-r">
                      <p className="text-md md:text-lg text-left">{`${client.address}`}</p>
                    </div>
                    <div className="block col-span-9 md:col-span-6 md:border-r">
                      <p className="text-md text-left">{`${client.zipCode}, ${client.city}. ${client.country.toUpperCase()}`}</p>
                    </div>
                    <div className="block col-span-9">
                      <p className="border-t md:border-transparent"></p>
                    </div>
                    <div className="">

                    </div>
                  </div>
                </div>
              </div>
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