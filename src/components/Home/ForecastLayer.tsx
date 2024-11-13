import configuration from "@/app/appConfig";
import { useAssetsFromFolder } from "@/hooks/useFetchAssetsFromFolder";
import { timeOnlyUtil, dayWithNameNoMonthUtil } from "@/utils/dateTimeUtils";
import { addTimeToDate } from "@/utils/dateManipulation";
import { DataService } from "@/services/DataService";
import { useState, useEffect } from "react";
import CommonSlider from "@/components/Common/CommonSlider";
import { useForecastLayerStore } from "@/stores/forecastLayerStore";
import { TemperatureColorList } from "@/constants/Colors";
import { hexToRgba } from "@/utils/colorManipulation";

type ForecastHours = {
    labelDay: string;
    labelHour: string;
    value: string;
    hour: number;
};

type CreateProperTimestampLabel = {
    inputDate: string | Date;
    hoursAdd: number;
};

export default function ForecastLayer() {
    const { setForecastData, setActiveForecastHour } = useForecastLayerStore();
    const [forecastHours, setForecastHours] = useState<ForecastHours[]>([]);
    const [forecastDate, setForecastDate] = useState<string>("");
    const [sliderMarks, setSliderMarks] = useState({});
    const [sliderDefaultValue, setSliderDefaultValue] = useState<number>(0);

    const folderId = configuration.forecastJsonFolder;
    const assetsFolder = useAssetsFromFolder(folderId);
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

                const sliderMarks = hours.reduce((acc, currentValue, currentIndex) => {
                    return {
                        ...acc,
                        [currentValue.hour]: createMarkLabels(currentValue, currentIndex),
                    };
                },{});

                function createMarkLabels(label: ForecastHours, currentIndex: number) {
                    if (label.labelHour === "00:00" || currentIndex === 0) {
                        return label.labelDay;
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
                setForecastHours(hours);
                setActiveForecastHour(setInitialActiveForecastHour(hours));
                setForecastData(response.data);
            })
            .catch((error) => {
                console.log(error);
                setForecastData({});
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
        return forecastDate && `${timeOnlyUtil(date)}`;
    };
    
    useEffect(() => {
        if(assetsFolder.length > 0) {
            fetchForecastAsset(assetsFolder[0].id);
        }
    },[assetsFolder]);

    const createGradient = () => {
        const colors: string[] = [];
        TemperatureColorList.forEach(color => colors.push(hexToRgba(color, .6)));
        return `linear-gradient(to right, ${colors.join(", ")})`;
    };

    return (
        <div className="flex flex-col justify-center lg:flex-row lg:justify-evenly">
            <div className="mx-auto mb-2 w-11/12 rounded bg-white/75 lg:mb-0 lg:w-3/5">
                <div className="p-2 pb-0">
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
            <div className="mr-4 w-full rounded lg:w-2/12 lg:translate-y-1/2">
                <div 
                    style={{ background: createGradient() }} 
                    className="pointer-events-none flex w-full justify-between rounded-lg p-1 text-xs text-white"
                >
                    <span style={{ width:"12.5%" }}>
                     °C
                    </span>
                    {[-20, -10, 0, 10, 20, 30, 40].map((temp) => {
                        return (
                            <span style={{ width:"12.5%" }}
                                key={temp}>
                                {temp}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
