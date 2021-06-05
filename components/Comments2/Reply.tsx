import { FC } from "react";
import IComment from "../../interfaces/Comment";

interface Props {
  data: IComment;
}

const Reply: FC<Props> = ({ data }) => {
  return <p>{data.text}</p>;
};

export default Reply;
