import { FC } from "react";
import SearchIcon from "../../icons/search.svg";

const SearchBar: FC = () => (
  <div className="flex border">
    <input
      style={{ width: "36rem" }}
      placeholder="Search"
      className="outline-none p-3 py-0.5"
    />
    <div className="bg-gray-50 p-2 px-4 border-l">
      <SearchIcon className="w-6 h-6 text-gray-600" />
    </div>
  </div>
);

export default SearchBar;
