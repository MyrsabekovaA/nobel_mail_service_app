import React, { useState } from 'react';
import Header from './Header/Header';
import Sidebar from './SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import './Home.css'
import { useSelector } from 'react-redux';

function Home() {
    let sidebarOpenned = useSelector((state)=>state.sidebar.openned)
    return (
        <div className="flex justify-between fixed t-0 w-full h-full">
                <Sidebar/>
                <div className="flex flex-col flex-grow">
                    <Header/>
                    <main className="flex-grow flex">
                        <Outlet className="h-full w-full flex-grow"/>
                    </main>
                </div>
        </div>
    );
}

export default Home;