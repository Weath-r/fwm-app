"use client";
import { useState, useEffect } from "react";
import { DataService } from "@/services/DataService";
import { ExportedWeatherData, WeatherData } from "@/types";

type StationModalContentProps = {
    activeStation: number;
    isOpen: boolean;
};

export default function StationModalContent({
    activeStation,
    isOpen,
}: Readonly<StationModalContentProps>) {
    const dataService = new DataService();
    const [weatherData, setWeatherData] = useState<{ [key: string]: any }>([]);

    const buildExportedWeatherDataObject = (elem: WeatherData) => {
        return {
            date_created: elem.date_created,
            temperature: elem.temperature,
            humidity: elem.humidity,
            barometer: elem.barometer,
            percipitation: elem.percipitation,
            rainrate: elem.rainrate,
            windspd: elem.windspd,
            winddir: elem.winddir,
            station: elem.weather_station_id,
        };
    };

    const getWeatherData = async () => {
        await dataService
            .fetchWeatherDataByStation(activeStation)
            .then((response) => {
                const weather_data: ExportedWeatherData[] =
                    response.data.data.map((elem: WeatherData) => {
                        return buildExportedWeatherDataObject(elem);
                    });
                return setWeatherData(weather_data);
            })
            .catch((error) => {
                // TO-DO handle error properly
                console.log(error);
                return setWeatherData([]);
            });
    };

    useEffect(() => {
        isOpen && getWeatherData();
    }, [isOpen]);

    const displayedData = weatherData.map((elem: ExportedWeatherData) => {
        return (
            <div className="p-2 flex text-black flex-col" key={elem.station.id}>
                <h2 className="mx-auto text-lg">
                    <a
                        href={elem.station.website_url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {elem.station.name}
                    </a>
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
                        <p>
                            Rain: {elem.percipitation}mm ({elem.rainrate}mm/hr)
                        </p>
                    </li>
                    <li>
                        <p>
                            Wind: {elem.windspd} km/h from {elem.winddir}°
                        </p>
                    </li>
                </ul>
            </div>
        );
    });

    return <div>{displayedData}</div>;
}
