'use client'
import { FC } from 'react'
import { __PROD__ } from '../../config'

const VideoPlayer: FC<any> = props => (
  <video
    style={{ width: '100%' }}
    className='rounded-xl'
    autoPlay
    controls
    {...props}
  />
)

export default VideoPlayer
