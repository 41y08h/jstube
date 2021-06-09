import { forwardRef, InputHTMLAttributes } from "react";
import { DetailedHTMLProps, FC } from "react";

const Input = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`border-b w-full bg-transparent outline-none ${className}`}
    {...props}
  />
));

export default Input;
