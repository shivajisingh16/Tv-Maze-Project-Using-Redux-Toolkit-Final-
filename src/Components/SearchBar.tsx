import { FC, InputHTMLAttributes } from "react";
import { BsSearch } from "react-icons/bs";


type SearchBarProps = InputHTMLAttributes<HTMLInputElement>& {
  searchref:any
}
const SearchBar:FC<SearchBarProps>=({searchref,...rest})=> {
  return (
    <div className="relative">
      <input {...rest} ref={searchref} type="text" placeholder="Search" />
      <BsSearch className="absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
}

export default SearchBar;