import Link from "next/link";
import User from "../../interfaces/entities/User";
import { FC } from "react";

interface Props {
  channel: User;
}

const Avatar: FC<Props> = ({ channel }) => (
  <Link href={`/channel/${channel.id}`}>
    <a className="block rounded-full h-9 w-9 bg-gray-300 overflow-hidden">
      <img
        className=" h-full w-full"
        src={channel.picture}
        alt={channel.name}
      />
    </a>
  </Link>
);

export default Avatar;
