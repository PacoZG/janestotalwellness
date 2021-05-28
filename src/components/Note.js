import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Transition } from '@tailwindui/react'

const Note = ({ note, handleRemoveNote, handleUpdateNote, view }) => {
  const { t } = useTranslation()
  const [visibleNote, setVisibleNote] = useState(false)
  const [update, setToUpdate] = useState(false)
  const [textareaState, setTextAreaState] = useState(note.content)

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

  const handleTextareaChange = event => {
    event.preventDefault()
    setTextAreaState(event.target.value)
  }

  const handleNoteUpdate = () => {
    handleUpdateNote(textareaState, note.id)
    setToUpdate(!update)
  }

  if (view === 'web') {
    return (
      <div className="border rounded-md m-2">
        <div className="flex items-center justify-between bg-gray-200 shadow-md rounded-t-md border-b pl-3 p-2">
          <p className="text-base text-black">{getDate(note.date)}</p>
          <button className="buttons-web" onClick={() => setVisibleNote(!visibleNote)} id="show-note">
            {visibleNote ? t('ButtonLabel.HideNote') : t('ButtonLabel.ShowNote')}
          </button>
        </div>
        <Transition
          show={visibleNote}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            {!update ? (
              <div>
                <p className="p-2 pl-3 text-justify">{note.content}</p>
                <div className="px-3 py-2 bg-gray-400 text-right rounded-b-md space-x-2">
                  <button
                    type="button"
                    id="web-deleteNote"
                    onClick={() => handleRemoveNote(note.id)}
                    className="buttons-web"
                  >
                    {t('ButtonLabel.Delete')}
                  </button>
                  <button
                    type="button"
                    id="web-updateNote"
                    onClick={() => setToUpdate(!update)}
                    className="buttons-web"
                  >
                    {t('ButtonLabel.Update')}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <textarea
                  className="h-16 block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full p-2 pl-3 text-sm placeholder-gray-200"
                  id="web-aditContent"
                  minLength="2"
                  maxLength="500"
                  placeholder="2 characters minimum"
                  value={textareaState}
                  onChange={handleTextareaChange}
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
              </div>
            )}
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
          <button className="buttons-mobile" onClick={() => setVisibleNote(!visibleNote)}>
            {visibleNote ? t('ButtonLabel.HideNote') : t('ButtonLabel.ShowNote')}
          </button>
        </div>
        <Transition
          show={visibleNote}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            {update ? (
              <div>
                <p className="p-2 text-justify">{note.content}</p>
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
              </div>
            ) : (
              <div>
                <textarea
                  className="h-16 block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full p-2 text-sm placeholder-gray-200"
                  id="mobile-editContent"
                  minLength="2"
                  maxLength="500"
                  placeholder="2 characters minimum"
                  value={textareaState}
                  onChange={handleTextareaChange}
                />
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
              </div>
            )}
          </div>
        </Transition>
      </div>
    )
  }
}

export default Note
