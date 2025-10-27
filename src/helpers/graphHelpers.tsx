import { Measurements } from "@/types";
export const temperatureZones = [
    {
        value: -20,
        color: "#54b3b6",
    },{
        value: 0,
        color: "#5490b6",
    },{
        value: 10,
        color: "#5480b6",
    },{
        value: 18,
        color: "#54b682",
    },{
        value: 26,
        color: "#dc8100",
    },{
        value: 32,
        color: "#d85c31",
    }, {
        color: "#f00098",
    }
];

export const windSpeedZones = [
    { value: 0,  color: "#b3e6ff" },  // Calm (0)
    { value: 6,  color: "#99ccff" },  // Light air/breeze (1–2)
    { value: 12, color: "#66b2ff" },  // Gentle breeze (3)
    { value: 20, color: "#3399ff" },  // Moderate breeze (4)
    { value: 29, color: "#0073e6" },  // Fresh breeze (5)
    { value: 39, color: "#0059b3" },  // Strong breeze (6)
    { value: 50, color: "#33cc33" },  // Near gale (7)
    { value: 62, color: "#ffcc00" },  // Gale (8)
    { value: 75, color: "#ff6600" },  // Strong gale (9)
    { value: 88, color: "#ff0000" },  // Storm (10)
    { value: 102, color: "#b30000" }, // Violent storm (11)
    { color: "#800080" }             // Hurricane (≥12)
];

export const humidityZones = [
    { value: 0,   color: "#f7b267" },  // Very dry
    { value: 20,  color: "#f79d65" },  // Dry
    { value: 40,  color: "#f4845f" },  // Moderate
    { value: 60,  color: "#a6c36f" },  // Comfortable
    { value: 75,  color: "#54b682" },  // Humid
    { value: 90,  color: "#5490b6" },  // Very humid
    { color: "#4b4fb6" }              // Saturated (near 100%)
];

export const pressureZones = [
    { value: 970, color: "#4b4fb6" },  // Very low (storm/depression)
    { value: 985, color: "#5490b6" },  // Low
    { value: 1000, color: "#54b3b6" }, // Slightly low
    { value: 1013, color: "#54b682" }, // Normal (standard pressure)
    { value: 1020, color: "#a6c36f" }, // Slightly high
    { value: 1030, color: "#dc8100" }, // High
    { color: "#d85c31" }              // Very high (strong anticyclone)
];

export const windPlotBands = [
    {
        from: 0,
        to: 6,
        color: "transparent",
        label: {
            text: `0 ${Measurements.BFT}`,
            style: { color: "#b3e6ff" },
        },
    },
    {
        from: 6,
        to: 12,
        color: "transparent",
        label: {
            text: `1-2 ${Measurements.BFT}`,
            style: { color: "#99ccff" },
        },
    },
    {
        from: 12,
        to: 20,
        color: "transparent",
        label: {
            text: `3 ${Measurements.BFT}`,
            style: { color: "#66b2ff" },
        },
    },
    {
        from: 20,
        to: 29,
        color: "transparent",
        label: {
            text: `4 ${Measurements.BFT}`,
            style: { color: "#3399ff" },
        },
    },
    {
        from: 29,
        to: 39,
        color: "transparent",
        label: {
            text: `5 ${Measurements.BFT}`,
            style: { color: "#0073e6" },
        },
    },
    {
        from: 39,
        to: 50,
        color: "transparent",
        label: {
            text: `6 ${Measurements.BFT}`,
            style: { color: "#0059b3" },
        },
    },
    {
        from: 50,
        to: 62,
        color: "transparent",
        label: {
            text: `7 ${Measurements.BFT}`,
            style: { color: "#33cc33" },
        },
    },
    {
        from: 62,
        to: 75,
        color: "transparent",
        label: {
            text: `8 ${Measurements.BFT}`,
            style: { color: "#ffcc00" },
        },
    },
    {
        from: 75,
        to: 88,
        color: "transparent",
        label: {
            text: `9 ${Measurements.BFT}`,
            style: { color: "#ff6600" },
        },
    },
    {
        from: 88,
        to: 102,
        color: "transparent",
        label: {
            text: `10 ${Measurements.BFT}`,
            style: { color: "#ff0000" },
        },
    },
    {
        from: 102,
        to: 117,
        color: "transparent",
        label: {
            text: `11 ${Measurements.BFT}`,
            style: { color: "#b30000" },
        },
    },
    {
        from: 117,
        to: 200,
        color: "transparent",
        label: {
            text: `12 ${Measurements.BFT}`,
            style: { color: "#800080" },
        },
    }
];
