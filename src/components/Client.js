import React from 'react'
import localdb from '../utils/localdb'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { updateUser } from '../reducers/usersReducer'
import { createNote, updateNote, deleteNote } from '../reducers/noteReducer'
import { getAge, getBMI } from '../utils/helper'
import noteService from '../services/notes'
import Note from './Note'

const Client = () => {
  const { t } = useTranslation()
  const paramId = useParams().id
  const dispatch = useDispatch()
  const client = useSelector(state => state.users.find(u => u.id === paramId))
  const notes = useSelector(state => state.notes)

  const height = useField('text')
  const weight = useField('text')
  const content = useField('text')

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

  const handleClientsInfo = event => {
    event.preventDefault()
    let clientToUpdate = { ...client }
    let userUpdated = false
    if (parseInt(height.params.value, 10) !== client.height && height.params.value.length > 1) {
      clientToUpdate = {
        ...clientToUpdate,
        height: parseInt(height.params.value, 10),
      }
      userUpdated = true
    }
    if (parseInt(weight.params.value, 10) !== client.weight && weight.params.value.length > 0) {
      clientToUpdate = {
        ...clientToUpdate,
        weight: parseInt(weight.params.value, 10),
      }
      userUpdated = true
    }
    if (userUpdated) {
      handleUpdateClient(clientToUpdate)
      dispatch(setNotification({ message: t('Client.InfoUpdate'), title: 'Sucess', show: true }))
      userUpdated = false
      height.reset()
      weight.reset()
    }
  }

  const handleUpdateClient = userToUpdate => {
    try {
      dispatch(updateUser(userToUpdate))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSaveNote = async event => {
    event.preventDefault()
    const data = {
      user: {
        id: client.id,
        username: client.username,
      },
      content: content.params.value,
      loggedUserType: localdb.loadUser().userType,
    }
    if (content.params.value.length > 2) {
      try {
        const newNote = await noteService.createNote(data)
        const createdNote = {
          ...newNote,
          user: { username: client.username, id: client.id },
        }
        client.notes = client.notes.concat(createdNote)
        dispatch(createNote(createdNote))
        dispatch(setNotification({ message: t('Client.SaveNote'), title: 'Sucess', show: true }))
        content.reset()
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  const handleRemoveNote = id => {
    client.notes = client.notes.filter(note => note.id !== id)
    dispatch(deleteNote(id))
  }

  const handleUpdateNote = (content, id) => {
    const noteToUpdate = notes.find(note => note.id === id)
    if (content.length > 1) {
      const updatedNote = {
        ...noteToUpdate,
        content: content,
      }
      try {
        dispatch(updateNote(updatedNote))
        client.notes = client.notes.map(note => (note.id !== updatedNote.id ? note : updatedNote))
        dispatch(setNotification({ message: t('Client.UpdateNote'), title: 'Sucess', show: true }))
        // title.reset()
        content.reset()
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  if (!client) {
    return (
      <div className="justify-center items-center flex outline-none bg-gray-100 min-h-screen">
        <div className="flex flex-row space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          <p className="pr-2">{t('loading')}</p>
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
            {client.imageURL ? (
              <img src={client.imageURL} alt="profile" className="h-40 w-40 md:h-40 md:w-40 border rounded-full" />
            ) : (
              <span className="inline-block rounded-full h-28 w-28 md:h-32 md:w-32 md:rounded-full overflow-hidden bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            )}
            <label className="tracking-wide border-b pt-2 pb-1">{`${client.firstName} ${client.lastName}`}</label>
          </div>
          <div className="grid grid-cols-6 gap-4 place-items-center border-b pb-3">
            <div className="block col-span-6">
              <p className="text-base">
                {client.address ? client.address : <span className="text-red-400">{t('Client.NotProvided')}</span>}
              </p>
            </div>
            <div className="block col-span-6">
              <p className="text-base ">
                {client.address && client.zipCode && client.city ? (
                  `${client.zipCode}, ${client.city}. ${client.country.toUpperCase()}`
                ) : (
                  <span className="text-red-400">{t('Client.NotProvided')}</span>
                )}
              </p>
            </div>
            <div className="block col-span-6">
              <p className="text-base">
                <span className="font-semibold">{t('Client.Email')}</span>
                {client.email}
              </p>
            </div>
            <div className="block col-span-6">
              <p className="text-base">
                <span className="font-semibold">{t('Client.Mobile')}</span>
                {client.mobileNumber ? (
                  client.mobileNumber
                ) : (
                  <span className="text-red-400">{t('Client.NotProvided')}</span>
                )}
              </p>
            </div>
            <div className="block col-span-3 ">
              <p className="text-base capitalize">
                <span className="font-semibold">{t('Client.Gender')}</span>
                {client.gender}
              </p>
            </div>
            <div className="block col-span-3">
              <p className="text-base">
                <span className="font-semibold">{t('Client.Age')}</span>
                {getAge(client.dateOfBirth)} {t('Client.yo')}
              </p>
            </div>
            <div className="block col-span-3">
              <p className="text-base">
                <span className="font-semibold">{t('Client.Height')}</span>
                {client.height}cm
              </p>
            </div>
            <div className="block col-span-3">
              <p className="text-base">
                <span className="font-semibold">{t('Client.Weight')}</span>
                {client.weight}kg
              </p>
            </div>
            <div className="block col-span-6">
              <p className="text-base">
                <span className="font-semibold">{t('Client.BMI')}</span>
                {getBMI(client.height, client.weight, t)}
              </p>
            </div>
            <div className="block col-span-6">
              <p className="text-base">
                <span className="font-semibold">{t('Client.Member')}</span>
                {getDate(client.createdAt)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-8 place-items-start border-b p-4">
            <div className="block col-span-6">
              <label className="text-left font-semibold ">{t('Client.Background')}</label>
              <p className="text-base text-justify w-full overflow-ellipsis">{client.background}</p>
            </div>
            <div className="block col-span-6">
              <label className="text-left font-semibold">{t('Client.Goals')}</label>
              <p className="text-base text-justify w-full overflow-ellipsis">{client.goals}</p>
            </div>
            <div className="block col-span-6">
              <label className="text-left font-semibold">{t('Client.Health')}</label>
              <p className="text-base w-full overflow-ellipsis">
                {client.healthInfo ? (
                  client.healthInfo
                ) : (
                  <span className="text-red-400">{t('Client.NotProvided')}</span>
                )}
              </p>
            </div>
          </div>
          <div className="border-b-2 pb-3">
            <div className="p-3">
              <h2 className="font-semibold text-center">{t('Client.Biometrics')}</h2>
              <p className="mt-1 text-xs text-center text-gray-600">{t('Client.ApproxBMI')}</p>
            </div>
            <div className="grid grid-cols-6 gap-1 place-items-start border-b ">
              <div className="col-span-3">
                <label className="text-sm font-medium text-gray-700 pl-1">{t('Client.Height')}</label>
                <input
                  name="height"
                  id="mobile-height"
                  {...height.params}
                  className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 w-full h-9 p-2 shadow-sm text-sm border-gray-300 rounded-t-md"
                />
              </div>
              <div className="col-span-3">
                <label className="text-sm font-medium text-gray-700 pl-1">{t('Client.Weight')}</label>
                <input
                  name="weight"
                  id="mobile-weight"
                  {...weight.params}
                  className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 w-full h-9 p-2 shadow-sm text-sm border-gray-300 rounded-t-md"
                />
              </div>
            </div>
            <div className="px-3 py-2 bg-gray-400 text-right rounded-b-md">
              <button
                type="button"
                id="mobile-saveInfo"
                onClick={handleClientsInfo}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1"
              >
                {t('ButtonLabel.Save')}
              </button>
            </div>
          </div>
          <div className="border-b-2 pb-2">
            <div className="p-3">
              <h2 className="font-semibold text-center">{t('Client.NewNote')}</h2>
            </div>
            <div className="">
              <div className="">
                <label className="text-sm font-medium text-gray-700 pl-2 pt-2">
                  {t('Client.NoteLabel')}
                  {content.params.value.length > 1 ? (
                    <span className="pl-1 text-xs text-gray-400 font-normal">{`(${content.params.value.length}/500)`}</span>
                  ) : (
                    <span className="pl-1 text-xs text-red-300 font-normal">{`(${content.params.value.length}/2 min)`}</span>
                  )}
                </label>
                <textarea
                  name="height"
                  id="mobile-content"
                  rows="10"
                  minLength="2"
                  maxLength="500"
                  placeholder="2 characters minimum"
                  {...content.params}
                  className="text-area"
                />
              </div>
            </div>
            <div className="px-3 py-2 bg-gray-400 text-right rounded-b-md">
              <button
                type="button"
                id="mobile-saveNote"
                onClick={handleSaveNote}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1"
              >
                {t('ButtonLabel.Save')}
              </button>
            </div>
          </div>
          <h3 className="text-lg text-center font-semibold p-2 pt-3">{t('Client.NotesLabel')}</h3>
          {client.notes.length > 0 ? (
            client.notes.map((note, i) => (
              <Note
                key={i}
                handleRemoveNote={handleRemoveNote}
                handleUpdateNote={handleUpdateNote}
                note={note}
                view="mobile"
              />
            ))
          ) : (
            <h3 className="text-center text-xl font-semibold p-4">{t('Client.NoNotes')}</h3>
          )}
        </div>
      </div>

      {/* WEB VIEW */}
      <div className="bg-gray-200 p-2 ">
        <div
          className="hidden md:flex min-h-screen shadow overflow-hidden rounded-md bg-gradient-to-br
        from-gray-300 via-white to-gray-300 p-3 "
        >
          <div className="w-screen">
            <div className="flex flex-col p-4 m-4 shadow-2xl bg-gradient-to-brfrom-gray-300 via-white to-gray-300 border-double border rounded-md">
              <div className="flex p-6 border-b">
                <div className="flex flex-col items-center space-y-3 border-gray-700 p-9 ">
                  <label className="tracking-wide border-b pb-2">{`${client.username}`}</label>
                  {client.imageURL ? (
                    <img
                      src={client.imageURL}
                      alt="profile"
                      className="h-40 w-40 md:h-40 md:w-40 border rounded-full"
                    />
                  ) : (
                    <span className="inline-block rounded-full h-28 w-28 md:h-32 md:w-32 md:rounded-full overflow-hidden bg-gray-100">
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  )}
                  <label className="tracking-wide border-t pt-2 ">{`${client.firstName} ${client.lastName}`}</label>
                </div>
                <div className="flex-grow pl-10 pt-10">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <p className="text-base text-left">
                        <span className="text-left font-semibold pr-8">{t('Client.Address')}</span>
                        {client.address ? (
                          client.address
                        ) : (
                          <span className="text-red-400">{t('Client.NotProvided')}</span>
                        )}
                      </p>
                    </div>
                    <div className="col-span-6">
                      <p className="text-base text-left">
                        <span className="text-left font-semibold pr-8">{t('Client.Address')}</span>
                        {client.address && client.zipCode && client.city ? (
                          `${client.zipCode}, ${client.city}. ${client.country.toUpperCase()}`
                        ) : (
                          <span className="text-red-400">{t('Client.NotProvided')}</span>
                        )}
                      </p>
                    </div>
                    <div className=" col-span-6">
                      <p className="border-transparent text-left w-auto">
                        <span className="text-left font-semibold pr-2">{t('Client.Email')}</span>
                        {client.email}
                      </p>
                    </div>
                    <div className=" col-span-6">
                      <p className="border-transparent text-left">
                        <span className="text-left font-semibold pr-2">{t('Client.Mobile')}</span>
                        {client.mobileNumber ? (
                          client.mobileNumber
                        ) : (
                          <span className="text-red-400">{t('Client.NotProvided')}</span>
                        )}
                      </p>
                    </div>
                    <div className=" col-span-3">
                      <p className="border-transparent text-left capitalize">
                        <span className="text-left font-semibold pr-2">{t('Client.Gender')}</span>
                        {client.gender}
                      </p>
                    </div>
                    <div className=" col-span-3">
                      <p className="border-transparent text-left">
                        <span className="text-left font-semibold pr-2">{t('Client.Age')}</span>
                        {getAge(client.dateOfBirth)} years old
                      </p>
                    </div>
                    <div className=" col-span-3">
                      <p className="border-transparent text-left">
                        <span className="text-left font-semibold pr-2">{t('Client.Height')}</span>
                        {client.height}cm
                      </p>
                    </div>
                    <div className=" col-span-3">
                      <p className="border-transparent text-left">
                        <span className="text-left font-semibold pr-2">{t('Client.Weight')}</span>
                        {client.weight}kg
                      </p>
                    </div>
                    <div className=" col-span-6">
                      <p className="border-transparent text-left">
                        <span className="text-left font-semibold pr-8">{t('Client.BMI')}</span>
                        {getBMI(client.height, client.weight, t)}
                      </p>
                    </div>
                    <div className=" col-span-6">
                      <p className="border-transparent text-left">
                        <span className="text-left font-semibold pr-8">{t('Client.Member')}</span>
                        {getDate(client.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pr-16 pl-16 pt-4 pb-4 border-b">
                <label className="text-left font-semibold pr-8">{t('Client.Background')}</label>
                <p className="border-transparent text-left">{client.background}</p>
              </div>
              <div className="pr-16 pl-16 pt-4 pb-4 border-b">
                <label className="text-left font-semibold pr-8">{t('Client.Goals')}</label>
                <p className="border-transparent text-left">{client.goals}</p>
              </div>
              <div className="pr-16 pl-16 pt-4 pb-4 border-b">
                <label className="text-left font-semibold pr-8">{t('Client.Health')}</label>
                <p className="border-transparent text-left">
                  {client.healthInfo ? (
                    client.healthInfo
                  ) : (
                    <span className="text-red-400">{t('Client.NotProvided')}</span>
                  )}
                </p>
              </div>
            </div>
            <div className="mr-4 ml-4">
              <div className="grid grid-cols-3 gap-6 shadow-2xl bg-gradient-to-br from-gray-300 via-white to-gray-300 border-double border rounded-md">
                <div className="col-span-1">
                  <div className="p-5">
                    <h2 className="text-xl font-medium leading-6 text-gray-900">{t('Client.Biometrics')}</h2>
                    <p className="mt-1 text-sm text-gray-600">{t('Client.ApproxBMI')}</p>
                  </div>
                </div>
                <div className="m-4 col-span-2">
                  <div className="shadow overflow-hidden md:rounded-md rounded-b-md">
                    <div className="p-6 bg-transparent">
                      <div className="grid grid-cols-6 gap-3">
                        <div className="col-span-3">
                          <label className="block text-sm font-medium text-gray-700 pl-2">{t('Client.Height')}</label>
                          <input name="wem-height" id="web-height" {...height.params} className="editform-input " />
                        </div>
                        <div className="col-span-3">
                          <label className="block text-sm font-medium text-gray-700 pl-2">{t('Client.Weight')}</label>
                          <input name="web-weight" id="web-weight" {...weight.params} className="editform-input " />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-400 text-right md:px-6">
                      <button type="button" id="web-saveInfo" onClick={handleClientsInfo} className="buttons-web">
                        {t('ButtonLabel.Save')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 m-4 shadow-2xl bg-gradient-to-br from-gray-300 via-white to-gray-300 border-double border rounded-md">
              <div className="col-span-1">
                <div className="p-5">
                  <h2 className="text-xl font-medium text-gray-900">{t('Client.NewNote')}</h2>
                  <p className="mt-1 text-sm text-gray-600">{t('Client.NoteLegend')}</p>
                </div>
              </div>
              <div className="m-4 col-span-2 ">
                <div className="shadow overflow-hidden rounded-md rounded-b-md">
                  <div className="p-6 bg-transparent">
                    <div className="grid grid-cols-6 gap-3">
                      <div className="col-span-6">
                        <label className="text-sm font-medium text-gray-700 pl-2 pt-2">
                          {t('Client.NoteLabel')}
                          {content.params.value.length > 1 ? (
                            <span className="pl-1 text-xs text-gray-400 font-normal">{`(${content.params.value.length}/500)`}</span>
                          ) : (
                            <span className="pl-1 text-xs text-red-300 font-normal">{`(${content.params.value.length}/2 min)`}</span>
                          )}
                        </label>
                        <textarea
                          name="height"
                          id="web-content"
                          rows="10"
                          minLength="2"
                          maxLength="500"
                          placeholder="2 characters minimum"
                          {...content.params}
                          className="text-area"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-400 text-right md:px-6">
                    <button type="button" id="web-saveNote" onClick={handleSaveNote} className="buttons-web">
                      {t('ButtonLabel.Save')}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <h3 className="text-center text-xl font-semibold pt-4 pb-2 border-t ">{t('Client.NotesLabel')}</h3>
                <div className="pl-32 pr-32 pt-4 pb-4">
                  {client.notes.length > 0 ? (
                    client.notes.map((note, i) => (
                      <Note
                        key={i}
                        handleRemoveNote={handleRemoveNote}
                        handleUpdateNote={handleUpdateNote}
                        note={note}
                        view="web"
                      />
                    ))
                  ) : (
                    <h3 className="text-center text-xl font-semibold p-4">{t('Client.NoNotes')}</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Client
