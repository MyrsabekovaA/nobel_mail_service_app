import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from "/@/GlobalStates/Contacts";
import { fetchTemplates } from '/@/GlobalStates/Templates';
import CustomDatepicker from "/@/components/CustomDatepicker/CustomDatepicker";

function PromoEmails() {
    const dispatch = useDispatch();
    const { contacts, isLoading } = useSelector((state) => state.contacts);
    const { templates } = useSelector((state) => state.templates);
    const [selectedContacts, setSelectedContacts] = useState({});
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        dispatch(fetchTemplates());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchContacts({ search: searchQuery, page: 1 }));
    }, [dispatch, searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!inputRef.current.contains(event.target) && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggleContactSelection = (contactEmail) => {
        setSelectedContacts(prevSelected => ({
            ...prevSelected,
            [contactEmail]: prevSelected[contactEmail] ? undefined : true
        }));
    };
    const renderSelectedContacts = () => {
        return Object.keys(selectedContacts).map(email => (
            <span key={email} className="selected-email-tag items-center p-2 border border-gray-300 rounded w-full mb-3 bg-white">
                {email}
                <button onClick={() => handleToggleContactSelection(email)}>×</button>
            </span>
        ));
    };

    return (
        <div className="w-full mt-4 my-4 bg-white p-4 flex gap-4">
            <div className="flex-1 relative m-auto">
                <div className="flex flex-wrap items-center p-2 m-auto">
                    {Object.keys(selectedContacts).map(email => (
                        <span key={email} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded flex items-center mb-2">
                            {email}
                            <button onClick={() => handleToggleContactSelection(email)} className="ml-1 text-blue-500 hover:text-blue-700">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </span>
                    ))}
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        className="mb-2 p-2 border border-gray-300 rounded w-full focus:outline-none"
                    />
                </div>
                {showDropdown && (
                    <div ref={dropdownRef}
                         className="absolute top-full left-0 w-full bg-white border border-t-0 border-gray-300 z-10 max-h-[300px] overflow-y-auto">
                        {contacts.map((contact) => (
                            <div key={contact.email} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                 onClick={() => handleToggleContactSelection(contact.email)}>
                                <input type="checkbox" checked={!!selectedContacts[contact.email]} readOnly className="mr-2" />
                                {`${contact.firstName} ${contact.lastName} - ${contact.email}`}
                            </div>
                        ))}
                        {isLoading && <p>Loading...</p>}
                    </div>
                )}
            </div>
            <div className="flex justify-between flex-1 max-h-[50px] m-auto">
                <select
                    id="template"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">Select a Template</option>
                    {templates.map((template) => (
                        <option key={template.id} value={template.id}>{template.name}</option>
                    ))}
                </select>
                <CustomDatepicker />
            </div>
        </div>
    );
}

export default PromoEmails;