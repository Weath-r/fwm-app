import dynamic from "next/dynamic";
import configuration from "@/app/appConfig";
import { useAssetsFromFolder } from "@/hooks/useFetchAssetsFromFolder";
import { timeOnlyUtil, dayWithNameNoMonthUtil } from "@/utils/dateTimeUtils";
import { addTimeToDate } from "@/utils/dateManipulation";
import { DataService } from "@/services/DataService";
import { useState, useEffect } from "react";
import CommonSlider from "@/components/Common/CommonSlider";
import { useMapStore } from "@/stores/mapStore";

const WindLayer = dynamic(() => import("@/components/Home/Layers/WindLayer"), {
    ssr: false,
});

type ForecastHours = {
    labelDay: string;
    labelHour: string;
    value: string;
    hour: number;
};

type Forecast = {
    [k:string]: {
        data: number[],
        header: {
            category: string;
        }
    }
};

type CreateProperTimestampLabel = {
    inputDate: string | Date;
    hoursAdd: number;
};
export default function ForecastLayer() {
    const [activeForecastHour, setActiveForecastHour] = useState<string>("");
    const [forecastHours, setForecastHours] = useState<ForecastHours[]>([]);
    const [forecast, setForecast] = useState<Forecast>({});
    const [forecastDate, setForecastDate] = useState<string>("");
    const [sliderMarks, setSliderMarks] = useState({});
    const [sliderDefaultValue, setSliderDefaultValue] = useState<number>(0);

    const folderId = configuration.forecastJsonFolder;
    const assetsFolder = useAssetsFromFolder(folderId);

    const map = useMapStore((state) => state.map);
    const dataService = new DataService();

    const createProperTimestampLabel = ({ inputDate, hoursAdd }: CreateProperTimestampLabel): string => {
        return addTimeToDate({
            inputDate,
            numberAdd: hoursAdd,
            type: "hours",
        });
    };
    const fetchForecastAsset = async (fileId: string) => {
        await dataService
            .fetchAsset(fileId)
            .then((response) => {
                const hours = Object.keys(response.data).map(elem => {
                    const label = elem.split("_")[0];
                    const baseHour = label.slice(8,10);
                    const inputDate = `${label.slice(0,8)} ${baseHour}:00`;
                    setForecastDate(inputDate);
                    const hour = parseInt(elem.split("_")[1]);
                    const forecastDate = createProperTimestampLabel({ inputDate, hoursAdd: hour });

                    return {
                        labelDay: dayWithNameNoMonthUtil(forecastDate),
                        labelHour: timeOnlyUtil(forecastDate),
                        hour,
                        value: elem,
                    };
                });

                const sliderMarks = hours.reduce((acc, currentValue) => {
                    return {
                        ...acc,
                        [currentValue.hour]: createMarkLabels(currentValue),
                    };
                },{});

                function createMarkLabels(label: ForecastHours) {
                    if (label.labelHour === "00:00") {
                        return <div className="flex items-center border-r border-gray pr-1">
                            <p className="!text-xs text-primary">
                                {label.labelDay}
                            </p>
                        </div>;
                    } else {
                        return "";
                    }
                }

                const setInitialActiveForecastHour = (hoursArray: ForecastHours[]) => {
                    const date = new Date();
                    const labelDay = dayWithNameNoMonthUtil(date);
                    const labelHour = timeOnlyUtil(date).slice(0,2);
                    const valueHoursIndex = hoursArray.findIndex(elem => elem.labelDay === labelDay && elem.labelHour === `${labelHour}:00`);
                    setSliderDefaultValue(hoursArray[valueHoursIndex].hour);
                    return hoursArray[valueHoursIndex].value;
                };

                setSliderMarks(sliderMarks);
                setActiveForecastHour(setInitialActiveForecastHour(hours));
                setForecast(response.data);
                setForecastHours(hours);
            })
            .catch((error) => {
                console.log(error);
                setForecast({});
            });
    };

    const handleSliderEvent = (ev: number | number[]) => {
        const activeForecast = forecastHours.find(elem => elem.hour === ev)?.value;
        if (activeForecast) {
            setActiveForecastHour(activeForecast);
        } 
    };

    const createSliderTooltipLabel = ( tooltipValue: number ):string => {
        const date = createProperTimestampLabel({
            inputDate: forecastDate,
            hoursAdd: tooltipValue,
        });
        return `${dayWithNameNoMonthUtil(date)} - ${timeOnlyUtil(date)}`;
    };
    
    useEffect(() => {
        if(assetsFolder.length > 0) {
            fetchForecastAsset(assetsFolder[0].id);
        }
    },[assetsFolder]);

    return (
        <div className="absolute bottom-0 z-[2] w-full">
            {activeForecastHour && map && 
                <WindLayer 
                    map={map}
                    forecastData={forecast[activeForecastHour]}
                ></WindLayer>
            }
            {
                map && 
            <div className="ml-auto mr-2 w-3/4 rounded bg-white/75 lg:mx-auto lg:mr-0 lg:w-3/5">
                <div className="p-4">
                    <CommonSlider
                        marks={sliderMarks}
                        max={48}
                        step={1}
                        defaultValue={sliderDefaultValue}
                        onChange={ value => handleSliderEvent(value) }
                        createTooltipLabel={createSliderTooltipLabel}
                    />
                </div>
            </div>
            }
        </div>
    );
}
