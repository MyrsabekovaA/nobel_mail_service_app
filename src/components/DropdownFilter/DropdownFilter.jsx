import React, { useEffect, useState } from "react";
import "./DropdownFilter";

function DropdownFilter({ categories }) {
  const [testCategories, setTestCategories] = useState({
    eqLists: ["eq1", "eq2"],
    status: ["Pending", "Selected"],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleCheckboxChange = (category, property) => {
    const key = `${category}-${property}`;
    setCheckedItems((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" text-sm px-4 w-28 h-10 text-center flex items-center justify-between gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700"
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
        <div className="absolute top-10 z-10 -left-8 mt-2 w-56  rounded-lg shadow bg-white dark:bg-gray-700">
          <div className="p-4">
            {Object.entries(testCategories).map(([category, properties]) => (
              <div
                key={category}
                className=" dark:text-slate-200 text-slate-800"
              >
                <button
                  className="flex items-center justify-between w-full p-2 uppercase 
                  font-medium text-left text-sm font-semibold border-b border-slate-500"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className={`${
                      openCategories[category] ? ` rotate-180` : ""
                    } w-5 h-5`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {openCategories[category] && (
                  <div className="py-2 text-sm">
                    {properties.map((property) => (
                      <div key={property} className="flex items-center gap-1.5">
                        <input
                          onChange={() =>
                            handleCheckboxChange(category, property)
                          }
                          id={`${category}-${property}`}
                          checked={
                            checkedItems[`${category}-${property}`] || false
                          }
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-600 dark:bg-gray-600 border-gray-300 rounded 
                           dark:bg-gray-700 dark:border-gray-600 w-4 h-4 bg-gray-100 border-gray-300 rounded  dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor={`${category}-${property}`}
                          className="dark:text-slate-200 text-slate-700"
                        >
                          {property}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownFilter;
