import { FC } from 'react'
import { __PROD__ } from '../../config'

const VideoPlayer: FC<any> = props => (
  <video style={{ width: '100%' }} autoPlay={__PROD__} controls {...props} />
)

export default VideoPlayer
