import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { sidebarActions } from '/@/GlobalStates/Sidebar';
import English from '/Flag_of_the_U.S..svg';
import Ukrainian from '/Flag_of_Ukraine.svg';
import './Header.css';
import {Icon} from '@iconify/react';
import {Image, Dropdown} from "react-bootstrap";

const Header = (props) => {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(English);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch()

    const sidebarOpenned = useSelector((state)=>state.sidebar.openned)
    const toggleSidebar = sidebarActions.toggleSidebarOpenned
    const handleSelectLanguage = (languageFlag) => {
        setSelectedLanguage(languageFlag);
        setShowDropdown(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleToggleDropdown = (isOpen) => {
        setShowDropdown(isOpen);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <header className={`flex w-full bg-white shadow-md p-1 lg:h-20 h-16 justify-between`}>
            
                <button onClick={()=>dispatch(toggleSidebar())}
                        className={`menu-button transition-opacity justify-self-start duration-300 ${sidebarOpenned ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <Icon icon="material-symbols:menu" />
                </button>
            <div className="flex items-center space-x-4">
                <button onClick={toggleDarkMode} className="p-2">
                    <Icon icon={darkMode ? "ph:moon" : "ph:sun"} className="text-lg"/>
                </button>
                <Dropdown show={showDropdown} onToggle={handleToggleDropdown} align="end" className="relative">
                    <Dropdown.Toggle variant="transparent" className="p-2">
                        <Image src={selectedLanguage} className="w-6 h-6" alt="Language" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="bg-white text-gray-800 transition-shadow duration-300 ease-in-out rounded-lg shadow-dropdown mt-2 ml-1.5 w-28" style={{ width: '114px', maxHeight: '180px' }}>
                        <Dropdown.Item className="outline-none border-0 m-0 rounded-none p-0 flex items-center justify-start relative"
                                       onClick={() => handleSelectLanguage(English)}>
                            <Image src={English} className="w-6 h-6 mr-2"/> English
                        </Dropdown.Item>
                        <Dropdown.Item className="outline-none border-0 m-0 rounded-none p-0 flex items-center justify-start relative"
                                       onClick={() => handleSelectLanguage(Ukrainian)}>
                            <Image src={Ukrainian} className="w-6 h-6 mr-2"/> Українська
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <button onClick={toggleDarkMode} className="p-2">
                    <Icon icon="fluent:alert-24-regular" />
                </button>
                <Dropdown>
                    <Dropdown.Toggle variant="transparent" className="p-2">
                        <Icon icon="ph:user" className="text-lg"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                        <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;