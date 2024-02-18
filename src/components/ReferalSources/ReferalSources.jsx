import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {fetchStatistics} from "/@/GlobalStates/Statistics";
import {useDispatch, useSelector} from "react-redux";

const ReferalSources = () => {
    const dispatch = useDispatch();
    const { data: statistics, isLoading, error } = useSelector(state => state.statistics);
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        dispatch(fetchStatistics("65c35df4a6fadb446f249693"));
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading && statistics && !error) {
            const countries = Object.keys(statistics);

            const allCategories = new Set();
            countries.forEach(country => {
                const sources = statistics[country].referalSources || {};
                Object.keys(sources).forEach(source => allCategories.add(source));
            });

            const seriesData = Array.from(allCategories).map(source => {
                return {
                    name: source,
                    data: countries.map(country => {
                        const sources = statistics[country].referalSources || {};
                        return sources[source] || 0;
                    })
                };
            });

            setChartOptions({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Interns by Referral Source and Country'
                },
                xAxis: {
                    categories: countries,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of Interns'
                    }
                },
                tooltip: {
                    shared: true,
                    useHTML: true,
                    formatter: function () {
                        let tooltip = `<span style="font-size:10px">${this.x}</span><table>`;
                        this.points.forEach(point => {
                            tooltip += `<tr><td style="color:${point.color};padding:0">${point.series.name}: </td>
                                    <td style="padding:0"><b>${point.y} interns</b></td></tr>`;
                        });
                        tooltip += '</table>';
                        return tooltip;
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: seriesData
            });
        }
    }, [isLoading, statistics, error]);





    return (
        <div className="pt-6">
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    );
};

export default ReferalSources;