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