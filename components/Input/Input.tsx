import { FormEventHandler, useRef, useState } from "react";
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";

type Div = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface Props extends Omit<Div, "onChange"> {
  plceholder?: string;
  onChange?: (value: string) => any;
}
const Input = forwardRef<HTMLDivElement, Props>(
  ({ className, placeholder = "", onChange, ...props }, ref) => {
    const [isPlaceholderShowing, setIsPlaceholderShowing] = useState(
      !!placeholder
    );

    const onInput = (e) => {
      const value = e.target.innerText;
      setIsPlaceholderShowing(!value);
      onChange && onChange(value);
    };

    return (
      <div className="relative w-full">
        {isPlaceholderShowing && (
          <span className="absolute top-0 left-0 opacity-30 pointer-events-none">
            {placeholder}
          </span>
        )}
        <div
          {...props}
          ref={ref}
          onInput={onInput}
          contentEditable
          className={`border-b w-full bg-transparent outline-none ${className}`}
          style={{ minHeight: "24px" }}
        />
      </div>
    );
  }
);

export default Input;
