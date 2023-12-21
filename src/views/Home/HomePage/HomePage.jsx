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
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <LineGraph/>
                <BarChart/>
                <PieChart/>
                <ToDo
                    title="Tasks"
                    list={[
                        { id: '1', name: 'Create FireStone Logo' },
                        { id: '2', name: 'Add SCSS and JS files if required' },
                        { id: '3', name: 'Stakeholder Meeting' },
                        { id: '4', name: 'Scoping & Estimations' },
                        { id: '5', name: 'Sprint Showcase' },
                    ]}/>
            </div>
        </div>
    );
};

export default HomePage;