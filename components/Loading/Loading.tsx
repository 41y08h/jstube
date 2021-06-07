import { forwardRef, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  align?: "left" | "right" | "between";
}

const Loading = forwardRef<SVGSVGElement, Props>(
  ({ align = "between", className, ...props }, ref) => {
    const getAlignment = () => {
      switch (align) {
        case "left":
          return "justify-start";
        case "right":
          return "justify-end";
        case "between":
          return "justify-center";
      }
    };
    const alignmentClassName = getAlignment();

    return (
      <div className={`flex ${alignmentClassName}`}>
        <svg
          ref={ref}
          className={`${"spinner w-8 h-8"} ${className}`}
          viewBox="0 0 50 50"
          {...props}
        >
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          />
        </svg>
      </div>
    );
  }
);

export default Loading;
