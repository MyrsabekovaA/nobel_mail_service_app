import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { sidebarActions } from "/@/GlobalStates/Sidebar";
import { toggleDarkMode } from "/@/GlobalStates/DarkMode";
import "./Header.css";
import DropDownIcon from "/@/components/DropDownIcon/DropDownIcon";
import userImage from "/user.png";
import { logOut } from "/@/GlobalStates/LoggedIn";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "/@/routesControll/loaders";
import LoginForm from "/@views/LoginForm/LoginForm";

const Header = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector((state) => state.darkMode.enabled);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.loggedIn.user);
  const navigate = useNavigate();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        sidebarActions.setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleToggleSidebar = () => {
    dispatch(sidebarActions.toggleSidebarOpened());
  };

  const iconColor = isDarkModeEnabled ? "white" : "black";

  const profileOptions = [
    {
      text: "Setitngs",
      icon: <Icon icon="solar:settings-linear" width="24" />,
    },
    {
      text: "Logout",
      icon: <Icon icon="bx:log-out" width="24" />,
    },
  ];

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleProfileDropdownToggle = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header
      className={`fixed z-40 top-0 flex w-full border-b dark:bg-compdark border-lightgreen shadow-sm 
        dark:border-gray`}
    >
      <div className="flex w-full items-center px-4 py-4 justify-between md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={handleToggleSidebar}>
            <Icon icon="material-symbols:menu" />
          </button>
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <li
              className="relative flex h-10 w-10 items-center justify-center rounded-full
                        border-[0.5px]
                        border-stroke bg-lightgreen dark:border-strokedark dark:bg-meta-4 dark:text-white"
            >
              <button onClick={handleToggleDarkMode} className="p-2">
                <Icon
                  icon={isDarkModeEnabled ? "ph:moon" : "ph:sun"}
                  className="text-lg w-6 h-6"
                />
              </button>
            </li>
          </ul>
          <div className="relative">
            <div className="flex items-center gap-4">
              <DropDownIcon
                icon={
                  <img
                    src={userImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                }
                additionalIcon={
                  <Icon
                    icon={
                      isProfileDropdownOpen
                        ? "iconamoon:arrow-down-2"
                        : "iconamoon:arrow-up-2"
                    }
                  />
                }
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
