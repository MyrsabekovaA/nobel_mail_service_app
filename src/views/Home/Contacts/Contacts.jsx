import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Contacts.css";

import ContactsTable from "./ContactsTable/ContactsTable";
import Pagination from "./Pagination/Pagination";
import DeleteModal from "./Modals/DeleteModal/DeleteModal";
import CreateModal from "./Modals/CreateModal/CreateModal";
import EditModal from "./Modals/EditModal/EditModal";
import DropdownFilter from "../../../components/DropDownFilter/DropdownFilter";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "../../../GlobalStates/Toasts";

function Contacts() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loggedIn.token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);
  const [contacts, setContacts] = useState([]); // fetched contacts
  const [totalContacts, setTotalContacts] = useState(1000); // will be also fetched from request
  const [currentPage, setCurrentPage] = useState(1); // current page state, changed onClick on paggination button
  const [contactsPerPage, setContactsPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(0); // idealy fetched from request
  const [searchQuery, setSearchQuery] = useState(""); // search input
  const [selectedContacts, setSelectedContacts] = useState([]); // checked contacts
  const [selectAll, setSelectAll] = useState(false);
  // modal display states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async (page, search = "") => {
    try {
      let params = {
        pageSize: Number(contactsPerPage),
      };

      if (search) {
        params.search = search;
      } else {
        params.page = Number(page);
      }
      setIsLoading(true);
      const response = await axios.get(`http://52.59.202.2:3000/api/contacts`, {
        params: params,
        headers: headers,
      });

      setContacts(response.data.contacts);
      setTotalContacts(response.data.contactsCount);
      setTotalPages(Math.ceil(totalContacts / contactsPerPage));
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(currentPage, searchQuery);
    setSelectAll(false);
    setSelectedContacts([]);
  }, [currentPage, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectContact = (contact, isSelected) => {
    if (isSelected) {
      setSelectedContacts((prevContacts) => [...prevContacts, contact]);
    } else {
      setSelectedContacts((prevContacts) =>
        prevContacts.filter((c) => c.id !== contact.id)
      );
    }
  };

  const handleSelectAllChange = (isSelected) => {
    setSelectAll(isSelected);
    if (isSelected) {
      setSelectedContacts(contacts);
    } else {
      setSelectedContacts([]);
    }
  };

  const handleDeleteModalDisplay = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleCreateModalDisplay = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleEditModalDisplay = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };
  // cruds
  const handleContactCreate = async (contactData) => {
    try {
      const response = await axios.post(
        `http://52.59.202.2:3000/api/contacts/`,
        {
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          age: Number(contactData.age),
          city: contactData.city,
          email: contactData.email,
          gender: contactData.gender,
          country: contactData.country,
          timezone: contactData.timezone,
          occupation: contactData.occupation,
          sourceOfReferral: "Telegram", //contactData.sourceOfReferral,
          eduQuestDecision: new Date(), //contactData.eduQuestDecision,
          intershipMotivation: "test", //contactData.intershipMotivation,
          birthDate: contactData.birthDate,
          eduQuestSelectedDateTime: new Date(),
          // contactData.eduQuestSelectedDateTime
        },
        { headers: headers }
      );
      if (response.status === 200 || response.status === 201) {
        console.log("Contact created successfully");
        dispatch(
          successToast(`Successfully created ${contactData.email} contact!`)
        );

        fetchData(currentPage, searchQuery);
      }
    } catch (error) {
      console.error("Error creating contact:", error);
      dispatch(errorToast(`Failed to create ${contactData.email} contact.`));
    } finally {
      setIsCreateModalOpen(false);
    }
  };

  const handleContactsEdit = async (updatedData) => {
    if (selectedContacts.length > 1) {
      try {
        const selectedIds = selectedContacts.map((contact) => contact.id);
        console.log("bulk editing");
        const response = await axios.put(
          `http://52.59.202.2:3000/api/contacts`,
          {
            contactIds: selectedIds,
            updates: updatedData,
          },
          { headers: headers }
        );

        if (response.status === 200) {
          console.log("Contacts updated successfully");
          dispatch(successToast("Contacts updated successfully!"));
          fetchData(currentPage, searchQuery);
        }
      } catch (error) {
        console.error("Error updating contacts:", error);
        dispatch(errorToast(`Error updating contacts."`));
      }
    } else {
      try {
        setIsOverlayLoading(true);
        const response = await axios.put(
          `http://52.59.202.2:3000/api/contacts/${selectedContacts[0].id}`,
          updatedData,
          { headers: headers }
        );
        if (response.status === 200) {
          dispatch(successToast("Successfully updated!"));
          fetchData(currentPage, searchQuery);
        }
      } catch (error) {
        console.error("Error updating contact:", error);
        dispatch(errorToast("Error updating contact."));
      } finally {
        setIsOverlayLoading(false);
      }
    }
  };

  const handleContactsDelete = async () => {
    if (selectedContacts.length > 1) {
      try {
        setIsOverlayLoading(true);
        const idsToDelete = selectedContacts.map((contact) => contact.id);
        const response = await axios.delete(
          `http://52.59.202.2:3000/api/contacts/`,
          {
            headers: headers,
            data: { contactIds: idsToDelete },
          }
        );

        if (response.status === 204) {
          console.log("Contacts deleted successfully");
          dispatch(
            successToast(
              `Successfully deleted "${selectedContacts.length}" contacts!`
            )
          );
          fetchData(currentPage, searchQuery);
          setSelectedContacts([]);
        }
      } catch (error) {
        console.error("Error deleting contacts:", error);
        dispatch(
          errorToast(`Failed to delete "${selectedContacts.length}" contacts.`)
        );
      } finally {
        setIsOverlayLoading(false);
        handleDeleteModalDisplay();
      }
    } else {
      //delete one contact
      try {
        setIsOverlayLoading(true);
        const response = await axios.delete(
          `http://52.59.202.2:3000/api/contacts/${selectedContacts[0].id}`,
          { headers: headers }
        );

        if (response.status === 204) {
          console.log("Contact deleted successfully");
          fetchData(currentPage, searchQuery);
          setSelectedContacts([]);
          dispatch(
            successToast(`Successfully deleted "${selectedContacts[0].email}"!`)
          );
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
        dispatch(errorToast(`Failed to delete ${selectedContacts[0].email}.`));
      } finally {
        setIsOverlayLoading(false);
        handleDeleteModalDisplay();
      }
    }
  };

  return (
    <div className="h-screen bg-slate-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="py-10 flex flex-col gap-3">
          {/* top */}
          <div className="flex gap-4 flex-wrap justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={handleEditModalDisplay} className="action-btn">
                Edit
              </button>
              {selectedContacts.length === 0 && (
                <button
                  onClick={handleCreateModalDisplay}
                  className="action-btn"
                >
                  Add
                </button>
              )}
              {selectedContacts.length > 0 && (
                <button
                  onClick={handleDeleteModalDisplay}
                  className="action-btn delete-btn"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div>
                <DropdownFilter />
              </div>
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </form>
            </div>
          </div>
          <ContactsTable
            contacts={contacts}
            onSelectContact={handleSelectContact}
            selectAll={selectAll}
            onCheckAllChange={handleSelectAllChange}
          />

          {isLoading && <LoadingSpinner />}
          {/* {contacts.length >= contactsPerPage && ( */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
            contactsPerPage={contactsPerPage}
            totalContacts={totalContacts}
          />
          {/* )} */}
          {contacts.length > contactsPerPage && (
            <div className="flex justify-end mt-4 items-center gap-2">
              <label
                htmlFor="contacts-per-page"
                className="text-slate-800 text-slate-200"
              >
                Contacts per page:
              </label>
              <select
                id="contacts-per-page"
                onChange={(e) => setContactsPerPage(Number(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-200 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          )}
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          contactsToDelete={selectedContacts}
          onClose={handleDeleteModalDisplay}
          onConfirm={handleContactsDelete}
        />
      )}
      {isCreateModalOpen && (
        <CreateModal
          onClose={handleCreateModalDisplay}
          onCreate={handleContactCreate}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          contactsToEdit={selectedContacts}
          onClose={handleEditModalDisplay}
          onEdit={handleContactsEdit}
          totalContacts={totalContacts}
        />
      )}
      {isOverlayLoading && <LoadingOverlay />}
    </div>
  );
}

export default Contacts;
