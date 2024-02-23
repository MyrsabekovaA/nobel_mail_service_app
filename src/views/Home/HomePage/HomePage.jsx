import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import HomePageGridStates from "/@/components/HomePageGridStates/HomePageGridStates";
import LineGraph from "/@/components/LineGraph/LineGraph";
import BarChart from "/src/components/BarChart/BarChart";
import PieChart from "/@/components/PieChart/PieChart";
import ToDo from "/@/components/ToDo/ToDo";
import WorldMap from "/@/components/WorldMap/WorldMap";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import ReferalSources from "/@/components/ReferalSources/ReferalSources";
import {fetchStatistics} from "/@/GlobalStates/Statistics";
import PromoEmails from "/@/components/PromoEmails/PromoEmails";
import moment from "moment/moment";

const HomePage = () => {
    const dispatch = useDispatch();
    const [intakes, setIntakes] = useState([]);
    const [selectedIntakeId, setSelectedIntakeId] = useState('');

    useEffect(() => {
        const fetchIntakes = async () => {
            try {
                const response = await axios.get('https://mail-service-412008.ey.r.appspot.com/api/intakes');
                setIntakes(response.data.intakes);
            } catch (error) {
                console.error('Failed to fetch intakes:', error);
            }
        };

        fetchIntakes();
    }, []);

    useEffect(() => {
        if (selectedIntakeId) {
            dispatch(fetchStatistics(selectedIntakeId));
        }
    }, [dispatch, selectedIntakeId]);

    const handleSelectionChange = (event) => {
        setSelectedIntakeId(event.target.value);
    };

    const formatDate = (dateString, withTime) => {
        if (dateString && withTime === false) {
            return moment(dateString).format("DD.MM.YYYY");
        } else if (dateString && withTime === true) {
            return moment.utc(dateString).format("DD.MM.YYYY HH:mm");
        } else {
            return "—";
        }
    };

  return (
    <div>
        <div className="container mx-auto px-4">
            <h4 className="text-lg font-bold xl:text-2xl lg:text-base">
                Hi, Welcome back 👋
            </h4>

            <div>
                <PromoEmails/>
            </div>

            <div>
                <select value={selectedIntakeId} onChange={handleSelectionChange}>
                    <option value="">Select an Intake</option>
                    {intakes.map(intake => (
                        <option key={intake.id} value={intake.id}>{formatDate(intake.eventDate, false)}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-center w-full">
                <HomePageGridStates/>
            </div>
            <div className="">
                <WorldMap/>
            </div>
            <div>
                <ReferalSources/>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
                <LineGraph/>
                <BarChart/>
                <PieChart/>
                <ToDo
                    title="Tasks"
                    list={[
                        {id: "1", name: "Set EQ date"},
                        {id: "2", name: "Schedule emails"},
                        {id: "3", name: "Send EQ results"},
                        {id: "4", name: "Set EQ date"},
                        {id: "5", name: "Schedule emails"},
                        {id: "6", name: "Send EQ results"},
                        {id: "7", name: "Set EQ date"},
                        {id: "8", name: "Schedule emails"},
                        {id: "9", name: "Send EQ results"},
                    ]}
                />
            </div>
        </div>
    </div>
  );
};

export default HomePage;
