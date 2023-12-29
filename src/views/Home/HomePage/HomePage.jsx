import React, { useState } from 'react';
import HomePageGridStates from "/@/components/HomePageGridStates/HomePageGridStates";
import LineGraph from "/@/components/LineGraph/LineGraph";
import BarChart from "/src/components/BarChart/BarChart";
import PieChart from "/@/components/PieChart/PieChart";
import ToDo from "/@/components/ToDo/ToDo";

const HomePage = () => {
    return (
        <div className="mt-4">
            <h4 className="text-lg font-bold xl:text-2xl lg:text-base">
                Hi, Welcome back 👋
            </h4>
            <div className="flex justify-center w-full">
                <HomePageGridStates/>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
                <LineGraph/>
                <BarChart/>
                <PieChart/>
                <ToDo
                    title="Tasks"
                    list={[
                        { id: '1', name: 'Set EQ date' },
                        { id: '2', name: 'Schedule emails' },
                        { id: '3', name: 'Send EQ results' },
                        { id: '4', name: 'Set EQ date' },
                        { id: '5', name: 'Schedule emails' },
                        { id: '6', name: 'Send EQ results' },
                        { id: '7', name: 'Set EQ date' },
                        { id: '8', name: 'Schedule emails' },
                        { id: '9', name: 'Send EQ results' },
                    ]}/>
            </div>
        </div>
    );
};

export default HomePage;