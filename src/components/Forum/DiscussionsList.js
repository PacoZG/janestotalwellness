import React from 'react'
import Discussion from './Discussion'

const DiscussionList = ({ discussions }) => {
  return (
    <div>
      {discussions.map((discussion, i) => (
        <Discussion key={i} discussion={discussion} />
      ))}
    </div>
  )
}

export default DiscussionList
