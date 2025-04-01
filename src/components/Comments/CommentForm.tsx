import { useAuth } from 'contexts/Auth'
import MultilineInput from '../MultilineInput'
import grey from '@material-ui/core/colors/grey'
import { makeStyles, Avatar, Button } from '@material-ui/core'
import { FC, FormEventHandler, useState, RefObject } from 'react'

interface Props {
  onSubmit: FormEventHandler
  inputRef: RefObject<HTMLTextAreaElement>
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

const CommentForm: FC<Props> = ({ onSubmit, inputRef }) => {
  const { user } = useAuth()
  const classes = useStyles()
  const [isFormActive, setIsFormActive] = useState(false)

  const activateForm = () => setIsFormActive(true)
  const deactivateForm = () => {
    const input = inputRef.current as HTMLTextAreaElement
    input.value = ''

    setIsFormActive(false)
  }

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
          onClick={activateForm}
          className={classes.input}
          placeholder='Add a public comment...'
        />
      </div>
      {isFormActive && (
        <div className='flex justify-end pt-3 space-x-2'>
          <Button color='secondary' onClick={deactivateForm}>
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
