import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const timeFromNowUtil = (inputDate: Date, suffix: boolean = false): string => {
    return dayjs(inputDate).fromNow(suffix);

};

export const timeOnlyUtil = (inputDate: Date): string => {
    return dayjs(inputDate).format("HH:mm");
};

export const dayWithNameUtil = (inputDate: Date): string => {
    return dayjs(inputDate).format("dddd, DD MMM");
};

export const fullDateWithTime = (inputDate: Date): string => {
    return dayjs(inputDate).format("DD/MM/YYYY, HH:mm");
};

export const fullDateNoTime = (inputDate: Date): string => {
    return dayjs(inputDate).format("DD/MM/YYYY");
};

export const dateWithNameTime = (inputDate: Date): string => {
    return dayjs(inputDate).format("ddd, MMM DD, HH:mm");
};