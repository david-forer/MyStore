import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <div className="relative">
      <form onSubmit={submitHandler} inline>
        <div className="absolute text-gray-600 dark:text-gray-400 flex items-center  h-full cursor-pointer ">
         
          <button type="submit" className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-7 h-7 flex items-center justify-center ml-1"><SearchIcon /></button>
        </div>
        <input
          id="search"
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          className="rounded-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none h-8 flex items-center pl-10 text-sm border-gray-300 border shadow"
          placeholder="search"
        />
        {/* <button type="submit">Search</button> */}
      </form>
    </div>
  );
};

export default SearchBox;
