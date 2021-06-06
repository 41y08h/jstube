import { DetailedHTMLProps, forwardRef, ImgHTMLAttributes } from "react";

const Avatar = forwardRef<
  HTMLImageElement,
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={`${"h-10 w-10 rounded-full"} ${className}`}
    {...props}
  />
));

export default Avatar;
