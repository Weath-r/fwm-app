export const windDirectionCalc = (degree: number):string => {
    const directions = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SW",
        "W",
        "NW"
    ];
    const index = Math.floor((degree + 22.5) / 45) % 8;
    return directions[index];
};