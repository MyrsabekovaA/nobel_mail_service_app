import React, { useEffect, useState } from "react";
import AutomationList from "./AutomationsList/AutomationList";
import { useDispatch, useSelector } from "react-redux";

import { fetchAutomations, createAutomation } from "/@/GlobalStates/Automation";
import { fetchTemplates } from "/@/GlobalStates/Templates";

import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";

function AutomationPage() {
  const dispatch = useDispatch();

  const automations = useSelector((state) => state.automations.automations);

  const templates = useSelector((state) => state.templates.templates);
  const isLoading = useSelector((state) => state.automations.isLoading);
  const isLoadingOverlay = useSelector(
    (state) => state.automations.isLoadingOverlay
  );

  useEffect(() => {
    dispatch(fetchAutomations());
    dispatch(fetchTemplates());
  }, [dispatch]);

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <button
          onClick={() => dispatch(createAutomation())}
          className="mb-4 flex gap-2 items-center text-compdark dark:text-whiten bg-whiten dark:bg-meta-4 hover:bg-gray-3 dark:hover:bg-graydark shadow-lg border border-gray/50 font-medium py-2 px-4 rounded transition-all duration-200;
          "
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
          Add New
        </button>
        <AutomationList automations={automations} templates={templates} />
        {isLoading && <LoadingSpinner />}
        {isLoadingOverlay && <LoadingOverlay />}
      </div>
    </div>
  );
}

export default AutomationPage;
