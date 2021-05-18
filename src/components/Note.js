import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useField } from '../hooks/index'
import { Transition } from '@tailwindui/react'

const Note = ({ note, handleRemoveNote, handleUpdateNote, view }) => {
  const { t } = useTranslation()
  const [visibleNote, setVisibleNote] = useState(false)
  const showNote = { display: visibleNote ? '' : 'none' }
  const [update, setToUpdate] = useState(false)
  const newContent = useField('text')

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

  const handleNoteUpdate = () => {
    handleUpdateNote(newContent.params.value, note.id)
    setToUpdate(!update)
    newContent.reset()
  }

  if (view === 'web') {
    return (
      <div className="border rounded-md m-2">
        <div className="flex items-center justify-between border-b pl-3 p-2">
          <p className="text-base text-gray-500">{getDate(note.date)}</p>
          <button className="buttons-web" onClick={() => setVisibleNote(!visibleNote)} id="show-note">
            {visibleNote ? t('ButtonLabel.HideNote') : t('ButtonLabel.ShowNote')}
          </button>
        </div>
        <Transition
          show={visibleNote}
          enter="transition-opacity duration-75 duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            <p className="p-2 pl-3 text-justify">{note.content}</p>

            <Transition
              show={update}
              enter="transition-opacity duration-75 duration-1000"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <textarea
                name="height"
                id="web-aditContent"
                rows="10"
                minLength="2"
                maxLength="500"
                placeholder="2 characters minimum"
                {...newContent.params}
                className="h-28 block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full p-2 pl-3 text-sm placeholder-gray-200"
              />
              <div className="px-3 py-2 bg-gray-400 text-right rounded-b-md space-x-2">
                <button
                  type="button"
                  id="web-cancelUpdate"
                  onClick={() => setToUpdate(!update)}
                  className="buttons-web"
                >
                  {t('ButtonLabel.Cancel')}
                </button>
                <button type="button" id="web-saveUpdate" onClick={handleNoteUpdate} className="buttons-web">
                  {t('ButtonLabel.Save')}
                </button>
              </div>
            </Transition>
            <Transition
              show={!update}
              enter="transition-opacity duration-75 duration-1000"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="px-3 py-2 bg-gray-400 text-right rounded-b-md space-x-2">
                <button
                  type="button0"
                  id="web-deleteNote"
                  onClick={() => handleRemoveNote(note.id)}
                  className="buttons-web"
                >
                  {t('ButtonLabel.Delete')}
                </button>
                <button type="button" id="web-updateNote" onClick={() => setToUpdate(!update)} className="buttons-web">
                  {t('ButtonLabel.Update')}
                </button>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>
    )
  }

  if (view === 'mobile') {
    return (
      <div className=" border rounded-sm shadow-sm mt-2">
        <div className="flex items-center justify-between border-b">
          <p className="text-base text-gray-400 pl-2">{getDate(note.date)}</p>
          <button
            className="inline-flex justify-center pl-3 pr-3 py-1 m-2 w-auto border border-white shadow-sm rounded-md
                          bg-gray-500 text-sm text-white hover:bg-gray-400 focus-within:outline-none"
            onClick={() => setVisibleNote(!visibleNote)}
          >
            {update ? t('ButtonLabel.HideNote') : t('ButtonLabel.ShowNote')}
          </button>
        </div>
        <div style={showNote}>
          <p className="p-2 text-justify">{note.content}</p>
          {update ? (
            <textarea
              name="height"
              id="mobile-editContent"
              rows="10"
              minLength="2"
              maxLength="500"
              placeholder="2 characters minimum"
              {...newContent.params}
              className="h-24 block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full p-2 text-sm placeholder-gray-200"
            />
          ) : null}
          {update ? (
            <div className="px-3 py-2 bg-gray-400 text-right rounded-b-sm space-x-2">
              <button
                type="button"
                id="mobile-removeNote"
                onClick={() => setToUpdate(!update)}
                className="buttons-mobile"
              >
                {t('ButtonLabel.Cancel')}
              </button>
              <button type="button" id="mobile-updateNote" onClick={handleNoteUpdate} className="buttons-mobile">
                {t('ButtonLabel.Save')}
              </button>
            </div>
          ) : (
            <div className="px-3 py-2 bg-gray-400 text-right rounded-b-sm space-x-2">
              <button
                type="button"
                id="mobile-removeNote"
                onClick={() => handleRemoveNote(note.id)}
                className="buttons-mobile"
              >
                {t('ButtonLabel.Delete')}
              </button>
              <button
                type="button"
                id="mobile-updateNote"
                onClick={() => setToUpdate(!update)}
                className="buttons-mobile"
              >
                {t('ButtonLabel.Update')}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Note
