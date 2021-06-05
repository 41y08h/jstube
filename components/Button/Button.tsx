import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  return <button {...props} />;
};

export default Button;
