import { FC, ImgHTMLAttributes } from "react";

const Avatar: FC<ImgHTMLAttributes<any>> = ({ className, ...props }) => (
  <div className="rounded-full h-9 w-9 bg-gray-300 overflow-hidden">
    <img className={className + " h-full w-full"} {...props} />
  </div>
);

export default Avatar;
