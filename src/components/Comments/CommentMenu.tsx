import { FC, useState, MouseEvent } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButton, Menu } from '@mui/material'

interface Props {
  children: React.ReactNode
}

const CommentMenu: FC<Props> = ({ children }) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const toggleMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElement(anchorElement => {
      const alreadyOpen = Boolean(anchorElement)
      return alreadyOpen ? null : event?.currentTarget
    })

  const isOpen = Boolean(anchorElement)

  return (
    <div>
      <IconButton size='small' edge='end' onClick={toggleMenu}>
        <MoreVertIcon style={{ width: '20px', height: '20px' }} />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        elevation={1}
        onClose={toggleMenu}
      >
        {children}
      </Menu>
    </div>
  )
}

export default CommentMenu
