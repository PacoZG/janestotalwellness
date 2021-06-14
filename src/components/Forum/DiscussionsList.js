import React from 'react'
import Discussion from './Discussion'
import { useTranslation } from 'react-i18next'

const DiscussionList = ({ discussions }) => {
  const { t } = useTranslation()
  return (
    <div>
      <div>
        {discussions.map(discussion => (
          <Discussion key={discussion.id} discussion={discussion} />
        ))}
      </div>
      <div>
        {discussions.length === 0 ? (
          <div className="flex flex-row items-center justify-around h-screen">
            <h1 className="text-center text-xl text-gray-500 shadow-md rounded-3xl bg-opacity-0 p-6">
              {t('Salon.NoDiscussionsFound')}
            </h1>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DiscussionList
