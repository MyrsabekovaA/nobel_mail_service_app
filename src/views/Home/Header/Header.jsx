import React, { useState, useRef, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Icon } from '@iconify/react';
import { sidebarActions } from '/@/GlobalStates/Sidebar';
import { toggleDarkMode } from '/@/GlobalStates/DarkMode';
import './Header.css';
import NotificationDropdown from "/@/components/NotificationDropdown/NotificationDropdown";
import DropDownIcon from "/@/components/DropDownIcon/DropDownIcon";
import {LANGUAGE_IMG, languageActions} from "/@/GlobalStates/Language";
import English from "/Flag_of_the_U.S.png";
import Ukrainian from "/Flag_of_Ukraine.png";
import userImage from "/user.png";

const Header = ({ isSidebarOpen}) => {
    const dispatch = useDispatch();
    const isDarkModeEnabled = useSelector((state) => state.darkMode.enabled);
    const dropdownRef = useRef(null);

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                sidebarActions.setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleToggleSidebar = () => {
        dispatch(sidebarActions.setTrueSidebarOpened());
    };

    const iconColor = isDarkModeEnabled ? 'white' : 'black';

    const notifications = [
        {
            message: 'Message Sent',
            isError: false,
            date: '2023-09-01',
            time: '10:00 AM',
        },
        {
            message: 'Error Sending Message',
            isError: true,
            date: '2023-09-01',
            time: '11:00 AM',
        },
    ];

    const currentLanguage = useSelector((state) => state.language.value);

    const languageOptions = [
        {
            text: "English",
            onClick: () => dispatch(languageActions.setLanguage("English")),
            image: English
        },
        {
            text: "Ukrainian",
            onClick: () => dispatch(languageActions.setLanguage("Ukrainian")),
            image: Ukrainian
        },
    ];

    const profileOptions = [
        {
            text: "Setitngs",
            icon: <Icon icon="solar:settings-linear"  width="24" />
        },
        {
            text: "Logout",
            icon: <Icon icon="bx:log-out" width="24" />
        },
    ];

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleProfileDropdownToggle = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    return (
        <header className={`sticky top-0 flex w-full border-b dark:bg-compdark border-lightgreen shadow-sm 
        dark:border-gray
        ${isSidebarOpen ? 'fixed inset-0 bg-opacity-50 z-30' : ''}`}>
            <div className='flex w-full items-center px-4 py-4 justify-between lg:justify-end md:px-6 2xl:px-11'>
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button onClick={handleToggleSidebar}>
                        <Icon icon="material-symbols:menu"/>
                    </button>
                </div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <li className="relative flex h-10 w-10 items-center justify-center rounded-full
                        border-[0.5px]
                        border-stroke bg-lightgreen dark:border-strokedark dark:bg-meta-4 dark:text-white">
                            <button onClick={handleToggleDarkMode} className="p-2">
                                <Icon icon={isDarkModeEnabled ? "ph:moon" : "ph:sun"} className="text-lg w-6 h-6"/>
                            </button>
                        </li>
                        <li className="relative flex h-10 w-10 items-center justify-center rounded-full
                        border-[0.5px]
                        border-stroke bg-lightgreen hover:text-primary dark:border-strokedark dark:bg-meta-4
                        dark:text-white">
                            <NotificationDropdown
                                icon={<Icon icon="mingcute:notification-line" color={iconColor} width="24"
                                            height="24" />}
                                notifications={notifications}/>
                        </li>
                        <li className="relative flex h-10 w-10 items-center justify-center rounded-full
                        border-[0.5px]
                        border-stroke bg-lightgreen hover:text-primary dark:border-strokedark dark:bg-meta-4
                        dark:text-white">
                            <DropDownIcon
                                icon={<img src={LANGUAGE_IMG[currentLanguage]} alt="Language"
                                           className="w-6 h-6"/>}
                                options={languageOptions}
                            />
                        </li>
                    </ul>
                    <div className="relative">
                        <div className="flex items-center gap-4">
                            <DropDownIcon
                                icon={<img src={userImage} alt="Profile" className="w-12 h-12 rounded-full" />}
                                additionalIcon={<Icon icon={isProfileDropdownOpen ? "iconamoon:arrow-down-2" :
                                    "iconamoon:arrow-up-2"} />}
                                options={profileOptions}
                                onToggle={handleProfileDropdownToggle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
);
};

export default Header;
