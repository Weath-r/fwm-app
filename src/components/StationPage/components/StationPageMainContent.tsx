import { ClimateWeatherData, WeatherDataResponse, WeatherForecastResponse } from "@/types";
import * as Tabs from "@radix-ui/react-tabs";

import MonthGraph from "@/components/StationPage/MonthGraph";
import StationPageClimateSummary from "@/components/StationPage/components/StationPageClimateSummary";
import StationFullForecast from "@/components/StationPage/components/StationPageFullForecast";
import { useState } from "react";

type StationPageMainContentProps = {
    i18n: any;
    stationForecast: WeatherForecastResponse;
    stationWeather: WeatherDataResponse[];
    stationClimate: ClimateWeatherData[];
    stationName: string;
};

export default function StationPageMainContent({ i18n, stationForecast, stationWeather, stationClimate, stationName }: StationPageMainContentProps) {

    const [activeTab, setActiveTab] = useState("tab1");
    const tabs = [{
        value: "tab1",
        label: i18n.getFixedT(i18n.language, "station")("tabs.forecast"),
    },{
        value: "tab2",
        label: i18n.getFixedT(i18n.language, "station")("tabs.graphs"),
    },{
        value: "tab3",
        label: i18n.getFixedT(i18n.language, "station")("tabs.climatology"),
    }];
    return (
        <Tabs.Root
            className="flex flex-col gap-4 w-full"
            defaultValue="tab1"
            value={activeTab}
            onValueChange={setActiveTab}
        >
            <Tabs.List
                className="flex gap-2"
                aria-label="Station tabs"
            >
                {tabs.map((tab) => {
                    const activeClass = activeTab === tab.value ? "border-b-2 border-primary text-primary font-semibold" : "text-primary/70";
                    return (
                        <Tabs.Trigger
                            key={tab.value}
                            className={`flex cursor-pointer select-none  justify-center items-center p-2 ${activeClass}`}
                            value={tab.value}
                        >
                            {tab.label}
                        </Tabs.Trigger>
                    
                    );
                })}
            </Tabs.List>
            <Tabs.Content
                className="grow rounded-b-md text-primary outline-none mb-4"
                value="tab1"
            >
                <div className="w-full rounded-xl bg-white p-4 drop-shadow-md">
                    <StationFullForecast stationForecast={stationForecast} />
                </div>
            </Tabs.Content>
            <Tabs.Content
                className="grow outline-none w-full"
                value="tab2"
            >
                <section>
                    <div className="w-full rounded-xl bg-white p-4 drop-shadow-md">
                        <MonthGraph weatherData={stationWeather}></MonthGraph>
                    </div>
                </section>
            </Tabs.Content>
            <Tabs.Content
                className="grow rounded-b-md text-primary outline-none focus:shadow-black"
                value="tab3"
            >
                <div className="w-full rounded-xl bg-white p-4 drop-shadow-md">
                    <StationPageClimateSummary
                        climateData={stationClimate}
                        weatherStation={stationName}
                    ></StationPageClimateSummary>
                </div>
            </Tabs.Content>
        </Tabs.Root>);
}