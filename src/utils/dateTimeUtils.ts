import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export const timeFromNowUtil = (inputDate: Date | string, suffix: boolean = false): string => {
    return dayjs(inputDate).fromNow(suffix);
};

export const timeOnlyUtil = (inputDate: Date | string): string => {
    return dayjs(inputDate).format("HH:mm");
};

export const dayWithNameUtil = (inputDate: Date | string): string => {
    return dayjs(inputDate).format("dddd, DD MMM");
};

export const dayWithNameUtilWithCustom = (inputDate: Date|string): string => {
    return dayjs(inputDate, ["DD-MM-YYYY"]).format("ddd, DD");
};

export const fullDateWithTime = (inputDate: Date | string): string => {
    return dayjs(inputDate).format("DD/MM/YYYY, HH:mm");
};

export const fullDateNoTime = (inputDate: Date | string): string => {
    return dayjs(inputDate).format("DD/MM/YYYY");
};

export const dateWithNameTime = (inputDate: Date | string): string => {
    return dayjs(inputDate).format("ddd, MMM DD, HH:mm");
};

export const dateWithMsToDay = (inputDate: number|string):string => {
    return dayjs(inputDate).format("DD/MM");
};