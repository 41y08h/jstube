'use client'
import { useAuth } from '@/contexts/auth'
import MultilineInput from '../MultilineInput'
import { grey } from '@mui/material/colors'
import { FC, FormEventHandler, RefObject, useState } from 'react'
import { Button, inputBaseClasses, TextField, useTheme } from '@mui/material'
import Avatar from '../Avatar'

interface Props {
  onSubmit: FormEventHandler
  isFormActive: Boolean
  toggleForm: (t: boolean) => void
  inputRef: RefObject<HTMLTextAreaElement | undefined>
}

const CommentForm: FC<Props> = ({
  onSubmit,
  isFormActive,
  toggleForm,
  inputRef,
}) => {
  const { user } = useAuth()
  const [text, setText] = useState('')

  return (
    <form onSubmit={onSubmit}>
      <div className='flex space-x-4'>
        <Avatar src={user?.picture} alt={user?.name} />
        <MultilineInput
          fullWidth
          required
          inputRef={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onClick={() => toggleForm(true)}
          placeholder='Add a public comment...'
        />
      </div>
      {isFormActive && (
        <div className='flex justify-end mt-3'>
          <Button
            variant='text'
            color='inherit'
            sx={{
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              textTransform: 'none',
              color: grey[600],
              '&:hover': {
                backgroundColor: grey[200],
              },
              marginRight: '12px',
            }}
            onClick={() => toggleForm(false)}
          >
            Cancel
          </Button>
          <Button
            disableElevation
            disabled={!text}
            variant='contained'
            color='primary'
            type='submit'
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
            }}
          >
            Comment
          </Button>
        </div>
      )}
    </form>
  )
}

export default CommentForm
