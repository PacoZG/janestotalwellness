import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import facebook from '../img/f-icon.jpg'
import { FacebookShareButton, FacebookShareCount, FacebookIcon, LinkedinIcon } from 'react-share'
import CookiesBanner from './CookiesBanner'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <div className="relative inset-x-0 bottom-0 z-30 p-4 pt-3 pb-3 bg-gray-600">
      <div className="text-center">
        <FacebookShareCount url={window.location.href}>
          {shareCount => <span className="text-2xl text-black">{console.log('SHARE COUNT: ', shareCount)}</span>}
        </FacebookShareCount>
        <FacebookShareButton
          url={window.location.href}
          className="inline-flex justify-center py-1 px-3 -ml-4 font-medium focus-within:outline-none "
        >
          <FacebookIcon size={20} round={true} />
          <span className="text-gray-200 text-xs font-semibold pt-0.5 pl-1">{t('Footer.SharePage')}</span>
        </FacebookShareButton>
      </div>
      <p className="text-sm font-bold text-gray-200 text-center pb-4">{t('Footer.UnderConst')}</p>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-2 md:space-y-0 md:p-2">
        <div className="flex flex-col items-center  md:items-start space-y-2">
          <h1 className="text-gray-200 text-base">
            <i>
              <strong>Jane&lsquo;s Total Wellness</strong>
            </i>
          </h1>
          <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-0 ">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-gray-200"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-200 text-sm">Myllärintanhua 6 J 35</p>
            </div>
            <p className="text-gray-200 text-sm md:pl-4">00920, Helsinki</p>
          </div>
          <div className="flex space-x-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-200 text-sm space-y-2 md:space-y-0 ">0449 910910</p>
          </div>
          <div className="flex space-x-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <p className="text-gray-200 text-sm space-y-2 md:space-y-0 ">jane.pokkinen@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start space-y-1">
          <Link to={'/terms'} target="blank" className="hover:text-gray-400 text-gray-200 text-sm">
            {t('Footer.Terms')}
          </Link>
          <Link to="/codeofconduct" target="blank" className="hover:text-gray-400 text-gray-200 text-sm">
            {t('Footer.Code')}
          </Link>
          <p className="text-sm text-gray-200">Developed by: </p>
          <a
            href="https://www.linkedin.com/in/francisco-zavala"
            target="blank"
            className="hover:text-gray-400 text-gray-200 text-sm"
          >
            <p className="flex items-center space-x-1">
              <LinkedinIcon size={28} round={true} />
              <p>{' Francisco Zavala'}</p>
            </p>
          </a>
        </div>
        <div className="flex flex-col items-center" id="like-share">
          <li className="flex flex-row">
            <a
              className="flex items-center px-2 text-xs uppercase font-bold leading-snug text-gray-200 hover:text-gray-400"
              target="blank"
              href="https://www.facebook.com/janestotalwellness/"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span className="ml-2 text-xs font-semibold">LIKE</span>
            </a>
            <p className="pr-2 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-200 ">
              {'& '}
            </p>
            <a
              className="pl-0 px-0 py-0 flex items-center text-xs uppercase font-bold leading-snug text-gray-200 hover:text-gray-400 fb-xfbml-parse-ignore"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Fjanestotalwellness%2F&amp;src=sdkpreparse"
              target="blank"
              data-layout="button_count"
            >
              <img className="h-6 w-6 md:h-7 md:w-7 rounded-full" src={facebook} alt="Workflow" />
              <span className="ml-1 text-xs font-semibold">{t('Footer.ShareFB')}</span>
            </a>
          </li>
          <div className="flex items-center justify-center ">
            <FacebookShareCount url={window.location.origin}>
              {shareCount => <span className="text-2xl text-black">{console.log('SHARE COUNT: ', shareCount)}</span>}
            </FacebookShareCount>
            <FacebookShareButton
              url={window.location.origin}
              className="inline-flex justify-center py-1 px-3 -ml-4 font-medium focus-within:outline-none "
            >
              <FacebookIcon size={28} round={true} />
              <span className="text-gray-200 text-xs font-semibold pt-1 pl-1">{t('Footer.ShareWebsite')}</span>
            </FacebookShareButton>
          </div>
          <Link to={'/about'} className="hover:text-gray-400 text-gray-200 text-sm">
            {t('Footer.About')}
          </Link>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <CookiesBanner />
        </div>
      </div>
    </div>
  )
}

export default Footer
