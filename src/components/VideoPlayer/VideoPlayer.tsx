'use client'
import { DetailedHTMLProps, FC, VideoHTMLAttributes } from 'react'

const VideoPlayer: FC<
  DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
> = props => (
  <video
    style={{ width: '100%' }}
    className='rounded-xl'
    autoPlay
    controls
    {...props}
  />
)

export default VideoPlayer
