import Action from "./Action";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import ReplyIcon from "@material-ui/icons/Reply";
import WaitForAuth from "../../WaitForAuth";

export default function Actions() {
  return (
    <WaitForAuth>
      <div className="flex space-x-5 items-center justify-center">
        <div className="space-x-5 border-b-2 border-gray-500 pb-4">
          <LikeButton />
          <DislikeButton />
        </div>
        <Action
          className="-mt-4"
          icon={<ReplyIcon style={{ transform: "scaleX(-1)" }} />}
          text="Share"
        />
      </div>
    </WaitForAuth>
  );
}
