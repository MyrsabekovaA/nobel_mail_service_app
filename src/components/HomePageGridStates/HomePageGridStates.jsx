import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "/@/GlobalStates/Statistics";
import { Icon } from '@iconify/react';
import "./HomePageGridStates.css";

const HomePageGridStates = () => {
    const dispatch = useDispatch();
    const selectedIntakeId = useSelector(state => state.selectedIntake.intakeId);
    useEffect(() => {
        if (selectedIntakeId) {
            dispatch(fetchStatistics(selectedIntakeId));
        }
    }, [dispatch, selectedIntakeId]);

    const statistics = useSelector(state => state.statistics.data || {});
    console.log(statistics);
    const totalCountries = Object.keys(statistics).length;
    const totalInterns = Object.values(statistics).reduce((sum, { internsCount }) => sum + internsCount, 0);
    const overallSources = Object.values(statistics).reduce((acc, { referalSources = {} }) => {
        for (const [source, count] of Object.entries(referalSources)) {
            acc[source] = (acc[source] || 0) + count;
        }
        return acc;
    }, {});


    const totalSources = Object.keys(overallSources).length;

    const boxcolor = " rounded-sm dark:bg-compdark py-6 px-7 shadow-default wrapper";

    return (
        <div className="mt-4 w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 pb-6">
            {/* Overall Countries */}
            <div className={`${boxcolor}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <Icon icon="icon-park:world" width="24"/>
                </div>
                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold dark:text-white">
                            {totalCountries}
                        </h4>
                        <span className="text-sm font-medium text-gray">Total Countries</span>
                    </div>
                </div>
            </div>
            {/* Overall Interns */}
            <div className={`${boxcolor}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <Icon icon="bi:people" width="24"/>
                </div>
                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold dark:text-white">
                            {totalInterns}
                        </h4>
                        <span className="text-sm font-medium text-gray">Total Interns</span>
                    </div>
                </div>
            </div>
            {/* Overall Sources */}
            <div className={`${boxcolor}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <Icon icon="iconoir:db" width="24"/>
                </div>
                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold dark:text-white">
                            {totalSources}
                        </h4>
                        <span className="text-sm font-medium text-gray">Total Referral Sources</span>
                    </div>
                </div>
            </div>
            {/* Overall Email Sent */}
            <div className={`${boxcolor}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <Icon icon="ic:outline-email" width="24"/>
                </div>
                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold dark:text-white">
                            {totalSources}
                        </h4>
                        <span className="text-sm font-medium text-gray">Total Emails Sent</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageGridStates;