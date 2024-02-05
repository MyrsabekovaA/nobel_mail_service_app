import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./NavMenu.css";
import { useSelector } from "react-redux";

const NavMenu = () => {
  //page pagination
  let emailTemplatesPage = useSelector((state) => state.emailTemplates.page);
  return (
    <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
      <div>
        <h3 className="mb-4 ml-4 text-sm font-semibold dark:text-gray title">
          MENU
        </h3>

        <ul className="mb-6 flex flex-col gap-1 list">
          <li>
            <NavLink
              to="/home/contacts"
              className="group relative flex items-center gap-2 rounded-sm py-2 px-3
                                 font-medium
                                 text-black-2 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4
                                 dark:text-white hover:text-whiten"
            >
              <Icon icon="uil:users-alt" className="text-xl" />
              <span className="ml-2">Contacts</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/lists"
              className="group relative flex items-center gap-2 rounded-sm py-2 px-3
                                 font-medium
                                 text-black-2 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4
                                 dark:text-white hover:text-whiten"
            >
              <Icon icon="bi:list-task" className="text-xl" />
              <span className="ml-2">Lists</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/intakes"
              className="group relative flex items-center gap-2 rounded-sm py-2 px-3
                                 font-medium
                                 text-black-2 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4
                                 dark:text-white hover:text-whiten"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                />
              </svg>

              <span className="ml-2">Intakes</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/automations"
              className="group relative flex items-center gap-2 rounded-sm
                        py-2 px-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-secondary hover:text-whiten
                        dark:hover:bg-meta-4 dark:text-white"
            >
              <Icon
                icon="material-symbols:schedule-outline"
                className="text-xl"
              />
              <span className="ml-2">Automations</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/home/emailTemplates/${emailTemplatesPage}`}
              className="group relative flex items-center gap-2 rounded-sm
                        py-2 px-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-secondary hover:text-whiten
                        dark:hover:bg-meta-4 dark:text-white"
            >
              <Icon
                icon="material-symbols:drafts-outline"
                className="text-xl"
              />
              <span className="ml-2">Mail Templates</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
