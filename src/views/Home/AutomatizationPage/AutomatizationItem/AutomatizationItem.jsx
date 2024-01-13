import React, { useEffect, useState } from "react";
import "./AutomatizationItem.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "/@/GlobalStates/Toasts";
import { Icon } from '@iconify/react';
import DropDownIcon from "/@/components/DropDownIcon/DropDownIcon";

function AutomatizationItem({ automatization, templates, onDelete, onCopy }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loggedIn.token);
  const headers = { Authorization: `Bearer ${token}` };
  const [automatizationData, setAutomatizationData] = useState({
    id: automatization.id,
    name: automatization.name,
    automationScheduledMails: [
      {
        timeZone: automatization.timeZone,
        useContactTimezone: automatization.useContactTimezone,
        scheduledDate: automatization.scheduledDate,
        template: {
          templateId: 2, //automatization.templateId,
          templateName: "name", //automatization.templateName,
        },
      },
    ],
  });
  const defaultStep = {
    timeZone: "",
    useContactTimezone: false,
    scheduledDate: "",
    template: {
      templateId: 15,
      templateName: "default",
    },
  };

  const addStep = () => {
    const newSteps = [
      ...automatizationData.automationScheduledMails,
      { ...defaultStep },
    ];

    console.log("Adding new step: ", newSteps);

    setAutomatizationData({
      ...automatizationData,
      automationScheduledMails: newSteps,
    });
  };

  const handleDeleteStep = (stepIndex) => {
    const updatedSteps = automatizationData.automationScheduledMails.filter((_, index) => index !== stepIndex);
    setAutomatizationData({
      ...automatizationData,
      automationScheduledMails: updatedSteps,
    });
  };

  const handleDelete = () => {
    onDelete(automatization.id);
  };

  const handleCopy = () => {
    onCopy(automatization);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://52.59.202.2:3000/api/mailing-automations/${automatizationData.id}`,
        automatizationData,
        { headers: headers }
      );
      if (response.status === 200) {
        dispatch(successToast(`Automatizations updated successfully!`));
      }
    } catch (error) {
      dispatch(errorToast(`Error updating automatization!`));
      console.log(`Error updating automatization.`, error);
    }
  };

  const dropdownOptions = [
    {
      text: 'Delete',
      onClick: () => handleDelete(),
      icon: <Icon icon="basil:cross-outline" />,
    },
    {
      text: 'Copy',
      onClick: () => handleCopy(),
      icon: <Icon icon="bxs:copy" />
    }
  ];

  return (
    <div className="max-w-xs border border-gray/50 rounded">
      <div className="flex items-center justify-between gap-2 p-2">
        <input
          className="p-1 appearance-none outline-none bg-transparent focus:outline-meta-5 rounded-md transition-all duration-150"
          type="text"
          onChange={(e) =>
            setAutomatizationData({
              ...automatizationData,
              name: e.target.value,
            })
          }
          onBlur={handleUpdate}
          placeholder="Card name"
          value={automatizationData.name}
        />
        <button className="p-1 rounded-md hover:bg-gray/20 transition-colors durration-150">
          <DropDownIcon
              icon={<Icon icon="ep:more-filled" />}
              options={dropdownOptions}
          />
        </button>
      </div>
      <div className="flex flex-col gap-2 px-3 py-3 border-y border-gray/50 h-56 max-h-56 overflow-y-auto">
        {automatizationData.automationScheduledMails.map((step, index) => (
            <div
                key={index}
                className="step flex gap-3 justify-between items-center outline outline-1 outline-gray/50 hover:outline-meta-5  hover:shadow-lg p-2 rounded transition duration-150 "
            >
              <span className="text-lg font-bold">{index + 1}.</span>
              <select
                  className="p-2 text-sm rounded bg-whiten dark:bg-compdark outline-none focus:outline-meta-5 block w-full"
                  // value={step.template.templateId}
                  // onChange={(e) => setAutomatizationData()}
                  name=""
                  id=""
              >
                {templates.map((template) => (
                    <option key={template.templateId} value={template.templateId}>
                      {template.templateName}
                    </option>
                ))}
              </select>
              <div>datepicker</div>
              <button className="delete-step p-1 rounded-md hover:bg-gray/20" onClick={() => handleDeleteStep(index)}>
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
        {/*<button className="p-1 rounded-md hover:bg-gray/20 ">*/}
        {/*  <svg*/}
        {/*    xmlns="http://www.w3.org/2000/svg"*/}
        {/*    fill="none"*/}
        {/*    viewBox="0 0 24 24"*/}
        {/*    strokeWidth={1.5}*/}
        {/*    stroke="currentColor"*/}
        {/*    className="w-6 h-6"*/}
        {/*  >*/}
        {/*    <path*/}
        {/*      strokeLinecap="round"*/}
        {/*      strokeLinejoin="round"*/}
        {/*      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"*/}
        {/*    />*/}
        {/*  </svg>*/}
        {/*</button>*/}
      </div>
    </div>
  );
}

export default AutomatizationItem;
