import { useState } from 'react'
import Replies from '../components/Replies'

export default function StoryBook() {
  const [isViewingReplies, setIsViewingReplies] = useState(false)
  const toggleRepliesView = () => setIsViewingReplies(old => !old)

  const [total, setTotal] = useState(4)

  return (
    <div className='p-4'>
      <button
        className='text-blue-600 text-sm font-medium tracking-wide'
        onClick={() => toggleRepliesView()}
      >
        {isViewingReplies
          ? `◤ Hide ${total} replies`
          : `◢ View ${total} replies`}
      </button>
      {isViewingReplies && <Replies commentId={368} setTotal={setTotal} />}
    </div>
  )
}
