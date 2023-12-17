import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import Sidebar from './SideBar/SideBar';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { checkToken, isLoggedInActions } from '/@/GlobalStates/LoggedIn';
import  store  from '/@/GlobalStates/store';

function Home() {
    

    const location = useLocation();
    useEffect(() => {
        let {dispatch} = store
        const token = localStorage.getItem("token")
        const name = localStorage.getItem("name")
        const email = localStorage.getItem("email")
        dispatch(checkToken({token, user:{name, email}}))
        dispatch(isLoggedInActions.setLastRoute({route:location.pathname}))
    }, [location]);
    let sidebarOpenned = useSelector((state)=>state.sidebar.openned)
    let isLoggedIn = useSelector(state=>state.loggedIn.value)
    if (!isLoggedIn) {
        return <Navigate to = "/LogInForm"/>
    }
    
    console.log(isLoggedIn)
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