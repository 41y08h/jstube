import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  appearance?:
    | "primary"
    | "danger"
    | "primary"
    | "light"
    | "dark"
    | "success"
    | "none";
  size?: "xs" | "sm" | "base" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, appearance = "light", size = "base", ...props }, ref) => {
    const getAppearance = () => {
      switch (appearance) {
        case "primary":
          return "bg-blue-700 text-white";
        case "light":
          return "bg-gray-50 border text-primary";
        case "dark":
          return "bg-gray-700 text-white";
        case "danger":
          return "bg-red-500 text-white";
        case "success":
          return "bg-green-600 text-white";
        case "none":
          return "bg-transparent";
      }
    };
    const getSize = () => {
      switch (size) {
        case "base":
          return "text-base";
        case "xs":
          return "text-xs";
        case "sm":
          return "text-sm";
        case "md":
          return "text-md";
        case "lg":
          return "text-lg";
      }
    };
    const appearanceClassName = getAppearance();
    const sizeClassName = getSize();

    return (
      <button
        ref={ref}
        className={`${"px-4 py-2 rounded"} ${appearanceClassName} ${sizeClassName} ${className}`}
        {...props}
      />
    );
  }
);

export default Button;
