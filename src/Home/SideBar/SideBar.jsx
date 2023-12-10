import React, { useState } from 'react';
import { sidebarActions } from '/@/GlobalStates/Sidebar';
import { Icon } from '@iconify/react';
import {Image} from "react-bootstrap";
import Logo from '/Nobel_logo.png';
import './SideBar.css';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = (props) => {
    let sidebarOpenned = useSelector((state)=>state.sidebar.openned)
    const toggleSidebar = sidebarActions.toggleSidebarOpenned
    const dispatch = useDispatch()

    return (
        <div className={`relative bg-white-800 text-white ${sidebarOpenned ? 'w-70' : 'w-24'} h-full sidebar`}>
            <div>
                <div className="flex items-center w-full justify-between" style={{ paddingTop: '20px', paddingLeft: '30px' }}>
                    <Image src={Logo} style={{ height: '40px', width: '40px' }} />
                    {sidebarOpenned && <button onClick={()=>dispatch(toggleSidebar())} className=" text-xl text-white">
                        <Icon icon={sidebarOpenned?"material-symbols:close":"material-symbols:menu"} color="black" />
                    </button>}
                </div>
                
                
            </div>
        </div>
    );
};

export default Sidebar;