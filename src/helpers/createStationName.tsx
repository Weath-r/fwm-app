export const urlStationName = (stationName: string):string => {
    return stationName.replaceAll(" ", "_");
};

export const properStationName = (stationName: string):string => {
    return stationName.replaceAll("_", " ");
};