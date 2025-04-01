import { DetailedHTMLProps, forwardRef, ImgHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  size?: "sm" | "base" | "lg";
}

const Avatar = forwardRef<HTMLImageElement, Props>(
  ({ className, size = "base", ...props }, ref) => {
    const getSize = () => {
      switch (size) {
        case "sm":
          return "w-6 h-6";
        case "base":
          return "w-9 h-9";
        case "lg":
          return "w-12 h-12";
      }
    };
    const sizeClassName = getSize();

    return (
      <img
        ref={ref}
        className={`rounded-full ${sizeClassName} ${className}`}
        {...props}
      />
    );
  }
);

export default Avatar;
