import { FC } from "react";
import { IComments } from "../../interfaces/Comment";

interface Props {
  comments: IComments;
}

const Comments: FC<Props> = ({ comments }) => {
  return (
    <div>
      <span>{comments.count} Comments</span>
      {comments.items.map((item) => (
        <div>
          <img src={item.author.picture} alt={item.author.name} />
          <span>{item.text}</span>
          <button>{item.ratings.count.likes} Likes</button>
          <button>{item.ratings.count.dislikes} Dislikes</button>
        </div>
      ))}
    </div>
  );
};

export default Comments;
