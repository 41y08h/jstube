import { TextareaAutosize, TextareaAutosizeProps } from "@material-ui/core";
import { forwardRef } from "react";

const MultilineInput = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        {...props}
        ref={ref}
        className={`border-b w-full resize-none bg-transparent outline-none ${className}`}
      />
    );
  }
);

export default MultilineInput;
