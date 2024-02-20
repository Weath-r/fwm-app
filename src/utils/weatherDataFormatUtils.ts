import { WeatherData } from "@/types";

type literalOptions = {
    [key: string]: string;
};

/**
 * @todo Propably move these literals to some place better. Maybe i18n?
 */
const literals: literalOptions = {
    cloudy: "Cloudy",
    cold: "Cold!",
    dreary_overcast: "Dreary overcast",
    flurries: "Flurries",
    fog: "Fog",
    freezing_rain: "Freezing rain",
    hazy_sunshine: "Hazy sunshine",
    hot: "Hot!",
    ice: "Icy conditions",
    intermittent_clouds: "Intermittent clouds",
    light_rain: "Light rain",
    mostly_cloudy_w_flurries: "Mostly cloudy with flurries",
    mostly_cloudy_w_showers: "Mostly cloudy with showers",
    mostly_cloudy_w_snow: "Mostly cloudy with snow",
    "mostly_cloudy_w_t-storms": "Mostly cloudy with thunderstorms",
    mostly_cloudy: "Mostly cloudy",
    mostly_sunny: "Mostly sunny",
    partly_cloudy_w_flurries: "Partly loudy with flurries",
    partly_cloudy_w_showers: "Partly loudy with showers",
    "partly_cloudy_w_t-storms": "Partly loudy with thunderstorms",
    partly_sunny: "Partly sunny",
    rain_and_snow: "Rain & snow",
    rain: "Rain",
    showers: "Showers",
    sleet: "Sleet",
    snow: "Snow",
    "t-storms": "Thunderstorms",
    thunderstorm: "Thunderstorm",
    windy: "Windy",
    clear: "Clear night",
    sunny: "Sunny",
    mostly_clear: "Mostly clear",
    hazy_moonlight: "Hazy moonlight",
};

export const weatherConditionsText = (text: string): string => {
    return literals[text];
};

export const formatDate = (inputDate: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    };
    const date: Date = new Date(inputDate);
    const formattedDate: string = date.toLocaleDateString("en-US", options);
    return formattedDate;
};

export const buildExportedWeatherDataObject = (elem: WeatherData) => {
    return {
        date_created: elem.date_created,
        temperature: elem.temperature,
        humidity: elem.humidity,
        barometer: elem.barometer,
        percipitation: elem.percipitation,
        rainrate: elem.rainrate,
        windspd: elem.windspd,
        winddir: elem.winddir,
        station: elem.weather_station_id,
        weatherDescription: elem.weather_condition,
        assetId: elem.weather_condition_icon,
    };
};
