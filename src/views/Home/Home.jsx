import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import Sidebar from './SideBar/SideBar';
import Footer from "./Footer/Footer";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken, isLoggedInActions } from '/@/GlobalStates/LoggedIn';
import  store  from '/@/GlobalStates/store';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {sidebarActions} from "/@/GlobalStates/Sidebar";
import Loader from "/@/routesControll/loaders";

function Home() {
    

    const location = useLocation();
    const isLoading = useSelector(state => state.loggedIn.isLoading);
    const isDarkModeEnabled = useSelector((state) => state.darkMode.enabled);
    const [showLoader, setShowLoader] = useState(isLoading);
    useEffect(() => {
        let {dispatch} = store
        const token = localStorage.getItem("token")
        const name = localStorage.getItem("name")
        const email = localStorage.getItem("email")
        dispatch(checkToken({token, user:{name, email}}))
        dispatch(isLoggedInActions.setLastRoute({route:location.pathname}))
        // if (isLoading) {
        //     setShowLoader(true);
        // } else {
        //     const timer = setTimeout(() => setShowLoader(false), 1000);
        //     return () => clearTimeout(timer);
        // }
        // isLoading
    }, [location]);
    let sidebarOpenned = useSelector((state) => state.sidebar.openned);
    if (showLoader) {
        return <Loader />;
    }
    let isLoggedIn = useSelector(state=>state.loggedIn.value)
    if (!isLoggedIn) {
        return <Navigate to = "/LogInForm"/>
    }
    
    console.log(isLoggedIn)
    return (
    <div className={`${isDarkModeEnabled ? 'dark' : ''}`}>
        <div className="flex h-screen overflow-hidden w-full h-full">
        <Sidebar />
        <div className="flex flex-col flex-grow">
            {sidebarOpenned && (
                        <div className="overlay absolute inset-0 bg-black bg-opacity-50 z-30"/>
                    )}
            <Header />
            <main className="flex-grow flex">
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-4 xl:p-4 2xl:p-10">
                    <Outlet  />
                </div>
                <Footer/>
            </main>
        </div>
        </div>
    </div>
  );
}

export default Home;
