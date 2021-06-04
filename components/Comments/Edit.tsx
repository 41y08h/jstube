import { FC, FormEventHandler, useRef } from "react";

interface Props {
  onSubmit: (text: string) => any;
  onDiscard: Function;
}

const Edit: FC<Props> = ({ onSubmit, onDiscard }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const text = inputRef.current?.value;
    if (text) onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input autoFocus ref={inputRef} defaultValue={data.text} />
      <button onClick={onDiscard}>discard</button>
      <button type="submit">Submit</button>
    </form>
  );
};
