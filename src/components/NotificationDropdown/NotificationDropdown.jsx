import React, { useState, useRef, useEffect } from 'react';
import './NotificationDropdown.css';

const NotificationDropdown = ({ icon, notifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
                {icon}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2.5 shadow-lg w-60 text-black flex h-90 flex-col rounded-sm
                 border border-stroke shadow-default dark:border-strokedark dark:bg-compdark sm:right-0 sm:w-80
                 dropdown cursor-pointer
                ">
                    {notifications.map((notification, index) => (
                        <div key={index} className="p-2 hover:bg-lightgreen dark:hover:bg-lightgray border-b border-gray
                        last:border-b-0 dark:text-white">
                            <div className={`font-semibold ${notification.isError ? '' : ''}`}>
                                {notification.message}
                            </div>
                            <div className="text-sm text-gray">
                                {notification.date} - {notification.time}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;