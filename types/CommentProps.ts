import IComment from "../interfaces/Comment";

type CommentProps = {
  data: IComment;
  onDeleted: (id: number) => any;
};

export default CommentProps;
