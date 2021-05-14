import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getDate } from '../utils/helper'
import { useField } from '../hooks/index'

const Note = ({ note, handleRemoveNote, handleUpdateNote, view }) => {
  const { t } = useTranslation()
  const [visibleNote, setVisibleNote] = useState(false)
  const showNote = { display: visibleNote ? '' : 'none' }
  const [update, setToUpdate] = useState(false)
  const newContent = useField('text')

  const handleNoteUpdate = () => {
    handleUpdateNote(newContent.params.value, note.id)
    setToUpdate(!update)
    newContent.reset()
  }

  if (view === 'web') {
    return (
      <div className="border rounded-md m-2">
        <div className="flex items-center justify-between border-b pl-3">
          <p className="text-base text-gray-500">{getDate(note.date)}</p>
          <button
            className="inline-flex justify-center mr-3 m-1 py-1 px-3 border border-white shadow-sm rounded-md
                          bg-gray-500 text-sm text-white hover:bg-gray-400 focus-within:outline-none"
            onClick={() => setVisibleNote(!visibleNote)}
            id="show-note"
          >
            {visibleNote ? t('ButtonLabel.HideNote') : t('ButtonLabel.ShowNote')}
          </button>
        </div>
        <div style={showNote}>
          <p className="p-2 pl-3 text-justify">{note.content}</p>
          {update ? (
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
          ) : null}
          <div>
            {update ? (
              <div className="px-3 py-2 bg-gray-400 text-right rounded-b-md space-x-2">
                <button
                  type="button"
                  id="web-cancelUpdate"
                  onClick={() => setToUpdate(!update)}
                  className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm font-medium rounded-md
                          bg-gray-500 text-sm text-white hover:bg-gray-400 focus-within:outline-none focus-within:ring-1"
                >
                  {t('ButtonLabel.Cancel')}
                </button>
                <button
                  type="button"
                  id="web-saveUpdate"
                  onClick={handleNoteUpdate}
                  className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm font-medium rounded-md
                          bg-gray-500 text-sm text-white hover:bg-gray-400 focus-within:outline-none focus-within:ring-1"
                >
                  {t('ButtonLabel.Save')}
                </button>
              </div>
            ) : (
              <div className="px-3 py-2 bg-gray-400 text-right rounded-b-md space-x-2">
                <button
                  type="button0"
                  id="web-deleteNote"
                  onClick={() => handleRemoveNote(note.id)}
                  className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm font-medium rounded-md
                          bg-gray-500 text-sm text-white hover:bg-gray-400 focus-within:outline-none focus-within:ring-1"
                >
                  {t('ButtonLabel.Delete')}
                </button>
                <button
                  type="button"
                  id="web-updateNote"
                  onClick={() => setToUpdate(!update)}
                  className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm font-medium rounded-md
                          bg-gray-500 text-sm text-white hover:bg-gray-400 focus-within:outline-none focus-within:ring-1"
                >
                  {t('ButtonLabel.Update')}
                </button>
              </div>
            )}
          </div>
        </div>
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
                className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm font-medium rounded-md
                bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1"
              >
                {t('ButtonLabel.Cancel')}
              </button>
              <button
                type="button"
                id="mobile-updateNote"
                onClick={handleNoteUpdate}
                className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm font-medium rounded-md
                  bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1"
              >
                {t('ButtonLabel.Save')}
              </button>
            </div>
          ) : (
            <div className="px-3 py-2 bg-gray-400 text-right rounded-b-sm space-x-2">
              <button
                type="button"
                id="mobile-removeNote"
                onClick={() => handleRemoveNote(note.id)}
                className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm font-medium rounded-md
                  bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1"
              >
                {t('ButtonLabel.Delete')}
              </button>
              <button
                type="button"
                id="mobile-updateNote"
                onClick={() => setToUpdate(!update)}
                className="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm font-medium rounded-md
                  bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1"
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
