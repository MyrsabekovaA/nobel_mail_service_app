import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import mapDataWorld from '@highcharts/map-collection/custom/world.geo.json';
import { useDispatch, useSelector } from 'react-redux';
import {fetchStatistics} from "/@/GlobalStates/Statistics";

import HC_map from 'highcharts/modules/map';
import proj4 from 'proj4';

HC_map(Highcharts);

if (typeof window !== 'undefined') {
    window.proj4 = proj4;
}

const WorldMapWithStats = () => {
    const dispatch = useDispatch();
    const selectedIntakeId = useSelector(state => state.selectedIntake.intakeId);
    const { data: statistics, isLoading, error } = useSelector(state => state.statistics);
    const [mapOptions, setMapOptions] = useState({});

    useEffect(() => {
        if (selectedIntakeId) {
            dispatch(fetchStatistics(selectedIntakeId));
        }
    }, [dispatch, selectedIntakeId]);

    const getHcKeyFromName = (name) => {
        if (name.toLowerCase() === "united states") {
            return "us";
        }
        const match = mapDataWorld.features.find(feature => feature.properties.name.toLowerCase() === name.toLowerCase());
        return match ? match.properties['hc-key'] : null;
    };

    useEffect(() => {
        if (!isLoading && statistics && !error) {
            const seriesData = Object.entries(statistics).map(([countryName, info]) => {
                const hcKey = getHcKeyFromName(countryName);
                if (!hcKey) {
                    console.warn(`Could not find hc-key for country: ${countryName}`);
                    return null;
                }
                return {
                    'hc-key': hcKey,
                    value: info.internsCount
                };
            }).filter(Boolean);

            setMapOptions({
                title: {
                    text: 'World Map with Interns Statistics'
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
                colorAxis: {
                    min: 0,
                    stops: [
                        [0, '#E8F5E9'],
                        [0.5, '#81C784'],
                        [1, '#1B5E20']
                    ]
                },
                series: [{
                    data: seriesData,
                    mapData: mapDataWorld,
                    joinBy: ['hc-key', 'hc-key'],
                    name: 'Interns Count',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormatter: function() {
                            return `${this.properties['name']}: <b>${this.value}</b> interns`;
                        }
                    }
                }]
            });
        }
    }, [isLoading, statistics, error]);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'mapChart'}
                options={mapOptions}
            />
        </div>
    );
};

export default WorldMapWithStats;