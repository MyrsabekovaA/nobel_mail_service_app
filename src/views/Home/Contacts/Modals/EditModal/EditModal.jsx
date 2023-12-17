import React, { useState } from "react";

import "./EditModal.css";

function EditModal({ onClose, onEdit, contactsToEdit, totalContacts }) {
  const [currentTab, setCurrentTab] = useState("edit");

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0  bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
    >
      <div
        onClick={handleModalClick}
        className="bg-white dark:bg-slate-800 flex flex-col  rounded-lg shadow-xl p-6 w-auto sm:w-96 min-h-[650px] min-w-[550px] overflow-y-auto"
      >
        <div className="flex justify-between items-center pb-4 px-4 -mx-6">
          <h2 className="text-xl text-slate-600 dark:text-slate-200 font-bold">
            Editing{" "}
            {contactsToEdit.length === 0
              ? totalContacts
              : contactsToEdit.length}{" "}
            contact
            {contactsToEdit.length > 1 || contactsToEdit.length === 0
              ? "s"
              : ""}
          </h2>
          <button
            onClick={onClose}
            className="text-black dark:text-white flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-auto justify-between mb-8 -mx-6 border-t border-b border-slate-500/70">
          <div className="flex content bg-slate-200 dark:bg-gray-800 flex-auto w-80 px-3">
            <div className="justify-center">
              {currentTab === "edit" && <div>Content for Tab 1</div>}
              {currentTab === "addToEq" && <div>Content for Tab 2</div>}
              {currentTab === "removeFromEq" && <div>Content for Tab 3</div>}
              {currentTab === "sendEmail" && <div>Content for Tab 4</div>}
            </div>
          </div>
          <div className="actions bg-slate-300 dark:bg-gray-900 flex-auto w-32 px-3">
            <h4 className="text-lg font-bold text-slate-500 p-2">Actions</h4>
            <ul className="flex flex-col gap-3">
              <li className="action-item">
                <button
                  className={`tab-button ${
                    currentTab === "edit" ? "active-tab" : ""
                  }`}
                  onClick={() => setCurrentTab("edit")}
                >
                  Edit Fields
                </button>
              </li>
              <li className="action-item">
                <button
                  className={`tab-button ${
                    currentTab === "addToEq" ? "active-tab" : ""
                  }`}
                  onClick={() => setCurrentTab("addToEq")}
                >
                  Add to an EQ
                </button>
              </li>
              <li className="action-item">
                <button
                  className={`tab-button ${
                    currentTab === "removeFromEq" ? "active-tab" : ""
                  }`}
                  onClick={() => setCurrentTab("removeFromEq")}
                >
                  Remove from an EQ
                </button>
              </li>
              <li className="action-item">
                <button
                  className={`tab-button ${
                    currentTab === "sendEmail" ? "active-tab" : ""
                  }`}
                  onClick={() => setCurrentTab("sendEmail")}
                >
                  Send an Email
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            // onClick={handleSubmit}
            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-400 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
