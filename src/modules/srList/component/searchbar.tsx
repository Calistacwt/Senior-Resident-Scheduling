import React, { ChangeEvent, useState } from 'react';

export type SearchProps = {
    onSearch: (value: string) => void
}

const Searchbar = (props: SearchProps) => {
    const { onSearch } = props;
    const [value, setValue] = useState('Enter search...');

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setValue(target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(value);
        }
    };

    return (
        <div className="relative w-full flex items-center text-gray-600">
            <input
                type="search"
                name="search"
                placeholder={value}
                className="bg-white h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none"
                onChange={searchHandler}
                onKeyDown={handleKeyDown}
            />
            <button type="submit" className="right-0 top-0 mt-3 mr-4">
                <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M13.53 14.47a8 8 0 111.414-1.414l3.96 3.96a1 1 0 01-1.414 1.414l-3.96-3.96zM8 14a6 6 0 100-12 6 6 0 000 12z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div className="flex space-x-2 ml-2">
                <button className="border-dashboard-border rounded">Filter</button>
                <button className="border-dashboard-border rounded">Import</button>
                <button className="border-dashboard-border rounded">Export</button>
            </div>
        </div>
    );
};

export default Searchbar;
