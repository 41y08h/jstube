import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";

const Button = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>((props, ref) => <button ref={ref} {...props} />);

export default Button;
