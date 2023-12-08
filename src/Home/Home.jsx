import React from 'react';
import { Outlet } from 'react-router-dom';
import '/@/Home/Home.css'

function Home() {
    return (
        <div>
            <div className='w-24'>
                <h1>Welcome to the Home Page</h1>
            </div>
            
            <Outlet/>
        </div>
    );
}

export default Home;