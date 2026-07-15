import { StationResponse, WeatherDataResponse } from "@/types";

export const applyStationTranslations = (
    elem: WeatherDataResponse,
    lng: string
): WeatherDataResponse => {
    const station = elem.weather_station_id;

    if (lng && station.translations) {
        const translatedStationName = station.translations.find(
            (translation) => translation.languages_code === lng
        );
        if (translatedStationName) {
            station.name = translatedStationName.name;
        }
    }

    if (lng && station.prefecture_id?.translations) {
        const translatedPrefecture = station.prefecture_id.translations.find(
            (translation) => translation.languages_code === lng
        );
        if (translatedPrefecture) {
            station.prefecture_id.label = translatedPrefecture.name;
        }
    }

    return elem;
};

export const buildWeatherData = (elem: WeatherDataResponse) => {
    return {
        dateCreated: elem.date_created,
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
        full_forecast: [],
    };
};

export const getReversedCoordinates = (coordinates: [number, number]): [number, number] => {
    return [coordinates[1], coordinates[0]];
};

export const buildStation = (elem: StationResponse) => {
    return {
        id: elem.id,
        name: elem.name,
        location: elem.location,
        currentWeatherDescription: elem.accuweather_location.current_weather_description,
        currentWeatherConditionIcon: elem.accuweather_location.weather_condition_icon.asset,
        elevation: elem.elevation,
        translations: elem.translations,
    };
};
