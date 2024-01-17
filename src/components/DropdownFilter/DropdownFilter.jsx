import React, { useEffect, useState } from "react";
import "./DropdownFilter.css";

function DropdownFilter({ eqLists, onFilterChange, onCheckedItemsChange }) {
  const [openCategories, setOpenCategories] = useState({
    eqLists: false,
    statuses: false,
  });
  const [statuses, setStatuses] = useState(["OPEN", "CLOSED"]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    eqLists: [],
    statuses: [],
  });

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleCheckboxChange = (category, item) => {
    setCheckedItems((prev) => {
      const updatedCheckedItems = prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item];

      return { ...prev, [category]: updatedCheckedItems };
    });
  };
  useEffect(() => {
    onCheckedItemsChange(checkedItems);
  }, [checkedItems, onCheckedItemsChange]);

  useEffect(() => {
    console.log(checkedItems);
  }, [checkedItems]);

  const renderCheckboxes = (category, items) => {
    return items.map((item, index) => {
      const key = item.id || item;
      const label = item.name || item;
      return (
        <div className="flex gap-2" key={key}>
          <input
            type="checkbox"
            checked={checkedItems[category].includes(key)}
            onChange={() => handleCheckboxChange(category, key)}
          />
          <label className="font-thin text-sm" htmlFor="">
            {label}
          </label>
        </div>
      );
    });
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm px-4 w-28 h-10 text-center flex items-center justify-between gap-1 text-white bg-meta-5 hover:bg-meta-5/80 dark:bg-meta-4 dark:hover:bg-graydark focus:outline-none shadow-lg  font-medium rounded-lg transition-all duration-250"
        type="button"
      >
        Filter
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-10 z-10 -left-8 mt-2 w-56 rounded-lg shadow dark:bg-compdark bg-whiten">
          <div className="p-4">
            <button
              className="flex items-center justify-between w-full p-2 uppercase 
              font-medium text-left text-sm font-semibold border-b border-gray/50"
              onClick={() => toggleCategory("eqLists")}
            >
              EqLists
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className={`${
                  openCategories.eqLists ? ` rotate-180` : ""
                } w-5 h-5`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {openCategories.eqLists && renderCheckboxes("eqLists", eqLists)}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownFilter;
