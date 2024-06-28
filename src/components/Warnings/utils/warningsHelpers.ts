export const printIssuedByUser = (meteoalarmId: string): string => {
    return meteoalarmId ? "EMY" : "System";
};