import React, { useState } from 'react';
import Header from '/@/Home/Header/Header';
import Sidebar from '/@/Home/SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import '/@/Home/Home.css'
import { useSelector } from 'react-redux';

function Home() {
    let sidebarOpenned = useSelector((state)=>state.sidebar.openned)
    return (
        <div className="flex flex-col h-screen">
            <div className={`grid ${sidebarOpenned ? 'grid-cols-[280px,1fr]' : 'grid-cols-[100px,1fr]'}`}>
                <Sidebar/>
                <div className="flex flex-col">
                    <Header/>
                    <main className="flex-grow lg:pt-20 pt-16">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Home;