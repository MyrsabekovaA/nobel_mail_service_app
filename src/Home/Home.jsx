import React, { useState } from 'react';
import Header from '/@/Home/Header/Header';
import Sidebar from '/@/Home/SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import '/@/Home/Home.css'
import { useSelector } from 'react-redux';

function Home() {
    let sidebarOpenned = useSelector((state)=>state.sidebar.openned)
    return (
        <div className="flex justify-between fixed t-0 w-full">
                <Sidebar className={`basis-${sidebarOpenned ? "280":"100"}px`}/>
                <div className="flex flex-col flex-grow">
                    <Header/>
                    <main className="flex-grow lg:pt-20 pt-16">
                        <Outlet/>
                    </main>
                </div>
        </div>
    );
}

export default Home;