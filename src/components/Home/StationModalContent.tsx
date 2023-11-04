"use client";
import { useState, useEffect } from "react";
import {fetchWeatherData} from "@/api/fetchData";
import { withAsync } from "@/helpers/withAsync";

interface ExportedWeatherData {
    date_created: Date;
    temperature: number,
    humidity: number,
    barometer: number,
    percipitation: number,
    rainrate: number,
    windspd: number,
    winddir: number,
    station: WeatherStationType
};
export default function StationModalContent({ 
    activeStation, isOpen 
    }: {
        activeStation: number,
        isOpen: boolean
    }) {
    const [weatherData, setWeatherData] = useState<{[key: string]: any}>([]);

    const getWeatherData = async () => {
        const {response, error} = await withAsync(fetchWeatherData, activeStation);
            if (response) {
                const weather_data : ExportedWeatherData[] = response.data.data.map((elem: WeatherDataType) => {
                    return {
                        date_created: elem.date_created,
                        temperature: elem.temperature,
                        humidity: elem.humidity,
                        barometer: elem.barometer,
                        percipitation: elem.percipitation,
                        rainrate: elem.rainrate,
                        windspd: elem.windspd,
                        winddir: elem.winddir,
                        station: elem.weather_station_id
                    }
                });
                return setWeatherData(weather_data);
            }
            return setWeatherData([]);
    };
    
    useEffect(() => {
        isOpen && getWeatherData(); 
    }, [isOpen]);

    const displayedData = weatherData.map((elem: ExportedWeatherData) => {
        return (
            <div className="p-2 flex text-black flex-col" key={elem.station.id}>
                <h2 className="mx-auto text-lg">
                    {elem.station.name}
                </h2>
                <ul>
                    <li>
                        <p>Temp: {elem.temperature}°C</p>
                    </li>
                    <li>
                        <p>Humidity: {elem.humidity}%</p>
                    </li>
                    <li>
                        <p>Barometer: {elem.barometer} hPA</p>
                    </li>
                    <li>
                        <p>Rain: {elem.percipitation}mm ({elem.rainrate}mm/hr)</p>
                    </li>
                    <li>
                        <p>Wind: {elem.windspd} km/h from {elem.winddir}°</p>
                    </li>
                </ul>
            </div>
        )
    });

    return (<div>
        {displayedData}
    </div>)
}