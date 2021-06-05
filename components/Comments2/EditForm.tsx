import { DetailedHTMLProps, FC, FormHTMLAttributes } from "react";

// TODO: Add styling to make sense of this extracted component
type Props = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
const EditForm: FC<Props> = (...props) => <form {...props}></form>;

export default EditForm;
