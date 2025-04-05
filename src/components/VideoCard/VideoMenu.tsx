'use client'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FC, MouseEvent, useState } from 'react'
import { MenuItem, IconButton, Typography, Menu } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query'
import { QVideos } from '../../interfaces/Video'
import { useAuth } from '../../contexts/auth'

interface Props {
  id: number
  isInWL: boolean
}

const VideoMenu: FC<Props> = ({ id, isInWL }) => {
  const { authenticate } = useAuth()
  const queryClient = useQueryClient()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const { mutate: addToWL, isPending: isAdding } = useMutation({
    mutationFn: () => axios.post(`/api/watchlater/${id}`),
    onSuccess: () => {
      updateIsInWL()
      toast.dark('Saved to Watch Later', {
        position: 'bottom-left',
        hideProgressBar: true,
      })
    },
  })
  const { mutate: removeFromWL, isPending: isDeleting } = useMutation({
    mutationFn: () => axios.delete(`/api/watchlater/${id}`),
    onSuccess: () => {
      updateIsInWL()
      toast.dark('Removed from Watch Later', {
        position: 'bottom-left',
        hideProgressBar: true,
      })
    },
  })

  function updateIsInWL() {
    queryClient.setQueryData<InfiniteData<QVideos>>(['/api/videos'], data => ({
      pages:
        data?.pages.map(page => ({
          ...page,
          items: page.items.map(video =>
            video.id === id ? { ...video, isInWL: !isInWL } : video
          ),
        })) ?? [],
      pageParams: data?.pageParams ?? [],
    }))
  }

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  function handleMenuItemClick(fn: any) {
    const run = authenticate(fn)
    run()
    closeMenu()
  }

  return (
    <>
      <IconButton onClick={openMenu} edge='end'>
        <MoreVertIcon
          className='text-primary'
          style={{ width: '20px', height: '20px' }}
        />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        elevation={1}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem
          onClick={() => handleMenuItemClick(isInWL ? removeFromWL : addToWL)}
          disabled={isDeleting || isAdding}
        >
          <>
            {isInWL ? (
              <DeleteIcon className='mr-3 text-secondary' fontSize='small' />
            ) : (
              <WatchLaterIcon
                className='mr-3 text-secondary'
                fontSize='small'
              />
            )}
          </>
          <Typography variant='inherit'>
            {isInWL ? 'Remove from Watch later' : 'Save to Watch later'}
          </Typography>
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <PlaylistAddIcon className='mr-3 text-secondary' fontSize='small' />
          <Typography variant='inherit'>Save to playlist</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default VideoMenu
