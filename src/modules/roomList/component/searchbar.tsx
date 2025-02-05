import { roomList } from "@/types/roomList";
import { ChangeEvent, useState } from "react";

export type SearchProps = {
  onSearch: (value: string) => void;
  onClearSearch: () => void;
  roomData: roomList[];
};

const Searchbar = (props: SearchProps) => {
  const { onSearch, onClearSearch } = props;

  const [value, setValue] = useState("Search");

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value);

    if (target.value === "") {
      onClearSearch();
    } else {
      onSearch(target.value);
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
          />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
