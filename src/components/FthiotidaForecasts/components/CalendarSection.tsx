import { useEffect, useRef, useState } from "react";
import dayjs from "@/utils/dateTimeUtils";
import { FthiotidaForecastDates } from "@/types";
import { dateValueOf, isTheSame } from "@/utils/dateManipulation";

type CalendarSectionProps = {
    handleClickfn: (date: number) => void;
    selectedDate: number;
    forecastDates?: FthiotidaForecastDates[];
};

type AllDates = {
    label: string;
    value: number;
    hasForecast?: boolean;
};

const CalendarSettings = {
    futureDays: 2,
    pastDays: 7,
};

export default function CalendarSection(props: Readonly<CalendarSectionProps>) {
    const [dates, setDates] = useState<AllDates[]>([{ label: "", value: 0 }]);
    const scrollRef = useRef<(HTMLAnchorElement | null)[]>([]);

    const generateCalendarDates = () => {
        const today = dayjs();
        const futureDates = [];
        const pastDates = [];
        for (let i = 0; i <= CalendarSettings.futureDays; i++) {
            futureDates.push({
                label: today.add(i, "day").format("DD ddd MMM"),
                value: dateValueOf(today.add(i, "day").toDate()),
            });
        }
        for (let i = 1; i <= CalendarSettings.pastDays; i++) {
            pastDates.push({
                label: today.subtract(i, "day").format("DD ddd MMM"),
                value: dateValueOf(today.subtract(i, "day").toDate()),
            });
        }
        const allDates = [...pastDates.reverse(), ...futureDates];
        return allDates;
    };

    const scrollToSection = (id: number) => {
        const element = scrollRef.current[id];
        if (element) {
            element.scrollIntoView({
                behavior: "smooth", inline: "center", block: "center",
            });
        }
    };

    const addForecastDatesIntoCalendar = () => {
        if (props.forecastDates) {
            const dates = generateCalendarDates();
            const forecastDates = dates.map(date => {
                const findIndex = props.forecastDates?.findIndex(f => {
                    return isTheSame({ firstDate: f.forecast_date, secondDate: date.value });
                });
                if (findIndex !== -1) {
                    return {
                        ...date,
                        hasForecast: true,
                    };
                }
                return {
                    ...date,
                };
            });
            setDates(forecastDates);
        }
    };

    useEffect(() => {
        if (props.selectedDate && dates.length > 0) {
            const index = dates.findIndex(date => isTheSame({ firstDate: date.value, secondDate: props.selectedDate }));
            if (index !== -1) {
                scrollToSection(index);
            }
        }
    }, [props.selectedDate, dates]);

    useEffect(() => {
        if (props.forecastDates) {
            addForecastDatesIntoCalendar();
        }
    }, [props.forecastDates]);  

    return (
        <div className="flex gap-2 overflow-hidden overflow-x-auto overscroll-contain">
            {dates.map((date, index) => {
                const activeClass = isTheSame({ firstDate: date.value, secondDate: props.selectedDate }) ? "bg-info text-white border-info/25" : "bg-white text-primary border-gray/25";
                return (
                    <a key={index}
                        className={`my-4 block w-28 shrink-0 rounded-xl border p-2 ${activeClass} cursor-pointer`}
                        ref={ref => { scrollRef.current[index] = ref; }}
                        onClick={() => props.handleClickfn(date.value)}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-center text-xl font-bold">
                                {date.label.slice(0,2)}
                                <span className="block text-sm">
                                    {date.label.slice(6,10)}
                                </span>
                            </p>
                            <p className="text-center">
                                {date.label.slice(3, 6)}
                            </p>
                            {date.hasForecast && <div className="size-2 rounded-full bg-primary"></div>}
                        </div>
                    </a>
                );
            })}
        </div>
    );
}