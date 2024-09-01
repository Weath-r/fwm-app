import dayjs from "dayjs";

export const dateTimeOfPastTwoDays = (inputDate: Date): boolean => {
    const now = dayjs();
    const dayBeforeYesterday = now.subtract(2, "day");
    return dayjs(inputDate) > dayBeforeYesterday;
};

export const dateValueOf = (inputDate : Date) : number => dayjs(inputDate).valueOf();