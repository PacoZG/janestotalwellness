import React from 'react'

const ExerciseLibrary = () => {
  const exercise = null

  if (!exercise) {
    return (
      <div className="justify-center items-center flex outline-none bg-gray-100 min-h-screen pt-22">
        <div className="flex flex-row items-center justify-around h-screen">
          <h1 className="text-center text-xl text-gray-500 shadow-md rounded-3xl bg-opacity-0 p-6">
            Page under construction
          </h1>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="bg-gray-100 min-h-screen pt-28">Exercise Library</div>
    </div>
  )
}

export default ExerciseLibrary
