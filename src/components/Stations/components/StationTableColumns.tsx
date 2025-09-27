import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import CommonButton from "@/components/Common/CommonButton";
import SvgInline from "@/components/Common/SvgInline";
import { Measurements, WeatherConditions, WeatherDataResponse } from "@/types";
import { HeartIcon } from "@heroicons/react/24/solid";
import { createColumnHelper, SortingFn } from "@tanstack/react-table";
import { fullDateWithTime } from "../../../utils/dateTimeUtils";
import StationLink from "@/components/Common/StationLink";

// Sorting Fns
const sortStatusFn: SortingFn<WeatherDataResponse> = (rowA, rowB) => {
    return rowA.original.weather_station_id.name.localeCompare(
        rowB.original.weather_station_id.name
    );
};
const sortTemperatureFn: SortingFn<WeatherDataResponse> = (rowA, rowB) => {
    return rowA.original.temperature - rowB.original.temperature;
};

// Columns initialisation
const columnHelper = createColumnHelper<WeatherDataResponse>();
export const getColumns = (
    title: string,
    handleFavouriteButton: (stationId: number) => void,
    isStationFavourite: (stationId: number) => boolean,
    i18n: any,
    i18nConditions: any,
    selectedLanguage: string
) => {
    return [
        columnHelper.accessor(
            (row) => row.weather_station_id,
            // `${row.weather_station_id.name}--${row.weather_station_id.prefecture_id.label}`,
            {
                id: "stationName",
                cell: (info) => {
                    const stationName = info.getValue().name;
                    const stationPerfecture = info.getValue().prefecture_id.label;
                    const stationId = info.getValue().id;
                    return (
                        <StationLink 
                            stationId={stationId} 
                            stationName={stationName}
                            pageName="station"
                            className="whitespace-nowrap pr-6 font-bold text-primary"
                            lang={selectedLanguage}
                        >
                            {stationName}
                            <span className="block font-normal text-primary opacity-30">
                                {stationPerfecture}
                            </span>
                        </StationLink>
                    );
                },
                header: () => <span>
                    {i18n.getFixedT(selectedLanguage, "common")("StationsTable.stationName")}
                </span>,
                sortingFn: sortStatusFn,
            }
        ),
        columnHelper.accessor((row) => row.weather_condition_icon, {
            id: "stationWeatherIcon",
            cell: (info) => {
                return (
                    <div className="w-10">
                        <BaseWeatherIcon
                            assetId={info.getValue()}
                            weatherDescriptionText="icon"
                        ></BaseWeatherIcon>
                    </div>
                );
            },
            header: () => <span>
                {i18n.getFixedT(selectedLanguage, "common")("StationsTable.stationWeatherIcon")}
            </span>,
        }),
        columnHelper.accessor((row) => `${row.temperature}--${row.temp_difference}`, {
            id: "stationTemp",
            cell: (info) => {
                const tempLabel = info.getValue().split("--");
                const trendArrowStyle = +tempLabel[1] > 0 ? "fill-success" : "fill-danger";
                const trendArrowIcon =
                    +tempLabel[1] > 0 ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg";
                const trendArrow = +tempLabel[1] !== 0 && (
                    <SvgInline
                        path={trendArrowIcon}
                        title={`${tempLabel[1]}${Measurements.CELCIUS} in last 30 mins`}
                        className={`w-2 ${trendArrowStyle}`}
                    ></SvgInline>
                );
                return (
                    <p className="flex items-center gap-1">
                        {tempLabel[0]}
                        {trendArrow}
                    </p>
                );
            },
            header: () => (
                <p>
                    {i18nConditions.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.TEMP.toLowerCase())}
                    <span className="ml-1 text-xs">({Measurements.CELCIUS})</span>
                </p>
            ),
            sortingFn: sortTemperatureFn,
        }),
        columnHelper.accessor((row) => row.humidity, {
            id: "stationHum",
            cell: (info) => <span>{info.getValue()}</span>,
            header: () => (
                <p>
                    {i18nConditions.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.HUMIDITY.toLowerCase())}
                    <span className="ml-1 text-xs">({Measurements.PERCENTAGE})</span>
                </p>
            ),
        }),
        columnHelper.accessor((row) => row.percipitation, {
            id: "stationPerc",
            cell: (info) => <span>{info.getValue()}</span>,
            header: () => (
                <p>
                    {i18nConditions.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.RAIN.toLowerCase())}
                    <span className="ml-1 text-xs">({Measurements.MILLIMETER})</span>
                </p>
            ),
        }),
        columnHelper.accessor((row) => row.windspd, {
            id: "stationWindSpd",
            cell: (info) => <span>{info.getValue()}</span>,
            header: () => (
                <p>
                    {i18nConditions.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.WIND.toLowerCase())}
                    <span className="ml-1 text-xs">({Measurements.SPEED})</span>
                </p>
            ),
        }),
        columnHelper.accessor((row) => row.winddir, {
            id: "stationWindDir",
            cell: (info) => {
                const windspd = info.getValue();
                return (
                    <div className="h-4 w-6">
                        <SvgInline
                            path="/weather_icons/wind.svg"
                            title="Wind icon"
                            className="fill-primary"
                            style={{
                                transform: `rotate(${windspd}deg)`,
                            }}
                        />
                    </div>
                );
            },
            header: () => <p>{i18nConditions.getFixedT(selectedLanguage, "weather_conditions")(WeatherConditions.WINDDIR.toLowerCase())}</p>,
        }),
        columnHelper.accessor((row) => row.date_created, {
            id: "stationUpdate",
            cell: (info) => {
                return <span>{fullDateWithTime(info.getValue())}</span>;
            },
            header: () => <p>{i18n.getFixedT(selectedLanguage, "common")("StationsTable.lastUpdate")}</p>,
            enableSorting: false,
        }),
        columnHelper.accessor((row) => row.weather_station_id.id, {
            id: "stationFavourite",
            cell: (info) => {
                return (
                    <div>
                        <CommonButton
                            handleClick={() => handleFavouriteButton(info.getValue())}
                            color={isStationFavourite(info.getValue()) ? "primary" : "secondary"}
                        >
                            <HeartIcon className="size-8 p-1" />
                        </CommonButton>
                    </div>
                );
            },
            header: () => <span>{i18n.getFixedT(selectedLanguage, "common")("StationsTable.favourite")}</span>,
            enableSorting: false,
        })
    ];
};
