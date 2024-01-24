import React, { useEffect, useState } from "react";
import { fetchAutomations } from "/@/GlobalStates/Automation";
import { fetchTemplates } from "/@/GlobalStates/Templates";

import "./EditModal.css";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "../../../../../GlobalStates/Toasts";
import CustomDatepicker from "../../../../../components/CustomDatepicker/CustomDatepicker";

function EditModal({ onClose, onEdit, contactsToEdit, totalContacts }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loggedIn.token);

  const headers = {
    Authorization: `Bearer ${token}`,
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
  const automations = useSelector((state) => state.automations.automations);
  const templates = useSelector((state) => state.templates.templates);

  const [pickedAutomation, setPickedAutomation] = useState("");
  const [pickedTemplate, setPickedTemplate] = useState("");

  useEffect(() => {
    dispatch(fetchAutomations());
    dispatch(fetchTemplates());
  }, [dispatch]);

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
          <CustomDatepicker
            initialDate={null}
            timeOptionOn={field === "birthDate" ? false : true}
            onDateChange={(newDate) => handleDateChange(newDate, field)}
          />
        );
      default:
        return null;
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(fieldsToEdit);
    }
    onClose();
  };

  const addToAutomation = async () => {
    try {
      const payload = {
        contactIds: contactsToEdit.map((contact) => contact.id),
      };
      const response = await axios.post(
        `https://mail-service-412008.ey.r.appspot.com/api/mailing-automations/${pickedAutomation}/add-contacts`,
        payload,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        dispatch(successToast("Successfully added contacts to automation!"));
      }
    } catch (error) {
      dispatch(errorToast("Error adding contacts to automation."));
      console.log(error);
    }
  };

  const removeFromAutomation = async () => {
    try {
      const payload = {
        contactIds: contactsToEdit.map((contact) => contact.id),
      };
      const response = await axios.post(
        `https://mail-service-412008.ey.r.appspot.com/api/mailing-automations/${pickedAutomation}/remove-contacts`,
        payload,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        dispatch(
          successToast("Successfully removed contacts from automation!")
        );
      }
    } catch (error) {
      dispatch(errorToast("Error removing contacts from automation."));
      console.log(error);
    }
  };

  const sendEmail = async () => {
    try {
      const payload = {
        contactId: contactsToEdit.map((contact) => contact.id).join(","),
        templateId: pickedTemplate,
        scheduledDate: new Date(),
        useContactTimezone: false,
      };
      const response = await axios.post(
        `https://mail-service-412008.ey.r.appspot.com/api/scheduled-mails/`,
        payload,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        dispatch(successToast("Successfully added contacts to automation!"));
      }
    } catch (error) {
      dispatch(errorToast("Error adding contacts to automation."));
      console.log(error);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black bg-opacity-50  h-full w-full flex justify-center items-center"
    >
      <div
        onClick={handleModalClick}
        className="bg-whiten dark:bg-compdark flex flex-col rounded-lg shadow-xl p-6 w-auto sm:w-96  min-h-[650px] min-w-[550px] "
      >
        <div className="flex justify-between items-center pb-4 px-4 -mx-6">
          <h2 className="text-xl text-compdark/90 dark:text-whiten font-medium">
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
            className="text-compdark dark:text-whiten flex items-center"
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
        <div className="flex flex-auto justify-between mb-8 -mx-6 border-t border-b border-gray/50 ">
          <div className="flex bg-meta-9 dark:bg-graydark/50 flex-auto w-80 px-3 max-h-[436px]  overflow-y-auto">
            <div className="justify-center ">
              {currentTab === "edit" && (
                <div className="py-6 ">
                  <h3 className="text-lg font-medium text-compdark/90 dark:text-whiten mb-3">
                    Fields to edit:
                  </h3>
                  <div className="">
                    <div className="field-selection grid grid-cols-2 border-b border-gray/50 mb-3 pb-6">
                      {Object.keys(fieldTypes).map((field) => (
                        <div
                          className="flex gap-1 p-1 items-center"
                          key={field}
                        >
                          <input
                            type="checkbox"
                            id={field}
                            name={field}
                            checked={!!selectedFields[field]}
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor={field}>
                            {fieldTypes[field].name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-compdark/90 dark:text-whiten mb-3">
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
              {currentTab === "addToEq" && (
                <div className="pt-4">
                  <h3 className="text-lg font-medium text-compdark/90 dark:text-whiten mb-3">
                    Pick Automation:
                  </h3>
                  <select
                    onChange={(e) => setPickedAutomation(e.target.value)}
                    className="bg-whiten border border-gray/50 text-graydark text-sm rounded-lg focus:ring-meta-5 focus:border-meta-5 block w-full p-2.5 dark:bg-compdark dark:border-gray/50 dark:placeholder-gray/50 dark:text-whiten dark:focus:ring-meta-5 dark:focus:border-green300"
                  >
                    <option value="" disabled selected>
                      Pick automation
                    </option>
                    {automations.map((automation) => (
                      <option key={automation.id} value={automation.id}>
                        {automation.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {currentTab === "removeFromEq" && (
                <div className="pt-4">
                  <h3 className="text-lg font-medium text-compdark/90 dark:text-whiten mb-3">
                    Pick Automation:
                  </h3>
                  <select
                    onChange={(e) => setPickedAutomation(e.target.value)}
                    className="bg-whiten border border-gray/50 text-graydark text-sm rounded-lg focus:ring-meta-5 focus:border-meta-5 block w-full p-2.5 dark:bg-compdark dark:border-gray/50 dark:placeholder-gray/50 dark:text-whiten dark:focus:ring-meta-5 dark:focus:border-green300"
                  >
                    <option value="" disabled selected>
                      Pick automation
                    </option>
                    {automations.map((automation) => (
                      <option key={automation.id} value={automation.id}>
                        {automation.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {currentTab === "sendEmail" && (
                <div className="pt-4">
                  <h3 className="text-lg font-medium text-compdark/90 dark:text-whiten mb-3">
                    Send an Email with Template:
                  </h3>
                  <select
                    onChange={(e) => setPickedTemplate(e.target.value)}
                    className="bg-whiten border border-gray/50 text-graydark text-sm rounded-lg focus:ring-meta-5 focus:border-meta-5 block w-full p-2.5 dark:bg-compdark dark:border-gray/50 dark:placeholder-gray/50 dark:text-whiten dark:focus:ring-meta-5 dark:focus:border-green300"
                  >
                    <option value="" disabled selected>
                      Pick a template
                    </option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="actions bg-whiten dark:bg-graydark/90 flex-auto w-32 px-3 pt-4">
            <h4 className="text-lg font-medium text-compdark/90 dark:text-whiten mb-3">
              Actions
            </h4>
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
          {currentTab === "edit" && (
            <button
              onClick={handleEdit}
              className="bg-green300 text-meta-2 dark:bg-success hover:bg-green300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Save
            </button>
          )}

          {currentTab === "addToEq" && (
            <button
              onClick={addToAutomation}
              className="bg-green300 text-meta-2 dark:bg-success hover:bg-green300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Add to EQ
            </button>
          )}

          {currentTab === "removeFromEq" && (
            <button
              onClick={removeFromAutomation}
              className="bg-green300 text-meta-2 dark:bg-success hover:bg-green300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Remove from EQ
            </button>
          )}
          {currentTab === "sendEmail" && (
            <button
              onClick={sendEmail}
              className="bg-green300 text-meta-2 dark:bg-success hover:bg-green300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Send
            </button>
          )}

          <button
            onClick={onClose}
            className="bg-gray text-whiten active:bg-gray/50 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150"
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
