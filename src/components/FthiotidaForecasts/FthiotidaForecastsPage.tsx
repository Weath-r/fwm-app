import { useEffect, useState } from "react";
import { DataService } from "@/services/DataService";
import { FthiotidaForecast, FthiotidaForecastDates } from "@/types";
import dayjs from "@/utils/dateTimeUtils";
import { dateValueOf, isTheSame } from "@/utils/dateManipulation";

import CalendarSection from "./components/CalendarSection";
import NoForecastSection from "./components/NoForecastSection";
import LoadingForecastData from "./components/LoadingForecastData";
import FthiotidaForecastsSection from "./components/FthiotidaForecastsSection";

export default function FthiotidaForecastPage() {
    const dataService = new DataService();
    const [forecasts, setForecasts] = useState<FthiotidaForecast[]>([]);
    const [forecastDates, setForecastDates] = useState<FthiotidaForecastDates[]>([]);

    const getFthiotidaForecasts = async () => {
        await dataService
            .fetchFthiotidaForecasts()
            .then((response) => {
                const forecastDates: FthiotidaForecastDates[] = [];
                response.forEach((forecast: FthiotidaForecast) => {
                    const { dates } = forecast.forecast;
                    forecastDates.push({
                        created: dateValueOf(dayjs(dates.created, "DD-MM-YYYY").toDate()),
                        forecast_date: dateValueOf(dayjs(dates.forecast_date, "DD-MM-YYYY").toDate()),
                        forecast_end_hour: dateValueOf(dayjs(dates.forecast_end_hour, "DD-MM-YYYY").toDate()),
                        forecast_start_hour: dateValueOf(dayjs(dates.forecast_start_hour, "DD-MM-YYYY").toDate()),
                    });
                });
                setForecasts(response);
                setForecastDates(forecastDates);
            })
            .catch((error) => {
                // TO-DO handle error properly
                console.log(error);
                return setForecasts([]);
            });
    };

    const [selectedDate, setSelectedDate] = useState<number>(0);
    const [selectedForecastIndex, setselectedForecastIndex] = useState<number>(-1);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    
    const handleDateClick = (date: number): void => {
        setSelectedDate(date);
        setShowLoading(true);
    };

    useEffect(() => {
        getFthiotidaForecasts();
        const today = dayjs();
        setSelectedDate(dateValueOf(today.toDate()));
    }, []);

    useEffect(() => {
        if (selectedDate) {
            const indexOfForecast = forecasts.findIndex(forecast => {
                return isTheSame({ firstDate: dateValueOf(dayjs(forecast.forecast.dates.forecast_date, "DD-MM-YYYY").toDate()), secondDate: selectedDate });
            });
            setselectedForecastIndex(indexOfForecast);
            setTimeout(() => setShowLoading(false), 700);
        }
    }, [forecasts, selectedDate]);

    return (
        <div className="mx-4 mt-4 md:container md:mx-auto">
            <h2 className="mb-4 text-2xl text-primary">
                Fthiotida weather forecast
                <small className="block text-sm text-primary opacity-60">
                    until today
                </small>
            </h2>
            <div className="relative my-4 w-full rounded-xl bg-white drop-shadow-md">
                <div className="rounded-t-lg bg-primary p-4 text-sm font-bold text-white">
                    <p>
                        Provided by <a href="https://fthiotida-meteogroup.gr/" target="_blank" className="decoration-dashed" title="Fthiotida Meteogroup - Local forecasts for Fthiotida" rel="noreferrer">Fthiotida-Meteogroup</a>
                    </p>
                </div>
                <section className="flex flex-col px-4 pb-2">
                    <CalendarSection
                        handleClickfn={handleDateClick}
                        selectedDate={selectedDate}
                        forecastDates={forecastDates}
                    ></CalendarSection>
                    
                    {forecasts[selectedForecastIndex] && !showLoading && (
                        <FthiotidaForecastsSection
                            key={selectedForecastIndex}
                            forecasts={forecasts[selectedForecastIndex].forecast.data}
                        />
                    )}
                    {!forecasts[selectedForecastIndex] && !showLoading && <NoForecastSection></NoForecastSection>}
                    {showLoading && <LoadingForecastData></LoadingForecastData>}

                    <div className="my-4 w-full border-t-2 border-primary/10 pt-2">
                        <p className="text-sm text-primary">
                            Fthiotida forecasts are provided by the legendary local amateur meteorologist group <a href="https://fthiotida-meteogroup.gr/" target="_blank" className="font-bold" rel="noreferrer">Fthiotida-Meteogroup</a>. As always, we thank them for their kind support and help. <br />Visit their site for more detailed local forecasts.
                        </p>
                        <p className="mt-2 text-xs text-primary">
                            <span className="font-bold">Disclaimer:</span> Please always check the official weather services before making any life decisions based on these forecasts.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}