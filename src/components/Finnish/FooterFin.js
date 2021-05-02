import React, { useState } from 'react'
import facebook from '../../img/f-icon.jpg'

const FooterFin = () => {

  return (
    < div className="relative inset-x-0 bottom-0 justify-items-auto md:justify-items-auto bg-gray-900">
      <div className="flex items-center justify-items-center px-4 py-5 bg-gray-500">
        <div className="container px-auto mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a className="text-sm font-bold text-gray-200" href="#" >Verkkosivusto rakenteilla</a>
          </div>
          <div className="md:flex md:flex-grow items-center" id="example-collapse-navbar">
            <ul className="flex flex-row ml-auto md:flex-row list-none md:ml-auto">
              <li className="nav-item flex flex-row md:flex-row">
                <a className="fb-like px-1 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-200 hover:opacity-75"
                  href="https://www.facebook.com/janestotalwellness/" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg><span className="ml-2">LIKE</span>
                </a>
                <p className="px-1 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-200 hover:opacity-75">{'& '}</p>
                <a className="pl-0 px-0 py-0 flex items-center text-xs uppercase font-bold leading-snug text-gray-200 hover:opacity-75 fb-xfbml-parse-ignore"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Fjanestotalwellness%2F&amp;src=sdkpreparse"
                  target="_blank" data-layout="button_count" >
                  <img className="relative h-5 w-5 rounded-full" src={facebook} alt="Workflow" />
                  <i className="fb-share-button text-lg leading-lg text-gray-200 opacity-75"></i><span className="ml-1">JAA</span>
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-200 hover:opacity-75" href="#pablo">
                  <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">IG</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterFin