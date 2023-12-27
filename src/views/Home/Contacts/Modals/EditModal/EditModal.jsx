import React, { useEffect, useState } from "react";
import Datepicker from "tailwind-datepicker-react";

import "./EditModal.css";

function EditModal({ onClose, onEdit, contactsToEdit, totalContacts }) {
  const options = {
    title: "Select Birth Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      todayBtn: "",
      clearBtn: "",
      background: "bg-white dark:bg-slate-800 shadow",
      text: "text-slate-600 dark:text-slate-200 ",
      disabledText: "text-gray-400",
      input: "border-gray-300 focus:border-green-500",
      inputIcon: "text-green-500",
      selected: "bg-green-500 text-white hover:bg-green-500",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => (
        <span>
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
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </span>
      ),
      next: () => (
        <span>
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
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </span>
      ),
    },
    datepickerClassNames: "top-15",
    defaultDate: "",
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    },
  };
  const [show, setShow] = useState(false);
  const handleClose = (state) => {
    setShow(state);
  };
  const [currentTab, setCurrentTab] = useState("edit");

  const fieldTypes = {
    firstName: { type: "string", name: "First Name" },
    lastName: { type: "string", name: "Last Name" },
    email: { type: "string", name: "Email" },
    age: { type: "number", name: "Age" },
    birthDate: { type: "date", name: "Birth Date" },
    country: { type: "string", name: "Country" },
    city: { type: "string", name: "City" },
    gender: { type: "string", name: "Gender" },
    timezone: { type: "string", name: "Timezone" },
    occupation: { type: "string", name: "Occupation" },
    sourceOfReferral: { type: "string", name: "Source of Referral" },
    eduQuestDecision: { type: "string", name: "EduQuest Decision" },
    intershipMotivation: { type: "string", name: "Internship Motivation" },
    eduQuestSelectedDateTime: { type: "date", name: "EduQuest Selected Date" },
  };

  const [selectedFields, setSelectedFields] = useState([]);
  const [fieldsToEdit, setFieldsToEdit] = useState({});

  const handleCheckboxChange = (e) => {
    const field = e.target.name;
    setSelectedFields({
      ...selectedFields,
      [field]: e.target.checked,
    });

    if (!e.target.checked) {
      const updatedFieldsToEdit = { ...fieldsToEdit };
      delete updatedFieldsToEdit[field];
      setFieldsToEdit(updatedFieldsToEdit);
    }
  };
  const handleDateChange = (date, field) => {
    setFieldsToEdit({ ...fieldsToEdit, [field]: date });
  };
  const handleInputChange = (e, field) => {
    setFieldsToEdit({ ...fieldsToEdit, [field]: e.target.value });
  };

  useEffect(() => {
    console.log(fieldsToEdit);
  }, [fieldsToEdit]);
  const renderInputField = (field) => {
    const fieldType = fieldTypes[field].type;
    switch (fieldType) {
      case "string":
        return (
          <input
            className="edit-input"
            type="text"
            value={fieldsToEdit[field] || ""}
            onChange={(e) => handleInputChange(e, field)}
          />
        );
      case "number":
        return (
          <input
            className="edit-input"
            type="number"
            value={fieldsToEdit[field] || 0}
            onChange={(e) => handleInputChange(e, field)}
          />
        );
      case "date":
        return (
          <Datepicker
            options={options}
            onChange={(date) => handleDateChange(date, field)}
            show={show}
            setShow={handleClose}
            value={fieldsToEdit[field] || ""}
            className="edit-input"
            type="text"
            id="birthDate"
          />
        );
      default:
        return null;
    }
  };

  const handleSave = () => {
    if (onEdit) {
      onEdit(fieldsToEdit);
    }
    onClose(); // Close the modal after saving
  };

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
          <div className="flex bg-slate-200 dark:bg-gray-800 flex-auto w-80 px-3">
            <div className="justify-center">
              {currentTab === "edit" && (
                <div className="py-6">
                  <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Fields to edit:
                  </h3>
                  <div className="field-selection grid grid-cols-2 border-b border-slate-500/70 mb-3 pb-6">
                    {Object.keys(fieldTypes).map((field) => (
                      <div className="flex gap-1 p-1 items-center" key={field}>
                        <input
                          type="checkbox"
                          id={field}
                          name={field}
                          checked={!!selectedFields[field]}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor={field}>{fieldTypes[field].name}</label>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Update field(s):
                  </h3>
                  <div className="flex flex-col gap-3 field-inputs">
                    {Object.keys(selectedFields).map(
                      (field) =>
                        selectedFields[field] && (
                          <div key={field} className="flex flex-col gap-2">
                            <label>{fieldTypes[field].name}</label>
                            {renderInputField(field)}
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}
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
            onClick={handleSave}
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
