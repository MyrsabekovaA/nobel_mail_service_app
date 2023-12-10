import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import {Image} from "react-bootstrap";
import Logo from '/Nobel_logo.png';
import './SideBar.css';

const Sidebar = ({ isSidebarOpen, onToggleSidebar }) => {
    const toggleSidebar = () => {
        onToggleSidebar(!isSidebarOpen);
    };

    return (
        <div className={`relative bg-white-800 text-white ${isSidebarOpen ? 'w-70' : 'w-24'} h-full sidebar`}>
            <div>
                <div className="flex items-center" style={{ marginTop: '20px', marginLeft: isSidebarOpen ? '32px' : '30px' }}>
                    <Image src={Logo} style={{ height: '40px', width: '40px' }} />
                </div>
                {isSidebarOpen && (
                    <button onClick={toggleSidebar} className="absolute top-8 right-7 text-xl text-white">
                        <Icon icon="material-symbols:close" color="black" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;