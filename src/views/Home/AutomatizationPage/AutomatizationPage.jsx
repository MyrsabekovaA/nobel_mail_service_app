import React, { useEffect, useState } from "react";
import AutomatizationList from "./AutomatizationsList/AutomatizationsList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "/@/GlobalStates/Toasts";
import { updateAutomatizations, addAutomatization, deleteAutomatization, copyAutomatization } from "/@/GlobalStates/Automatization";

import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

function AutomatizationPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loggedIn.token);
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // const [automatizations, setAutomatizations] = useState([]);
  const automatizations = useSelector(state => state.automatization.automatizations);

  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAutomatizations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://52.59.202.2:3000/api/mailing-automations`,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        dispatch(updateAutomatizations(response.data));
      }
    } catch (error) {
      dispatch(errorToast("Error Fetching Automatizations"));
      console.error("Error Fetching Automatizations", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://52.59.202.2:3000/api/mail-templates`,
        {
          header: headers,
        }
      );
      if (response.status === 200) {
        setTemplates(response.data);
      }
    } catch (error) {
      dispatch(errorToast("Error fetching templates."));
      console.log("Error fetching templates", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleAddNewAutomatization = () => {
    dispatch(addAutomatization());
  };

  const handleDeleteAutomatization = (id) => {
    dispatch(deleteAutomatization(id));
  };

  const handleCopyAutomatization = (automatization) => {
    dispatch(copyAutomatization(automatization));
  };


  useEffect(() => {
    fetchAutomatizations();
    fetchTemplates();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4">
        <button
            onClick={handleAddNewAutomatization}
            className="mb-4 text-black font-bold py-2 px-4 rounded bg-gray"
        >
          + Add New
        </button>
        <AutomatizationList
            automatizations={automatizations}
            templates={templates}
            onDelete={handleDeleteAutomatization}
            onCopy={handleCopyAutomatization}
        />
        {isLoading && <LoadingSpinner/>}
      </div>
    </div>
  );
}

export default AutomatizationPage;
