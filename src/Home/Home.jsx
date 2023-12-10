import React, { useState } from 'react';
import Header from '/@/Home/Header/Header';
import Sidebar from '/@/Home/SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import '/@/Home/Home.css'

function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="flex flex-col h-screen">
            <div className={`grid ${isSidebarOpen ? 'grid-cols-[280px,1fr]' : 'grid-cols-[100px,1fr]'}`}>
                <Sidebar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
                <div className="flex flex-col">
                    <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
                    <main className="flex-grow lg:pt-20 pt-16">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Home;