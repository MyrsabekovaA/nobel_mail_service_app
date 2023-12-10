import React from 'react';
import { Outlet } from 'react-router-dom';
import '/@/Home/Home.css'
import MyComponent from '/@/example';

function Home() {
    return (
        <div>
            <div className='w-24'>
                <MyComponent/>
            </div>
            
            <Outlet/>
        </div>
    );
}

export default Home;