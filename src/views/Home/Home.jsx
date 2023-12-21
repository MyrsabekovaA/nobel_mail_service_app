import React, { useState, useEffect } from 'react';
import Loader from "/@/routesControll/loaders";
import Header from './Header/Header';
import Sidebar from './SideBar/SideBar';
import Footer from "./Footer/Footer";
import { Outlet } from 'react-router-dom';
import './Home.css';
import { useSelector } from 'react-redux';
import {sidebarActions} from "/@/GlobalStates/Sidebar";

function Home() {
    const isUserLoggedIn = useSelector(state => state.loggedIn.isLoggedIn);
    const isLoading = useSelector(state => state.loggedIn.isLoading);
    const isSidebarOpen = useSelector(state => state.sidebar.opened);
    const [showLoader, setShowLoader] = useState(isLoading);
    const isDarkModeEnabled = useSelector((state) => state.darkMode.enabled);

    useEffect(() => {
        if (isLoading) {
            setShowLoader(true);
        } else {
            const timer = setTimeout(() => setShowLoader(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (showLoader) {
        return <Loader />;
    }

    if (!isUserLoggedIn) {
        return null;
    }

    return (
        <div className={`${isDarkModeEnabled ? 'dark' : ''}`}>
            <div className="flex h-screen overflow-hidden w-full">
                <Sidebar isSidebarOpen={isSidebarOpen}/>
                <div className="site-container relative flex flex-col h-full overflow-y-auto overflow-x-hidden
                w-full">
                    {isSidebarOpen && (
                        <div className="overlay absolute inset-0 bg-black bg-opacity-50 z-30"/>
                    )}
                    <Header/>
                    <main className="main-content flex-1 overflow-y-auto bg-whiten dark:bg-graydark">
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-4 xl:p-4 2xl:p-10">
                            <Outlet/>
                        </div>
                        <Footer/>
                    </main>
                </div>

            </div>
        </div>
    );
}

export default Home;