import dayjs from "./dateTimeUtils";

export const dateTimeOfPastTwoDays = (inputDate: Date | string): boolean => {
    const now = dayjs();
    const dayBeforeYesterday = now.subtract(2, "day");
    return dayjs(inputDate) > dayBeforeYesterday;
};

export const dateValueOf = (inputDate : Date | string) : number => dayjs(inputDate).valueOf();

export const addTimeToDate = ({
    inputDate,
    numberAdd,
    type,
}: {
    inputDate: string | Date;
    numberAdd: number;
    type: dayjs.ManipulateType;
}): string => {
    const date = dayjs(inputDate);
    const timezoneDifference = getTimezoneDifferenceFromUTC();
    return date.add(numberAdd + timezoneDifference, type).format();
};

function getTimezoneDifferenceFromUTC():number {
    const date = new Date();
    const timezoneOffsetInMinutes = date.getTimezoneOffset();
    const timezoneOffsetInHours = -timezoneOffsetInMinutes / 60;
    return timezoneOffsetInHours;
}