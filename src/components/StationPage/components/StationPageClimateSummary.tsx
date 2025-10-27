"use client";
import { ClimateWeatherData, Measurements } from "@/types";
import { useT } from "@/i18n/client";
import type { ReactNode } from "react";

type StationPageClimateSummaryProps = {
    climateData: ClimateWeatherData[];
    weatherStation: string;
};

export default function StationPageClimateSummary({ climateData, weatherStation } : StationPageClimateSummaryProps) {
    const { i18n } = useT("station");
    const lang = i18n.language;

    const annualMeanTemp = climateData.reduce((sum, data) => sum + data.mean_temperature, 0) / climateData.length;
    const annualMeanTempRounded = Math.round(annualMeanTemp * 10) / 10;
    const coldestMeanTemp = Math.min(...climateData.map(data => data.mean_temperature));
    const warmestMeanTemp = Math.max(...climateData.map(data => data.mean_temperature));
    const coldestMonthData = climateData.find(data => data.mean_temperature === coldestMeanTemp)?.month_id.translations.find(t => t.languages_code === lang)?.name || "";
    const warmestMonthData = climateData.find(data => data.mean_temperature === warmestMeanTemp)?.month_id.translations.find(t => t.languages_code === lang)?.name || "";

    const wettestPrecip = Math.max(...climateData.map(data => data.precipitation));
    const driestPrecip = Math.min(...climateData.map(data => data.precipitation));
    const wettestMonth = climateData.find(data => data.precipitation === wettestPrecip)?.month_id.translations.find(t => t.languages_code === lang)?.name || "";
    const driestMonth = climateData.find(data => data.precipitation === driestPrecip)?.month_id.translations.find(t => t.languages_code === lang)?.name || "";

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const climaDataCurrentMonth = climateData.find((data, index) => currentMonth === index);

    const calculateMaxTemperatureForSummer = () => {
        const summerTemperatures = climateData
            .filter(data => ["jun", "jul", "aug"].includes(data.month_id.value))
            .map(data => data.max_temperature);
        return Math.max(...summerTemperatures);
    };

    const calculateMaxTemperatureForWinter = () => {
        const winterTemperatures = climateData
            .filter(data => ["dec", "jan", "feb"].includes(data.month_id.value))
            .map(data => data.min_temperature);
        return Math.max(...winterTemperatures);
    };

    const summaryText: Record<string, { intro: ReactNode; outro: ReactNode }> = {
        "el": {
            intro: (
                <>
                    Ο μετεωρολογικός σταθμός <strong>{weatherStation}</strong> καταγράφει ένα ήπιο μεσογειακό
                    κλίμα, με ζεστά καλοκαίρια και ήπιους χειμώνες. Η μέση ετήσια θερμοκρασία φτάνει περίπου
                    τους <strong>{annualMeanTempRounded} {Measurements.CELCIUS}</strong>.
                </>
            ),
            outro: (
                <>
                    Συνολικά, ο σταθμός <strong>{weatherStation}</strong> παρουσιάζει ευχάριστες και
                    ισορροπημένες καιρικές συνθήκες όλο τον χρόνο, αντιπροσωπευτικές για τη Στερεά Ελλάδα.
                </>
            ),
        },
        "en": {
            intro: (
                <>
                    The <strong>{weatherStation}</strong> weather station records a mild Mediterranean climate
                    with warm summers and cool winters. Average annual temperature is around
                    <strong> {annualMeanTempRounded}{Measurements.CELCIUS}</strong>, with the coldest month being
                    <strong> {coldestMonthData}</strong> (mean <strong>{coldestMeanTemp}{Measurements.CELCIUS}</strong>)
                    and the warmest month <strong>{warmestMonthData}</strong> (mean <strong>{warmestMeanTemp}{Measurements.CELCIUS}</strong>).
                </>
            ),
            outro: (
                <>
                    Overall, <strong>{weatherStation}</strong> experiences pleasant weather year-round, making it
                    representative of Central Greece’s balanced climate.
                </>
            ),
        },
    };

    const localizedSummary = summaryText[lang] ?? summaryText["en"];

    return (
        <section>
            <h2 className="mb-2 text-lg font-bold text-primary">
                {i18n.getFixedT(lang, "station")("climatology.summaryTitle")} {weatherStation}
            </h2>
            <p className="text-primary text-md">
                {localizedSummary.intro}
            </p>
            <p className="text-primary">
                {localizedSummary.outro}
            </p>

            <section className="flex flex-wrap lg:flex-nowrap gap-2 justify-center mt-2">
                {/* <!-- This month clima --> */}
                <div className="bg-white flex flex-col shadow-lg rounded-lg w-full lg:w-2/3">
                    <div className="bg-primary h-16 rounded-t-lg w-full flex items-center justify-center">
                        <p className="text-white text-center">
                            {i18n.getFixedT(lang, "station")("climatology.climaThisMonth")}
                        </p>
                    </div>
                    <div className="flex gap-1 items-center justify-around py-4 px-1">
                        <div className="text-primary flex flex-col items-center">
                            <p className="text-sm text-center">
                                {i18n.getFixedT(lang, "station")("information.temperature")}
                                <span className="block font-semibold text-base">
                                    {climaDataCurrentMonth?.max_temperature}  {Measurements.CELCIUS}
                                    <span className="font-normal inline-block ml-1">
                                        / {climaDataCurrentMonth?.min_temperature} {Measurements.CELCIUS}
                                    </span>
                                </span> 
                            </p>
                        </div>
                        
                        <div className="text-primary flex flex-col items-center">
                            <p className="text-sm text-center">
                                {i18n.getFixedT(lang, "station")("climatology.rain")}
                                <span className="block font-semibold text-base">
                                    {climaDataCurrentMonth?.precipitation} {Measurements.MILLIMETER}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="text-primary flex flex-col items-center">
                        <p className="text-sm text-center">
                            {i18n.getFixedT(lang, "station")("information.meanTemp")}
                            <span className="block font-semibold text-base">
                                {climaDataCurrentMonth?.mean_temperature} {Measurements.CELCIUS}
                            </span>
                        </p>
                    </div>
                </div>
                {/* <!-- Extreme values --> */}
                <div className="bg-white shadow-lg rounded-lg w-full lg:w-2/3">
                    <div className="bg-primary h-16 rounded-t-lg w-full flex items-center justify-center">
                        <p className="text-white text-center">
                            {i18n.getFixedT(lang, "station")("climatology.extremeValues")}
                        </p>
                    </div>
                    <div className="flex gap-1 items-center justify-around py-4 px-1">
                        <div className="text-primary flex flex-col items-center gap-1">
                            <p className="text-center text-sm">
                                {i18n.getFixedT(lang, "station")("climatology.highSummer")}
                                <span className="block font-semibold text-base">
                                    {calculateMaxTemperatureForSummer()} {Measurements.CELCIUS}
                                </span>
                            </p>
                        </div>
                        <div className="text-primary flex flex-col items-center gap-1">
                            <p className="text-center text-sm">
                                {i18n.getFixedT(lang, "station")("climatology.lowWinter")}
                                <span className="block font-semibold text-base">
                                    {calculateMaxTemperatureForWinter()} {Measurements.CELCIUS}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-1 items-center justify-around py-4 px-1">
                        <div className="text-primary flex flex-col items-center gap-1">
                            <p className="text-center text-sm">
                                {wettestMonth}
                                <span className="block font-semibold text-base">
                                    {wettestPrecip} {Measurements.MILLIMETER}
                                </span>
                            </p>
                        </div>
                        <div className="text-primary flex flex-col items-center gap-1">
                            <p className="text-center text-sm">
                                {driestMonth}
                                <span className="block font-semibold text-base">
                                    {driestPrecip} {Measurements.MILLIMETER}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg w-full lg:w-2/3">
                    <div className="bg-primary h-16 rounded-t-lg w-full flex items-center justify-center">
                        <p className="text-white text-center">
                            {i18n.getFixedT(lang, "station")("climatology.meanTemperature")}
                            <small className="block">
                                {i18n.getFixedT(lang, "station")("climatology.winterSummer")}
                            </small>
                        </p>
                    </div>
                    <div className="flex gap-1 items-center justify-around py-4 px-1">
                        <div className="text-primary flex flex-col items-center p-4 gap-2">
                            <p className="text-sm text-center">
                                {i18n.getFixedT(lang, "station")("climatology.warmestMonth", {
                                    month: warmestMonthData,
                                })} 
                                <span className="font-semibold">
                                    {warmestMeanTemp} {Measurements.CELCIUS}
                                </span>
                            </p>
                            <p className="text-sm text-center">
                                {i18n.getFixedT(lang, "station")("climatology.coldestMonth", {
                                    month: coldestMonthData,
                                })} <span className="font-semibold">
                                    {coldestMeanTemp} {Measurements.CELCIUS}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}