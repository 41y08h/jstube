import { useState } from "react";
import { HTMLAttributes } from "react";
import { DetailedHTMLProps } from "react";
import { RefObject } from "react";
import { forwardRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => any;
}

const MultilineInput = forwardRef<RefObject<HTMLElement>, Props>(
  ({ value: initialValue = "", placeholder = "", onChange, ...props }, ref) => {
    const [value, setValue] = useState(initialValue);

    function handleChange(event: ContentEditableEvent) {
      const newValue = event.target.value;
      setValue(newValue);
      if (onChange) onChange(newValue);
    }

    const showPlaceholder = !value.trim();
    return (
      <div className="relative w-full">
        {showPlaceholder && (
          <span
            className="absolute top-0 left-0 opacity-50 pointer-events-none"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            {placeholder}
          </span>
        )}
        <ContentEditable
          {...props}
          innerRef={ref as RefObject<HTMLDivElement>}
          html={value}
          onChange={handleChange}
          className="border-b outline-none py-1"
        />
      </div>
    );
  }
);

export default MultilineInput;
