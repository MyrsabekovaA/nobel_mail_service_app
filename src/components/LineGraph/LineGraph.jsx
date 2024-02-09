import React, {useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import './LineGraph.css';

const LineGraph = () => {
    const dayData = [
        {
            name: 'Product One',
            data: [10, 12, 14, 9, 15, 18, 16],
        },
        {
            name: 'Product Two',
            data: [7, 11, 9, 13, 8, 10, 12],
        }
    ];

    const weekData = [
        {
            name: 'Product One',
            data: [50, 60, 70, 65, 75, 85],
        },
        {
            name: 'Product Two',
            data: [40, 55, 65, 58, 63, 72],
        }
    ];

    const monthData = [
        {
            name: 'Product One',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        },
        {
            name: 'Product Two',
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
        },
    ];

    const [series, setSeries] = useState(monthData);
    const [timeFrame, setTimeFrame] = useState('month');

    const options = {
        legend: {
            show: false,
            position: 'top',
            horizontalAlign: 'left',
        },
        colors: ['#219653', '#7e8189'],
        chart: {
            fontFamily: 'Satoshi, sans-serif',
            height: 335,
            type: 'area',
            dropShadow: {
                enabled: true,
                color: '#623CEA14',
                top: 10,
                blur: 4,
                left: 0,
                opacity: 0.1,
            },

            toolbar: {
                show: false,
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        height: 300,
                    },
                },
            },
            {
                breakpoint: 1366,
                options: {
                    chart: {
                        height: 350,
                    },
                },
            },
        ],
        stroke: {
            width: [2, 2],
            curve: 'straight',
        },
        grid: {
            xaxis: {
                type: 'category',
                categories: timeFrame === 'month' ? ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
                    : timeFrame === 'week' ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
                        : ['Day 1', 'Day 2', 'Day 3'],
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 4,
            colors: '#fff',
            strokeColors: ['#219653', '#7e8189'],
            strokeWidth: 3,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            hover: {
                size: undefined,
                sizeOffset: 5,
            },
        },
        xaxis: {
            type: 'category',
            categories: [
                'Sep',
                'Oct',
                'Nov',
                'Dec',
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
            ],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: '#969ba1',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#969ba1',
                },
            },
            min: 0,
            max: 100,
        },
    };

    const updateSeries = (newTimeFrame) => {
        setTimeFrame(newTimeFrame);
        if (newTimeFrame === 'day') {
            setSeries(dayData);
        } else if (newTimeFrame === 'week') {
            setSeries(weekData);
        } else {
            setSeries(monthData);
        }
    };

    return (
        <div className="linegraph col-span-12 rounded-sm px-5 py-7 shadow-default
        dark:border-strokedark sm:px-7 xl:col-span-8 dark:bg-graydark/40 dark:text-white">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex  gap-3 sm:gap-5">
                    <div className="flex min-w-47">
                        <span className="mt-1 mr-2 flex h-4 w-4 items-center justify-center rounded-full border
                           border-success">
                        <span className="block h-2 w-2 rounded-full bg-success"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-success">Subscribed</p>
                            <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
                        </div>
                    </div>
                    <div className="flex min-w-47">
                        <span className="mt-1 mr-2 flex h-4 w-4 items-center justify-center rounded-full border
                        border-lightgray">
                            <span className="block h-2 w-2 rounded-full bg-lightgray"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-secondary dark:text-lightgray">Unsubscribed</p>
                            <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1 dark:bg-meta-4">
                        <button
                            onClick={() => updateSeries('day')}
                            className={`linegraph-button rounded py-1 px-3 text-xs font-medium ${timeFrame === 'day' ? 
                                'bg-white shadow-card' : 'dark:text-white hover:bg-white hover:shadow-card'}  
                                dark:hover:bg-boxdark`}>
                            Day
                        </button>
                        <button
                            onClick={() => updateSeries('week')}
                            className={`linegraph-button rounded py-1 px-3 text-xs font-medium ${timeFrame === 'week' ? 
                                'bg-white shadow-card' : 'dark:text-white hover:bg-white hover:shadow-card'}
                                dark:hover:bg-boxdark`}>
                            Week
                        </button>
                        <button
                            onClick={() => updateSeries('month')}
                            className={`linegraph-button rounded py-1 px-3 text-xs font-medium ${timeFrame === 'month' ? 
                                'bg-white shadow-card' : 'dark:text-white hover:bg-white hover:shadow-card'} 
                                dark:hover:bg-boxdark`}>
                            Month
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div id="linegraph" className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default LineGraph;