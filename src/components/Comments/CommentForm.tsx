'use client'
import { useAuth } from '@/contexts/auth'
import MultilineInput from '../MultilineInput'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@material-ui/core'
import {
  FC,
  FormEventHandler,
  useState,
  RefObject,
  useMemo,
  useEffect,
} from 'react'
import { Avatar, Button } from '@mui/material'

interface Props {
  onSubmit: FormEventHandler
  isFormActive: Boolean
  toggleForm: (t: boolean) => void
  inputRef: RefObject<HTMLTextAreaElement | undefined>
}

const useStyles = makeStyles(theme => ({
  avatar: { width: '2rem', height: '2rem' },
  input: {
    ...theme.typography.body2,
    backgroundColor: grey[200],
    padding: '0.8rem',
    width: '100%',
    borderRadius: 6,
  },
}))

const CommentForm: FC<Props> = ({
  onSubmit,
  isFormActive,
  toggleForm,
  inputRef,
}) => {
  const { user } = useAuth()
  const classes = useStyles()

  return (
    <form onSubmit={onSubmit}>
      <div className='flex space-x-4'>
        <Avatar
          className={classes.avatar}
          src={user?.picture}
          alt={user?.name}
        />
        <MultilineInput
          required
          inputRef={inputRef}
          onClick={() => toggleForm(true)}
          className={classes.input}
          placeholder='Add a public comment...'
        />
      </div>
      {isFormActive && (
        <div className='flex justify-end pt-3 space-x-2'>
          <Button color='secondary' onClick={() => toggleForm(false)}>
            Cancel
          </Button>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            disableElevation
          >
            Comment
          </Button>
        </div>
      )}
    </form>
  )
}

export default CommentForm
