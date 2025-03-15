export const convertCelciusKelvin = (kelvin: number):number => {
    return Math.floor((kelvin - 273.15) * 100) / 100;
}; 