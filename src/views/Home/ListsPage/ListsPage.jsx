import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "../../../GlobalStates/Toasts";
import ListsList from "./ListsList/ListsList";
import AddModal from "./AddModal/AddModal";

function ListsPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loggedIn.token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [lists, setLists] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkedList, setCheckedList] = useState("");
  const [automatizations, setAutomatizations] = useState([]);

  const fetchLists = async () => {
    try {
      const response = await axios.get(
        `http://52.59.202.2:3000/api/contacts-lists`,
        { headers: headers }
      );

      if (response.status === 200) {
        setLists(response.data);
        console.log(response.data);
      }
    } catch (error) {
      dispatch(errorToast("Error fetching lists"));
      console.log("Error fetching lists", error);
    }
  };
  const fetchAutomatizations = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchLists();
    fetchAutomatizations();
  }, []);

  const handleModalClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        {/* <div className=""> */}
        <ListsList lists={lists} modalOpen={handleModalClose} />
        {/* </div> */}
      </div>
      {isOpen && (
        <AddModal
          onClose={handleModalClose}
          automatizations={automatizations}
        />
      )}
    </div>
  );
}

export default ListsPage;
