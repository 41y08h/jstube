import { forwardRef, SVGProps } from "react";

const Loading = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <div className="flex justify-center">
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
  )
);

export default Loading;
