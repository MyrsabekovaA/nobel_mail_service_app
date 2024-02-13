import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Contacts.css";

import ContactsTable from "./ContactsTable/ContactsTable";
import Pagination from "../../../components/Pagination/Pagination";
import DeleteModal from "./Modals/DeleteModal/DeleteModal";
import CreateModal from "./Modals/CreateModal/CreateModal";
import EditModal from "./Modals/EditModal/EditModal";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import DropdownFilter from "../../../components/DropdownFilter/DropdownFilter";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "/@/GlobalStates/Toasts";

function Contacts() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loggedIn.token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);
  const [isElementsHidden, setIsElementsHidden] = useState(false);
  const [contacts, setContacts] = useState([]); // fetched contacts
  const [totalContacts, setTotalContacts] = useState(1000); // will be also fetched from request
  const [currentPage, setCurrentPage] = useState(1); // current page state, changed onClick on paggination button
  const [contactsPerPage, setContactsPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(0); // idealy fetched from request
  const [searchQuery, setSearchQuery] = useState(""); // search input
  const [selectedContacts, setSelectedContacts] = useState([]); // checked contacts
  const [selectAll, setSelectAll] = useState(false);
  const [lists, setLists] = useState([]);
  // modal display states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [areFiltersApplied, setAreFiltersApplied] = useState(false);
  const [selectedList, setSelectedList] = useState("");
  const [checkedItems, setCheckedItems] = useState({
    eqLists: [],
    statuses: [],
  });

  const fetchData = async (
    page,
    search = "",
    contactsPerPage,
    selectedList
  ) => {
    try {
      let params = {
        sortBy: "createdAt",
        sortOrder: "desc",
      };
      console.log(selectedList);
      if (search || selectedList) {
        if (search) {
          params.search = search;
        }
        if (selectedList) {
          params.listIds = selectedList;
          params.pageSize = Number(contactsPerPage);
          params.page = Number(page);
        }
      } else {
        params.pageSize = Number(contactsPerPage);
        params.page = Number(page);
      }

      setIsLoading(true);

      const response = await axios.get(
        `https://mail-service-412008.ey.r.appspot.com/api/contacts`,
        {
          params: params,
          headers: headers,
        }
      );

      setContacts(response.data.contacts);
      setTotalContacts(response.data.contactsCount);
      setTotalPages(Math.ceil(totalContacts / contactsPerPage));
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckedItemsChange = (newCheckedItems) => {
    setCheckedItems(newCheckedItems);

    const isFilterActive = Object.values(newCheckedItems).some(
      (category) => Array.isArray(category) && category.length > 0
    );

    setAreFiltersApplied(isFilterActive);
  };

  const fetchLists = async () => {
    try {
      const response = await axios.get(
        `https://mail-service-412008.ey.r.appspot.com/api/contacts-lists`,
        { headers: headers }
      );

      if (response.status === 200) {
        setLists(response.data);
      }
    } catch (error) {
      dispatch(errorToast("Error fetching lists"));
      console.log("Error fetching lists", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchQuery, contactsPerPage, selectedList);
    setSelectAll(false);
    setSelectedContacts([]);
  }, [currentPage, searchQuery, contactsPerPage, selectedList]);

  useEffect(() => {
    setCurrentPage(1);
    fetchData(1, searchQuery, contactsPerPage, selectedList);
  }, [selectedList]);

  useEffect(() => {
    fetchLists();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    if (e.target.value) {
      setSearchQuery(e.target.value);
      setIsElementsHidden(true);
    } else {
      setSearchQuery("");
      setIsElementsHidden(false);
    }
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
        `https://mail-service-412008.ey.r.appspot.com/api/contacts/`,
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
          sourceOfReferral: contactData.sourceOfReferral,
          intershipMotivation: contactData.intershipMotivation,
          birthDate: contactData.birthDate,
          eduQuestSelectedDateTime: contactData.eduQuestSelectedDateTime,
        },
        { headers: headers }
      );
      if (response.status === 200 || response.status === 201) {
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
        const response = await axios.put(
          `https://mail-service-412008.ey.r.appspot.com/api/contacts`,
          {
            contactIds: selectedIds,
            updates: updatedData,
          },
          { headers: headers }
        );

        if (response.status === 200) {
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
          `https://mail-service-412008.ey.r.appspot.com/api/contacts/${selectedContacts[0].id}`,
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
          `https://mail-service-412008.ey.r.appspot.com/api/contacts/`,
          {
            headers: headers,
            data: { contactIds: idsToDelete },
          }
        );

        if (response.status === 204) {
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
          `https://mail-service-412008.ey.r.appspot.com/api/contacts/${selectedContacts[0].id}`,
          { headers: headers }
        );

        if (response.status === 204) {
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
    <div className="">
      <div className="container mx-auto px-4">
        <div className="py-10 flex flex-col gap-3">
          {/* top */}
          <div className="flex gap-4 flex-wrap justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={handleEditModalDisplay} className="action-btn">
                Edit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              {selectedContacts.length === 0 && (
                <button
                  onClick={handleCreateModalDisplay}
                  className="action-btn"
                >
                  Add
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              )}
              {selectedContacts.length > 0 && (
                <button
                  onClick={handleDeleteModalDisplay}
                  className="delete-btn"
                >
                  Delete
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                onChange={(e) => setSelectedList(e.target.value)}
                className=" w-52 cursor-pointer flex gap-2 items-center text-compdark dark:text-whiten bg-whiten dark:bg-meta-4 hover:bg-gray-3 dark:hover:bg-graydark shadow-lg border border-gray/50 font-medium py-2 px-4 rounded transition-all duration-200;"
              >
                <option disabled selected>
                  Filter by List
                </option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
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
                    className="bg-transparent dark:bg-graydark appearance-none border border-lightgray  text-sm rounded-lg block w-full ps-10 p-2.5 dark:border-gray/50  dark:text-white"
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
          {!isElementsHidden && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={handlePageChange}
              itemsPerPage={contactsPerPage}
              totalItems={totalContacts}
            />
          )}
          {!isElementsHidden && (
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
                className="bg-whiten border border-gray/50 text-graydark text-sm rounded-lg focus:ring-meta-5 focus:border-meta-5 p-2.5 dark:bg-compdark dark:border-gray/50 dark:placeholder-gray/50 dark:text-whiten dark:focus:ring-meta-5 dark:focus:border-green300"
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
