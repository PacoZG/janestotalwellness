import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FacebookShareButton, FacebookShareCount, FacebookIcon, LinkedinIcon } from 'react-share'
import CookiesBanner from './CookiesBanner'
import { AtSymbolIcon, ShareIcon, QuestionMarkCircleIcon, ThumbUpIcon } from '@heroicons/react/solid'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <div className="relative inset-x-0 bottom-0 z-30 p-4 pt-3 pb-3 bg-gray-600">
      <p className="font-bold text-gray-200 text-center pb-2">{t('Footer.UnderConst')}</p>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-2 md:space-y-0 md:p-2">
        <div className="flex flex-col items-center  md:items-start space-y-2">
          <h1 className="text-gray-200 text-base">
            <i>
              <strong>{t('Contact')}</strong>
            </i>
          </h1>
          <div className="flex space-x-1 items-center">
            <AtSymbolIcon className="h-4 w-4 text-gray-200" />
            <a
              className="hover:text-gray-400 text-gray-200 text-sm space-y-2 md:space-y-0 "
              href="mailto:contact@janestotalwellness.com"
              target="blank"
            >
              contact@janestotalwellness.com
            </a>
          </div>
          <div className="flex space-x-1 items-center">
            <QuestionMarkCircleIcon className="h-4 w-4 text-gray-200" />
            <Link to={'/about'} className="hover:text-gray-400 text-gray-200 text-sm">
              {t('Footer.About')}
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start space-y-1">
          <FacebookShareButton
            url={window.location.href}
            className="flex items-center justify-center py-1 px-3 -ml-4 font-medium focus-within:outline-none "
          >
            <ShareIcon className="h-5 w-5 text-gray-200" />
            <span className="text-gray-200 text-xs font-semibold pt-0.5 pl-1">{t('Footer.SharePage')}</span>
          </FacebookShareButton>
          <Link to={'/terms'} target="blank" className="hover:text-gray-400 text-gray-200 text-sm">
            {t('Footer.Terms')}
          </Link>
          <Link to="/codeofconduct" target="blank" className="hover:text-gray-400 text-gray-200 text-sm">
            {t('Footer.Code')}
          </Link>
        </div>
        <div className="flex flex-col items-center" id="like-share">
          <div className="flex flex-row items-center gap-2">
            <a
              className="flex items-center gap-1 text-xs uppercase font-bold leading-snug text-gray-200 hover:text-gray-400"
              target="blank"
              href="https://www.facebook.com/janestotalwellness/"
            >
              <ThumbUpIcon className="h-5 w-5" />
              <span className="text-xs font-semibold">LIKE</span>
            </a>
            <p className="flex items-center text-sm uppercase font-bold text-gray-200 ">{'& '}</p>
            <a
              className="pl-0 px-0 py-0 flex items-center text-xs uppercase font-bold text-gray-200 hover:text-gray-400"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Fjanestotalwellness%2F&amp;src=sdkpreparse"
              target="blank"
              data-layout="button_count"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              <span>{'SHARE'}</span>
            </a>
            <p className="text-xs text-gray-200 font-semibold ">{t('Footer.ShareFB')}</p>
            <FacebookIcon size={22} round={true} />
            <p className="text-xs text-gray-200 font-semibold h-4 w-4 ">PAGE</p>
          </div>
          <div className="flex items-center justify-center ">
            <FacebookShareCount url={window.location.origin}>
              {shareCount => <span className="text-2xl text-black">{console.log('SHARE COUNT: ', shareCount)}</span>}
            </FacebookShareCount>
            <FacebookShareButton
              url={window.location.origin}
              className="flex items-center justify-center py-1 px-3 -ml-4 font-medium focus-within:outline-none "
            >
              <ShareIcon className="h-5 w-5 text-gray-200" />
              <span className="text-gray-200 text-xs font-semibold pt-1 pl-1">{t('Footer.ShareWebsite')}</span>
              <FacebookIcon size={22} round={true} />
            </FacebookShareButton>
          </div>
        </div>
        <div className="absolute right-3 bottom-3">
          <CookiesBanner />
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 pt-3">
        <p className="text-sm text-gray-200">Developed by: </p>
        <a
          href="https://www.linkedin.com/in/francisco-zavala"
          target="blank"
          className="hover:text-gray-400 text-gray-200 text-sm"
        >
          <div className="flex items-center space-x-1">
            <LinkedinIcon size={22} round={true} />
            <p>{' Francisco Zavala'}</p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Footer
