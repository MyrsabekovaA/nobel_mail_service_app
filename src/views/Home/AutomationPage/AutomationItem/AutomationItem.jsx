import React, { useEffect, useState } from "react";
import isEqual from "lodash/isEqual";

import "./AutomationItem.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CustomDatepicker from "../../../../components/CustomDatepicker/CustomDatepicker";
import { Icon } from "@iconify/react";
import DropDownIcon from "/@/components/DropDownIcon/DropDownIcon";
import {
  deleteAutomation,
  updateAutomation,
} from "../../../../GlobalStates/Automation";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

function AutomationItem({ automation, templates }) {
  const dispatch = useDispatch();
  const [isEdited, setIsEdited] = useState(false);
  const [automationData, setAutomationData] = useState({
    name: automation.name,
    automationScheduledMails: automation.automationScheduledMails,
  });
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const defaultStep = {
    useContactTimezone: true,
    scheduledDate: new Date(),
    templateId: "656aea5e130538893e8820d0",
  };

  const dropdownOptions = [
    {
      text: "Delete",
      onClick: () => dispatch(deleteAutomation(automation.id)),
      icon: (
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      ),
    },
    {
      text: "Copy",
      // onClick: () => handleCopy(),
      icon: (
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
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
          />
        </svg>
      ),
    },
  ];

  const addStep = () => {
    setAutomationData((prevData) => ({
      ...prevData,
      automationScheduledMails: [
        ...prevData.automationScheduledMails,
        { ...defaultStep, scheduledDate: new Date() },
      ],
    }));
    setIsEdited(true);
  };

  const deleteStep = (index) => {
    setAutomationData((prevData) => ({
      ...prevData,
      automationScheduledMails: prevData.automationScheduledMails.filter(
        (_, i) => i !== index
      ),
    }));
    setIsEdited(true);
  };

  const toggleUseContactTimezone = (index) => {
    setAutomationData((prevData) => {
      const newScheduledMails = [...prevData.automationScheduledMails];
      newScheduledMails[index] = {
        ...newScheduledMails[index],
        useContactTimezone: !newScheduledMails[index].useContactTimezone,
      };
      setIsEdited(true);
      return { ...prevData, automationScheduledMails: newScheduledMails };
    });
  };

  const handleTemplateChange = (newTemplateId, stepIndex) => {
    setAutomationData((prevData) => {
      const updatedScheduledMails = prevData.automationScheduledMails.map(
        (step, index) => {
          if (index === stepIndex) {
            return { ...step, templateId: newTemplateId };
          }
          return step;
        }
      );
      setIsEdited(true);
      return { ...prevData, automationScheduledMails: updatedScheduledMails };
    });
  };

  const handleDateChange = (newDate, stepIndex) => {
    setAutomationData((prevData) => {
      const updatedScheduledMails = prevData.automationScheduledMails.map(
        (step, index) => {
          if (index === stepIndex) {
            return { ...step, scheduledDate: newDate };
          }
          return step;
        }
      );
      setIsEdited(true);
      return { ...prevData, automationScheduledMails: updatedScheduledMails };
    });
  };

  const handleUpdate = async () => {
    setIsLoadingUpdate(true);
    try {
      await dispatch(
        updateAutomation({ id: automation.id, data: automationData })
      ).unwrap();
      setIsLoadingUpdate(false);
      setIsEdited(false);
    } catch (error) {
      setIsLoadingUpdate(false);
    }
  };

  return (
    <div className="automation-item">
      <div className="flex items-center justify-between gap-2 p-2">
        <input
          className="p-1 w-full appearance-none outline-none bg-transparent focus:outline-meta-5 rounded-md transition-all duration-150"
          type="text"
          onChange={(e) => {
            setAutomationData({
              ...automationData,
              name: e.target.value,
            });
            setIsEdited(true);
          }}
          placeholder="Card name"
          value={automationData.name}
        />
        <div className="flex items-center gap-3">
          <div
            className={`transition-all w-4 h-4 rounded-full bg-meta-8 ${
              isEdited ? "opacity-100" : "opacity-0"
            }`}
          ></div>
          <button className="relative z-10 p-1 rounded-md hover:bg-gray/20 transition-colors durration-150">
            <DropDownIcon
              icon={<Icon icon="ep:more-filled" />}
              options={dropdownOptions}
            />
          </button>
        </div>
      </div>
      <div className="relative flex flex-col gap-2 px-3 py-3 border-y border-gray/50 h-56 max-h-56 overflow-y-auto">
        {automationData.automationScheduledMails.map((step, index) => (
          <div
            key={index}
            className="step flex gap-1 items-center justify-between outline outline-1 outline-gray/50 hover:outline-meta-5  hover:shadow-lg p-2 rounded transition duration-150 "
          >
            {/* <span className="">{index + 1}.</span> */}
            <select
              className="step-select"
              value={step.templateId}
              onChange={(e) => handleTemplateChange(e.target.value, index)}
            >
              <option value="" disabled selected>
                Pick template
              </option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <CustomDatepicker
              initialDate={step.scheduledDate}
              timeOptionOn={true}
              onDateChange={(newDate) => handleDateChange(newDate, index)}
            />
            <div>
              <button
                className="flex gap-1"
                title="Toggle to use contact's timezone"
                onClick={() => toggleUseContactTimezone(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke=""
                  className={`2xsm:w-4 3xsm:h-4 xsm:w-6 xsm:h-6 hover:stroke-gray transition-all duration-150 active:stroke-green300 ${
                    step.useContactTimezone
                      ? "stroke-green300"
                      : "stroke-gray/50"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => deleteStep(index)}
              className="delete-step p-1 rounded-md hover:bg-gray/20 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="2xsm:w-4 3xsm:h-4 xsm:w-6 xsm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 p-2">
        <button
          onClick={addStep}
          className="p-1 flex gap-2 hover:text-meta-5 transition-colors duration-150"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add step
        </button>
        <button
          onClick={handleUpdate}
          className="p-1 flex gap-2 hover:text-green300 transition-colors duration-150"
        >
          Save changes
          {isLoadingUpdate ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          ) : (
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
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default AutomationItem;
