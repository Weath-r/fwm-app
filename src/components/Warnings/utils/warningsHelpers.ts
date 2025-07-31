export const printIssuedByUser = (meteoalarmId: string): string => {
    return meteoalarmId !== "0" ? "EMY" : "System";
};