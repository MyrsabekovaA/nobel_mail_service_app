import React, { useEffect, useState } from "react";
import AutomatizationList from "./AutomatizationsList/AutomatizationsList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "../../../GlobalStates/Toasts";

import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

function AutomatizationPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loggedIn.token);
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [automatizations, setAutomatizations] = useState([]);
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
        setAutomatizations(response.data);
      }
    } catch (error) {
      dispatch(errorToast("Error Fetching Automatizations"));
      console.error("Error Fetching Automatizations", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTemplates = async () => {
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
    // finally {
    // }
  };
  useEffect(() => {
    fetchAutomatizations();
    fetchTemplates();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4">
        <AutomatizationList
          automatizations={automatizations}
          templates={templates}
        />
        {isLoading && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default AutomatizationPage;
