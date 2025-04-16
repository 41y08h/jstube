import { grey } from '@mui/material/colors'
import MultilineInput from '@/components/MultilineInput'
import { FC, FormEventHandler, RefObject, useState } from 'react'
import { Button } from '@mui/material'

interface Props {
  onSubmit: FormEventHandler
  inputRef: RefObject<HTMLTextAreaElement | undefined>
  defaultValue: string
  onCancel: () => void
}

const CommentEditForm: FC<Props> = ({
  onSubmit,
  inputRef,
  defaultValue,
  onCancel,
}) => {
  const [text, setText] = useState(defaultValue)
  return (
    <form className='flex flex-col w-full' onSubmit={onSubmit}>
      <MultilineInput
        fullWidth
        required
        inputRef={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder='Keep writing...'
      />
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
          onClick={() => onCancel()}
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
          Save
        </Button>
      </div>
    </form>
  )
}

export default CommentEditForm
