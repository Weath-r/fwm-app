import { getFthiotidaForecasts } from "@/services/getFthiotidaForecasts";
import {
    ATHENS_TIMEZONE,
    selectForecastDays,
    type FthiotidaForecastDay,
} from "@/helpers/fthiotida/forecastDays";
import { buildDayModel } from "@/helpers/fthiotida/sectionModel";
import FthiotidaSectionView, { type FthiotidaDay } from "./FthiotidaSectionView";

type FthiotidaSectionProps = {
    lng: string;
};

const formatForecastDate = (forecastDate: string, lng: string): string =>
    new Intl.DateTimeFormat(lng === "el" ? "el-GR" : "en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: ATHENS_TIMEZONE,
    }).format(new Date(`${forecastDate}T12:00:00Z`));

const toDay = (day: FthiotidaForecastDay | null, lng: string): FthiotidaDay | null =>
    day && { dateLabel: formatForecastDate(day.forecastDate, lng), model: buildDayModel(day) };

export default async function FthiotidaSection({ lng }: FthiotidaSectionProps) {
    const days = await getFthiotidaForecasts().catch(() => []);
    const { today, tomorrow } = selectForecastDays(days);
    return (
        <FthiotidaSectionView lng={lng} today={toDay(today, lng)} tomorrow={toDay(tomorrow, lng)} />
    );
}
