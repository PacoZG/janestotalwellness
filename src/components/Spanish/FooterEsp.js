import React, { useState } from 'react'
import facebook from '../../img/f-icon.jpg'

const Footer = () => {

  return (
    < div className="relative inset-x-0 bottom-0 px-5 py-14 bg-gray-500">
      <div className="container flex flex-col md:flex-row items-center">
        <div className="flex items-center">
          <a className="text-sm font-bold text-gray-200" href="#" >Sítio web en construcción</a>
        </div>
        <div className="flex flex-row md:flex md:flex-grow items-center " id="like-share">
          <ul className="md:ml-auto">
            <li className="nav-item flex flex-row md:flex-row">
              <a className="px-2 py-3 flex items-center text-xs uppercase font-bold leading-snug text-gray-200 hover:opacity-75"
                href="https://www.facebook.com/janestotalwellness/" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg><span className="ml-2">LIKE</span>
              </a>
              <p className="pr-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-200 hover:opacity-75">{'& '}</p>
              <a className="pl-0 px-0 py-0 flex items-center text-xs uppercase font-bold leading-snug text-gray-200 hover:opacity-75 fb-xfbml-parse-ignore"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Fjanestotalwellness%2F&amp;src=sdkpreparse"
                data-layout="button_count" >
                <img className="relative h-5 w-5 md:h-7 md:w-7 rounded-full" src={facebook} alt="Workflow" />
                <i className="text-lg leading-lg text-gray-200 opacity-75"></i><span className="ml-1">SHARE</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer