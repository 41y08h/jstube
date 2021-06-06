import { forwardRef, InputHTMLAttributes } from "react";
import { DetailedHTMLProps, FC } from "react";

// TODO: Add styling to make sense of this extracted component
const EditInput = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => <input ref={ref} {...props} />);

export default EditInput;
