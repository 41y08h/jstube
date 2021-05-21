import { ButtonHTMLAttributes, DetailedHTMLProps, FC, SVGProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends ButtonProps {
  icon: FC<SVGProps<any>>;
  highlight?: boolean;
}

const ActionButton: FC<Props> = (props) => {
  const { highlight = false, children, icon: Icon, ...rest } = props;

  const highlightCName = highlight ? "text-blue-700" : "text-gray-500";
  const className =
    "flex items-center space-x-2 cursor-pointer outline-none " + highlightCName;

  return (
    <button {...{ ...rest, className }}>
      <Icon className="h-6 w-6" />
      <span className="uppercase font-medium text-sm">{children}</span>
    </button>
  );
};

export default ActionButton;
