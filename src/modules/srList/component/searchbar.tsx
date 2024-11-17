import React, { ChangeEvent, useState } from "react";

export type SearchProps = {
  onSearch: (value: string) => void;
};

const Searchbar = (props: SearchProps) => {
  const { onSearch } = props;
  const [value, setValue] = useState("Search");

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className="w-full flex items-center text-sidebar bg-white p-3 rounded-lg">
      <div className="flex w-full space-x-2">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <img
              src="/assets/images/search.png"
              alt="Search Logo"
              className="rounded-md w-4 "
            />
          </span>
          <input
            type="search"
            name="search"
            placeholder={value}
            className="bg-form-search w-full p-3 pl-10 text-sm focus:outline-none rounded-xl"
            onChange={searchHandler}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex-shrink-0 flex justify-center items-center space-x-4">
          <button className="text-xs text-black rounded p-2 font-semibold border-form-border border flex space-x-2 justify-center items-center">
            <img
              src="/assets/images/filter.png"
              alt="Import Logo"
              className="rounded-md cursor-pointer w-4"
            />
            <div>
              <p>Filter</p>
            </div>
          </button>
          <button className="text-xs text-black rounded p-2 font-semibold border-form-border border flex space-x-2 justify-center items-center">
            <img
              src="/assets/images/import.png"
              alt="Import Logo"
              className="rounded-md cursor-pointer w-4"
            />
            <div>
              <p>Import</p>
            </div>
          </button>
          <button className="text-xs text-black rounded p-1.5 font-semibold border-form-border border flex space-x-2 justify-center items-center">
            <img
              src="/assets/images/export.svg"
              alt="Export Logo"
              className="rounded-md cursor-pointer w-5"
            />
            <div>
              <p className="text-xs">Export</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
