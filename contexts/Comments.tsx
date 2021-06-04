import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";
import IComment from "../interfaces/Comment";

interface Value {
  comments: IComment[];
  setComments: Dispatch<SetStateAction<IComment[]>>;
  editingCommentId: number;
  setEditingCommentId: Dispatch<SetStateAction<number | null>>;
}

const CommentsContext = createContext<any>(undefined);

export function useComments() {
  return useContext<Value>(CommentsContext);
}

const CommentsProvider: FC = ({ children }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>();

  const value = {
    comments,
    setComments,
    editingCommentId,
    setEditingCommentId,
  };
  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsProvider;
