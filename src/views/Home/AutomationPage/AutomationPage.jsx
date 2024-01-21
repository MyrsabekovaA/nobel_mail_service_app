import React, { useEffect, useState } from "react";
import AutomationList from "./AutomationsList/AutomationList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAutomations,
  updateAutomations,
  addAutomation,
  deleteAutomation,
  copyAutomation,
  createAutomation,
} from "/@/GlobalStates/Automation";
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
    <div>
      <div className="container mx-auto px-4">
        <button
          onClick={() => dispatch(createAutomation())}
          className="mb-4 text-black font-bold py-2 px-4 rounded bg-gray"
        >
          + Add New
        </button>
        <AutomationList automations={automations} templates={templates} />
        {isLoading && <LoadingSpinner />}
        {isLoadingOverlay && <LoadingOverlay />}
      </div>
    </div>
  );
}

export default AutomationPage;
