import { cloneElement } from "react";

export default function VideoAction({ icon, text, className, ...props }) {
  return (
    <button
      className={"cursor-pointer text-gray-500 outline-none " + className}
      {...props}
    >
      {cloneElement(icon, {
        className: "mr-2 " + icon.props.className,
      })}
      <span className="uppercase font-bold text-sm">{text}</span>
    </button>
  );
}
