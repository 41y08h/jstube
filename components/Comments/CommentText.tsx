import { FC, DetailedHTMLProps, HTMLAttributes } from "react";

const CommentText: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
> = (props) => <p {...props} />;

export default CommentText;
