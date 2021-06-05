import { InputHTMLAttributes } from "react";
import { DetailedHTMLProps, FC } from "react";

// TODO: Add styling to make sense of this extracted component
type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const EditInput: FC<Props> = (...props) => <input {...props}></input>;

export default EditInput;
