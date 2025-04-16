import { TextField, TextFieldProps, useTheme } from '@mui/material'
import { FC, useRef, useEffect, RefObject } from 'react'

interface Props extends TextFieldProps<'standard'> {
  inputRef?: RefObject<HTMLTextAreaElement | undefined>
}

const MultilineInput: FC<Props> = props => {
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const theme = useTheme()

  useEffect(() => {
    const element = props.inputRef?.current || ref.current
    if (!element) return

    // Put the cursor at the end of input
    element.setSelectionRange(element.value.length, element.value.length)
  }, [props.inputRef])

  return (
    <TextField
      variant='standard'
      multiline
      fullWidth
      {...props}
      sx={{
        ...props.sx,
        '& .MuiInput-underline:before': {
          borderBottomColor: 'grey.400',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'black',
        },
        '& input, & textarea': {
          fontSize: theme.typography.body2.fontSize,
        },
      }}
    />
  )
}

export default MultilineInput
