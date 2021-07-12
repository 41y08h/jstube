import grey from '@material-ui/core/colors/grey'
import { makeStyles, Button } from '@material-ui/core'
import MultilineInput from 'components/MultilineInput'
import { FC, FormEventHandler, RefObject } from 'react'

interface Props {
  onSubmit: FormEventHandler
  inputRef: RefObject<HTMLTextAreaElement>
  defaultValue: string
  onCancel: Function
}

const useStyles = makeStyles(theme => ({
  input: {
    ...theme.typography.body2,
    width: '100%',
    borderRadius: 6,
    padding: '0.8rem',
    backgroundColor: grey[200],
  },
}))

const CommentEditForm: FC<Props> = ({
  onSubmit,
  inputRef,
  defaultValue,
  onCancel,
}) => {
  const classes = useStyles()

  return (
    <form className='flex flex-col' onSubmit={onSubmit}>
      <MultilineInput
        required
        autoFocus
        inputRef={inputRef}
        defaultValue={defaultValue}
        className={classes.input}
        placeholder='Keep writing...'
      />
      <div className='flex justify-end pt-3 space-x-2'>
        <Button color='secondary' onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          disableElevation
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default CommentEditForm
