import Action from "./Action";
import Rating from "./Rating";
import ReplyIcon from "@material-ui/icons/Reply";

export default function Actions() {
  return (
    <div className="flex space-x-5 items-center justify-center">
      <div className="space-x-5 border-b-2 border-gray-500 pb-4">
        <Rating />
      </div>
      <Action
        className="-mt-4"
        icon={<ReplyIcon style={{ transform: "scaleX(-1)" }} />}
        text="Share"
      />
    </div>
  );
}
