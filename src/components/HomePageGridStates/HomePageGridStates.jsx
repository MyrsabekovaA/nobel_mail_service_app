import React from "react";
import { Icon } from '@iconify/react';
import "./HomePageGridStates.css";

const HomePageGridStates = () => {

    const boxcolor = " rounded-sm en dark:bg-graydark/40 py-6 px-7 shadow-default wrapper";

    return (
        <div className="mt-4 w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className={`${boxcolor}`}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 ">
                        <Icon icon="ph:eye" width="24"/>
                    </div>
                    <div className="mt-4 flex items-end justify-between ">
                        <div>
                            <h4 className="text-title-md font-bold dark:text-white">
                                567
                            </h4>
                            <span className="text-sm font-medium text-gray">Total views</span>
                        </div>

                        <span className="flex items-center gap-1 text-sm font-medium text-meta-3 text-success">
                            0.43%
                        </span>
                    </div>
            </div>
            <div className={`${boxcolor}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <Icon icon="ph:eye" width="24"/>
                </div>
                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold dark:text-white">
                            567
                        </h4>
                        <span className="text-sm font-medium text-gray">Total views</span>
                    </div>

                    <span className="flex items-center gap-1 text-sm font-medium text-meta-3 text-success">
                            0.43%
                        </span>
                </div>
            </div>
            <div className={`${boxcolor}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <Icon icon="ph:eye" width="24"/>
                </div>
                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold dark:text-white">
                            567
                        </h4>
                        <span className="text-sm font-medium text-gray">Total views</span>
                    </div>

                    <span className="flex items-center gap-1 text-sm font-medium text-meta-3 text-success">
                            0.43%
                        </span>
                </div>
            </div>
            <div className={`${boxcolor}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <Icon icon="ph:eye" width="24"/>
                </div>
                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold dark:text-white">
                            567
                        </h4>
                        <span className="text-sm font-medium text-gray">Total views</span>
                    </div>

                    <span className="flex items-center gap-1 text-sm font-medium text-meta-3 text-success">
                            0.43%
                        </span>
                </div>
            </div>
        </div>
    )
};

export default HomePageGridStates;