'use client'
import { useState } from 'react'
import SearchDialog from './SearchDialog'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <div>
      <IconButton onClick={open}>
        <SearchIcon />
      </IconButton>
      <SearchDialog isOpen={isOpen} close={close} />
    </div>
  )
}
