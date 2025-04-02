'use client'
import { FC, useState } from 'react'
import { Typography, Button } from '@mui/material'

interface Props {
  text: string
}

const VideoDescription: FC<Props> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const shortLength = 160

  return (
    <div>
      <Typography variant='body2'>
        {isExpanded ? text : `${text.substring(0, shortLength)}...`}
      </Typography>
      <Button
        onClick={() => setIsExpanded(prev => !prev)}
        color='secondary'
        disableRipple
        sx={{ paddingLeft: 0, marginTop: '1rem', textTransform: 'none' }}
      >
        Show {isExpanded ? 'less' : 'more'}
      </Button>
    </div>
  )
}

export default VideoDescription
