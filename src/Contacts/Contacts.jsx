import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '/@/Contacts/Contacts.css'

import ContactsTable from './ContactsTable/ContactsTable';
import Pagination from './Pagination/Pagination';
import DeleteModal from './Modals/DeleteModal/DeleteModal';
import CreateModal from './Modals/CreateModal/CreateModal';
import EditModal from './Modals/EditModal/EditModal';

function Contacts() {
    const [contacts, setContacts] = useState([
        {
            "id": 1,
            "firstName": "Alice",
            "lastName": "Johnson",
            "email": "alice@example.com",
            "age": 30,
            "country": "Canada",
            "timezone": "GMT-04:00",
            "sourceOfReferral": "Website",
            "eduQuestSelectedDateTime": "2023-10-03T15:45:00Z",
            "eduQuestDecision": "Pending"
          },
          {
            "id": 2,
            "firstName": "Bob",
            "lastName": "Smith",
            "email": "bob@example.com",
            "age": 28,
            "country": "United Kingdom",
            "timezone": "GMT+00:00",
            "sourceOfReferral": "Email",
            "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
            "eduQuestDecision": "Selected"
          }
    ]); // fetched contacts
    const [totalContacts, setTotalContacts] = useState(1000); // will be also fetched from request
    const [currentPage, setCurrentPage] = useState(1); // current page state, changed onClick on paggination button
    const [contactsPerPage] = useState(50); // i'm suggesting to create a field where you can change this value
    const [totalPages, setTotalPages] = useState(0); // idealy fetched from request
    const [searchQuery, setSearchQuery] = useState(''); // search input
    const [selectedContacts, setSelectedContacts] = useState([]); // checked contacts
    //? *probably would be better to move it in global state than lifting data from contactRow component. 
    const [selectAll, setSelectAll] = useState(false);
    const [newContact, setNewContact] = useState({}); // new contact object

    // modal display states
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    
    const fetchData = async (page, search = '') => {
        try {
            const response = await axios.get(`/api/contacts`, {
                params: {
                    page: page,
                    limit: contactsPerPage,
                    search: search
                }
            });
            // Assuming the response has data and total pages
            // setContacts(response.data.contacts);
            // setTotalPages(response.data.totalPages);
            // setTotalContacts(response.data.totalContacts)
            setTotalPages(20);

        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        fetchData(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSelectContact = (contact, isSelected) => {
        if (isSelected) {
            setSelectedContacts(prevContacts => [...prevContacts, contact]);
        } else {
            setSelectedContacts(prevContacts => prevContacts.filter(c => c.id !== contact.id));
        }
    };

    const handleSelectAllChange = (isSelected) => {
        setSelectAll(isSelected);
        if (isSelected) {
            setSelectedContacts(contacts); // Select all contacts on the current page
        } else {
            setSelectedContacts([]); // Deselect all contacts
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

    const handleContactCreate = (contactData) => {
        setNewContact(contactData);
        try {
            const response = axios.create(`api/contactsCreate/`, {newContact})
        } catch(error) {
            console.error('Error creating contact:', error)
        }
    };

    const handleContactsEdit = () => {
        if(selectedContacts.length > 1) {
            try {
                console.log('bulk editing');
                const response = axios.put(`/api/contactsBulkUpdate/`);

                if(response.status.ok) {
                    // set loader to false
                }
            } catch (error) {
                console.error('Error updateing contacts:', error);
            }  
        }
    };

    const handleContactsDelete = () => {
        // bulk delete
        if(selectedContacts.length > 1) {
            try {
                console.log('bulk delete');
                const idsToDelete = selectedContacts.map(contact => contact.id);
                const response = axios.delete(`/api/contactsBulkDelete/${idsToDelete}`);

                if(response.status.ok) {
                    // set loader to false
                }
            } catch (error) {
                console.error('Error deleting contacts:', error);
            }   
        } else {
            //delete one contact
            try {
                console.log('one delete');
                const response = axios.delete(`/api/contactsDelete/${selectedContacts[0].id}`);

                if(response.status.ok) {
                    // set loader to false
                }
            } catch(error) {
                console.error('Error deleting contact:', error);
            }
        }
    };

    return (
        <div>
            <div className='min-h-full h-screen bg-slate-100 dark:bg-gray-900  mt-10'>
                <div className='container mx-auto px-4'>
                    {/* top */}
                    <div className='flex gap-4 flex-wrap justify-between'>
                        <div className='flex gap-2'>
                            <button
                                onClick={handleEditModalDisplay} 
                                className='action-btn'
                            >
                                Edit
                            </button>
                            {selectedContacts.length === 0 && (
                                <button
                                    onClick={handleCreateModalDisplay} 
                                    className='action-btn'
                                >
                                    Add
                                </button>
                            )}
                            {selectedContacts.length > 0 && (
                                <button
                                    onClick={handleDeleteModalDisplay} 
                                    className='action-btn delete-btn'
                                >
                                    Delete
                                </button>
                            )}
                        </div>

                        <div className='flex items-center gap-4 flex-wrap'>
                            <div>
                                FILTER
                            </div>
                            <form className='flex items-center'>   
                                <label htmlFor='simple-search' className='sr-only'>Search</label>
                                <div className='relative w-full'>
                                    <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                                        <svg className='w-4 h-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                                            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'/>
                                        </svg>
                                    </div>
                                    <input
                                        onChange={handleSearch} 
                                        type='text' 
                                        placeholder='Search...' 
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
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
                    {contacts.length > 50 && (
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onChange={handlePageChange}
                            contactsPerPage={contactsPerPage}
                            totalContacts={totalContacts}
                        />
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
        </div>
    );
}

export default Contacts;