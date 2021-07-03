import { useState } from "react";
import SearchDialog from "./SearchDialog";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <div>
      <IconButton onClick={open}>
        <SearchIcon />
      </IconButton>
      <SearchDialog isOpen={isOpen} close={close} />
    </div>
  );
}
