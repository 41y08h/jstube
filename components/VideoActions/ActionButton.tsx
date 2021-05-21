import { ButtonHTMLAttributes, DetailedHTMLProps, FC, SVGProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: FC<SVGProps<any>>;
}

const ActionButton: FC<Props> = ({ children, icon: Icon, ...props }) => (
  <button
    {...props}
    className="flex items-center space-x-2 cursor-pointer text-gray-500 outline-none"
  >
    <Icon className="h-6 w-6" />
    <span className="uppercase font-medium text-sm">{children}</span>
  </button>
);

export default ActionButton;
