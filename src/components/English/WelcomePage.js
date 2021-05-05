import React from 'react'

const WelcomePage = () => {
  const exercise = null

  if (!exercise) {
    return (
      <div className="justify-center items-center flex outline-none bg-gray-100 min-h-screen p-60">
        <p className="pr-2 text-center" >
          Welcome to Jane Wellness App, we are working hard to bring the best experience possible for you
          and your journey to a healthy body, mind and soul.
        </p>
      </div>

    )
  }
  return (
    <div>
      <div className="bg-gray-100 min-h-screen pt-28">
        Exercise Library
      </div>
    </div>
  )
}

export default WelcomePage