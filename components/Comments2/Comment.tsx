import { FC } from "react";
import IComment from "../../interfaces/Comment";

interface Props {
  data: IComment;
}

const Comment: FC<Props> = ({ data }) => {
  return <div>{data.text}</div>;
};

export default Comment;
