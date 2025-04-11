'use client'
import { FC, useState } from 'react'
import { Typography, Button, Paper, useTheme, ButtonBase } from '@mui/material'
import numberWithCommas from '@/lib/numberWithCommas'
import dateformat from 'dateformat'
import { grey } from '@mui/material/colors'

interface Props {
  text: string
  views: number
  uploadedAt: string
}

const VideoDescription: FC<Props> = ({ text, views, uploadedAt }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const shortLength = 160

  const MainBody = (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: grey[200],
        borderRadius: '8px',
        padding: '0.8rem 1rem',
        width: '100%',
      }}
    >
      <div className='flex flex-col space-y-3'>
        <div className='flex items-start space-x-2'>
          <Typography variant='subtitle2'>
            {numberWithCommas(views)} views
          </Typography>
          &nbsp;&nbsp;
          <Typography variant='subtitle2'>
            {dateformat(new Date(uploadedAt), 'dd-mmm-yyyy')}
          </Typography>
        </div>
      </div>
      <Typography variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
        {isExpanded ? text : `${text.substring(0, shortLength)}...`}
      </Typography>
      {isExpanded && (
        <Button
          disableRipple
          onClick={() => setIsExpanded(false)}
          sx={{
            marginTop: '1rem',
            textTransform: 'none',
            color: 'black',
            padding: 0,
          }}
        >
          Show less
        </Button>
      )}
    </Paper>
  )

  return isExpanded ? (
    MainBody
  ) : (
    <ButtonBase
      color='inherit'
      sx={{ minWidth: '100%', textAlign: 'left' }}
      onClick={() => setIsExpanded(true)}
    >
      {MainBody}
    </ButtonBase>
  )
}

export default VideoDescription
