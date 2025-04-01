import { FC, useRef, useEffect, RefObject } from 'react'
import { InputBase, InputBaseProps } from '@material-ui/core'

interface Props extends InputBaseProps {
  inputRef?: RefObject<HTMLTextAreaElement>
}

const MultilineInput: FC<Props> = props => {
  const ref = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const element = props.inputRef?.current || ref.current
    if (!element) return

    // Put the cursor at the end of input
    element.setSelectionRange(element.value.length, element.value.length)
  }, [])

  return <InputBase multiline inputRef={ref} {...props} />
}

export default MultilineInput
