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

import { PlayIcon } from "@heroicons/react/24/solid";
import { ForwardIcon } from "@heroicons/react/24/solid";
import { PauseIcon } from "@heroicons/react/24/solid";
import CommonButton from "../Common/CommonButton";

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

    const LIMITS = {
        max: 48,
        step: 1,
    };

    const createProperTimestampLabel = ({
        inputDate,
        hoursAdd,
    }: CreateProperTimestampLabel): string => {
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
                const hours = Object.keys(response.data).map((elem) => {
                    const label = elem.split("_")[0];
                    const baseHour = label.slice(8, 10);
                    const inputDate = `${label.slice(0, 8)} ${baseHour}:00`;
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
                }, {});

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
                    const labelHour = timeOnlyUtil(date).slice(0, 2);
                    const valueHoursIndex = hoursArray.findIndex(
                        (elem) => elem.labelDay === labelDay && elem.labelHour === `${labelHour}:00`
                    );
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
        const activeForecast = forecastHours.find((elem) => elem.hour === ev)?.value;
        if (activeForecast) {
            setActiveForecastHour(activeForecast);
            setSliderDefaultValue(ev as number);
        }
    };

    const createSliderTooltipLabel = (tooltipValue: number): string => {
        const date = createProperTimestampLabel({
            inputDate: forecastDate,
            hoursAdd: tooltipValue,
        });
        return forecastDate && `${timeOnlyUtil(date)}`;
    };

    useEffect(() => {
        if (assetsFolder.length > 0) {
            fetchForecastAsset(assetsFolder[0].id);
        }
    }, [assetsFolder]);

    const createGradient = () => {
        const colors: string[] = [];
        TemperatureColorList.forEach((color) => colors.push(hexToRgba(color, 0.6)));
        return `linear-gradient(to right, ${colors.join(", ")})`;
    };

    const moveOneStep = (direction: "forward" | "backward") => {
        const step = direction === "forward" ? 1 : -1;
        const newValue = sliderDefaultValue + step;
        if (newValue >= 0 && newValue <= LIMITS.max) {
            handleSliderEvent(newValue);
        }
    };

    const [sliderPlayback, setSliderPlayback] = useState<boolean>(false);
    const initializePlayback = () => {
        let sliderPosition = sliderDefaultValue !== 0 ? sliderDefaultValue : 0;
        return () => {
            sliderPosition += 1;
            if (sliderPosition > LIMITS.max) {
                sliderPosition = 0;
            }
            handleSliderEvent(sliderPosition);
        };
    };
    const timerInstance = initializePlayback();

    useEffect(() => {
        if (sliderPlayback) {
            const interval = setInterval(() => {
                timerInstance();
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [sliderPlayback]);

    return (
        <div className="flex flex-col justify-center lg:flex-row lg:justify-center mb-2">
            <div className="mx-auto w-11/12 rounded bg-white/75 lg:mb-0 lg:w-2/6">
                <div className="p-2 pb-0 flex items-center gap-1">
                    <CommonButton
                        rounded
                        className="border-2 border-primary p-1"
                        handleClick={() => moveOneStep("backward")}
                    >
                        <ForwardIcon className="size-3 fill-primary rotate-180" />
                    </CommonButton>
                    <CommonButton
                        rounded
                        className="border-2 border-primary p-1 bg-primary"
                        handleClick={() => setSliderPlayback(!sliderPlayback)}
                    >
                        {!sliderPlayback && <PlayIcon className="size-5 fill-white" />}
                        {sliderPlayback && <PauseIcon className="size-5 fill-white" />}
                    </CommonButton>
                    <CommonButton
                        rounded
                        className="border-2 border-primary p-1"
                        handleClick={() => moveOneStep("forward")}
                    >
                        <ForwardIcon className="size-3 fill-primary" />
                    </CommonButton>
                    <div className="w-full">
                        <CommonSlider
                            marks={sliderMarks}
                            max={LIMITS.max}
                            step={LIMITS.step}
                            value={sliderDefaultValue}
                            onChange={(value) => handleSliderEvent(value)}
                            createTooltipLabel={createSliderTooltipLabel}
                        />
                    </div>
                </div>
            </div>
            <div className="mr-4 w-11/12 mx-auto rounded mt-1 lg:mt-0 lg:w-2/12 lg:translate-y-1/2">
                <div
                    style={{ background: createGradient() }}
                    className="pointer-events-none flex w-full justify-between rounded-lg p-1 text-xs text-white"
                >
                    <span style={{ width: "12.5%" }}>°C</span>
                    {[-20, -10, 0, 10, 20, 30, 40].map((temp) => {
                        return (
                            <span style={{ width: "12.5%" }} key={temp}>
                                {temp}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
