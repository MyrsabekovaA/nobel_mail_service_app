import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sidebarActions } from "/@/GlobalStates/Sidebar";
import { languageActions, LANGUAGE_IMG } from "/@/GlobalStates/Language";
import { themeActions, THEME_NAMES } from "/@/GlobalStates/Theme";
import English from "/Flag_of_the_U.S..svg";
import Ukrainian from "/Flag_of_Ukraine.svg";
import "./Header.css";
import { Icon } from "@iconify/react";
import { Image } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

const Header = (props) => {
  const dispatch = useDispatch();

  const sidebarOpenned = useSelector((state) => state.sidebar.openned);
  const toggleSidebar = sidebarActions.toggleSidebarOpenned;

  const language = useSelector((state) => state.language.value);
  const languageImg = LANGUAGE_IMG[language];
  const changeLanguage = (languageName) => {
    return dispatch(languageActions.setLanguage({ language: languageName }));
  };

  const theme = useSelector((state) => state.theme.value);
  const themeForward = () => dispatch(themeActions.nextTheme());

  return (
    <header
      className={`flex w-full bg-white shadow-md p-1 lg:h-20 h-16 justify-between`}
    >
      <button
        onClick={() => dispatch(toggleSidebar())}
        className={`menu-button transition-opacity justify-self-start duration-300 ${
          sidebarOpenned ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Icon icon="material-symbols:menu" />
      </button>
      <div className="flex items-center space-x-4">
        <button onClick={themeForward} className="p-2">
          <Icon
            icon={["ph:moon", "ph:sun"][THEME_NAMES.indexOf(theme)]}
            className="text-lg"
          />
        </button>
        <Dropdown align="end" id="lang_dropdown">
          <Dropdown.Toggle variant="transparent" className="p-2">
            <Image src={languageImg} className="w-6 h-6" alt="Language" />
          </Dropdown.Toggle>

          <Dropdown.Menu
            className="bg-white text-gray-800 transition-shadow duration-300 ease-in-out rounded-lg shadow-dropdown w-28 p-2"
            style={{ width: "114px", maxHeight: "180px" }}
          >
            <Dropdown.Item
              className="outline-none border-0 m-0 rounded-none p-0 flex items-center justify-start relative"
              onClick={() => changeLanguage("English")}
            >
              <Image src={English} className="w-6 h-6 mr-2" /> English
            </Dropdown.Item>

            <Dropdown.Item
              className="outline-none border-0 m-0 rounded-none p-0 flex items-center justify-start relative"
              onClick={() => changeLanguage("Ukrainian")}
            >
              <Image src={Ukrainian} className="w-6 h-6 mr-2" /> Українська
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button className="p-2">
          <Icon icon="fluent:alert-24-regular" />
        </button>
        <Dropdown>
          <Dropdown.Toggle variant="transparent" className="p-2">
            <Icon icon="ph:user" className="text-lg" />
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
