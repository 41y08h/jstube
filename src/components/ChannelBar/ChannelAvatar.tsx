import { FC } from 'react'
import Link from 'next/link'
import User from '../../interfaces/User'
import Image from 'next/image'

interface Props {
  channel: User
}

const ChannelAvatar: FC<Props> = ({ channel }) => {
  return (
    <Link href={`/channel/${channel.id}`}>
      <a className='h-12 w-12 rounded-full overflow-hidden'>
        <Image
          className='object-cover w-full h-full'
          src={channel.picture || ''}
          alt={channel.name}
        />
      </a>
    </Link>
  )
}

export default ChannelAvatar
