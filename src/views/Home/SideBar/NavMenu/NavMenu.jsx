import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';
import "./NavMenu.css";
import { useSelector } from "react-redux";

const NavMenu = () => {
    //page pagination
    let emailTemplatesPage = useSelector(state=>state.emailTemplates.page)
    return (
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
            <div>
                <h3 className="mb-4 ml-4 text-sm font-semibold dark:text-gray title">
                    MENU
                </h3>

                <ul  className="mb-6 flex flex-col gap-1 list">
                    <li>
                        <NavLink to="/home/contacts"
                                 className='group relative flex items-center gap-2 rounded-sm py-2 px-3
                                 font-medium
                                 text-black-2 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4
                                 dark:text-white'>
                            <Icon icon="uil:users-alt" className="text-xl" />
                            <span className="ml-2">Contacts</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/home/automatizations" className='group relative flex items-center gap-2 rounded-sm
                        py-2 px-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-secondary
                        dark:hover:bg-meta-4 dark:text-white'>
                            <Icon icon="material-symbols:schedule-outline" className="text-xl" />
                            <span className="ml-2">Automatizations</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/home/emailTemplates/${emailTemplatesPage}`} className='group relative flex items-center gap-2 rounded-sm
                        py-2 px-3 font-medium text-black-2 duration-300 ease-in-out hover:bg-secondary
                        dark:hover:bg-meta-4 dark:text-white'>
                            <Icon icon="material-symbols:drafts-outline" className="text-xl" />
                            <span className="ml-2">Mail Templates</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavMenu