import React from 'react'

const Input = ({ params, label, placeholder, min, max }) => {

  return (
    <div className="mt-8 relative">
      <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">{label}</span>
      <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent"
        placeholder={placeholder}
        {...params}
        min={min} max={max}
      />
    </div>
  )
}

export default Input