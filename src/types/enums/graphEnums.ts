import { Measurements } from "../measurements";

export enum GraphVariables {
    temperature = "temperature",
    humidity = "humidity",
    barometer = "barometer",
    percipitation = "percipitation",
    rainrate = "rainrate",
    windspd = "windspd",
}

export enum GraphVariablesSuffixes {
    temperature = Measurements.CELCIUS,
    humidity = Measurements.PERCENTAGE,
    barometer = Measurements.PRESSURE,
    percipitation = Measurements.MILLIMETER,
    rainrate = Measurements.MMHR,
    windspd = Measurements.SPEED,
    windspdBft = Measurements.BFT,
}

export enum  TickIntervalPerVariable {
    temperature = 4,
    humidity = 10,
    barometer = 2,
    percipitation = .5,
    rainrate = 1,
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    windspd = 4,
};