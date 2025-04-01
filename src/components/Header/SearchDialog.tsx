import React from 'react'
import {
  AppBar,
  Dialog,
  IconButton,
  Input,
  Slide,
  Toolbar,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  isOpen: boolean
  close(): any
}

const SearchDialog: React.FC<Props> = ({ isOpen, close }) => {
  return (
    <div>
      <Dialog fullScreen open={isOpen} onClose={close}>
        <AppBar
          sx={{ position: 'relative', backgroundColor: 'white' }}
          elevation={1}
          color='inherit'
        >
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={close}
              aria-label='close'
            >
              <ArrowBackIcon />
            </IconButton>
            <Input
              autoFocus
              type='search'
              disableUnderline
              placeholder='Search JsTube'
              className='w-full border-b-0'
              inputProps={{ 'aria-label': 'description' }}
            />
            <IconButton
              edge='end'
              color='inherit'
              onClick={close}
              aria-label='closearchse'
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  )
}

export default SearchDialog
