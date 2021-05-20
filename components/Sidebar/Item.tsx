import Link from "next/link";
import { FC, SVGProps } from "react";

interface Props {
  icon: FC<SVGProps<any>>;
  active: boolean;
  text: string;
  href: string;
}

const Item: FC<Props> = ({ icon: Icon, active, text, href }) => {
  const linkClassName =
    "flex space-x-6 px-6 py-3 items-center hover:bg-gray-200 " +
    (active ? "bg-gray-200" : "");

  const iconClassName = "h-6 " + (active ? "text-red-600" : "text-gray-500");
  const textClassName = "text-sm " + (active ? "font-medium" : "");

  return (
    <Link href={href}>
      <a className={linkClassName}>
        <Icon className={iconClassName} />
        <span className={textClassName}>{text}</span>
      </a>
    </Link>
  );
};
export default Item;
