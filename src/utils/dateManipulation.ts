import dayjs from "./dateTimeUtils";

type CalculateDateBasedOnDays = {
    inputDate: string | Date;
    numberOfDays: number;
};

type IsSameDate = {
    firstDate: number | Date;
    secondDate: number | Date;
};

export const isWithinPastNDays = ({ inputDate, numberOfDays }: CalculateDateBasedOnDays): boolean => {
    const now = dayjs();
    const dayBeforeYesterday = now.subtract(numberOfDays, "day");
    return dayjs(inputDate).isAfter(dayBeforeYesterday);
};

export const isWithinFutureNDays = ({ inputDate, numberOfDays }: CalculateDateBasedOnDays): boolean => {
    const now = dayjs();
    const dayAfterTomorrow = now.add(numberOfDays, "day");
    return dayjs(inputDate).isBefore(dayAfterTomorrow);
};

export const isTheSame = ({ firstDate, secondDate }: IsSameDate): boolean => {
    return dayjs(firstDate).isSame(secondDate, "day");
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