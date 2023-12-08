import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '/@/Home/Home.css'

function Home() {
    return (
        <div>
            <div className='w-24'>
                <h1>Welcome to the Home Page</h1>
                <NavLink to="/home/emailTemplates">Email Templates</NavLink>
            </div>
            
            <Outlet/>
        </div>
    );
}

export default Home;