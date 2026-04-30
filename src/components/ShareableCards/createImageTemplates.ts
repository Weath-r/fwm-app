type CreateImageProps = {
    stationName: string;
    weatherDescription: string;
    temperature: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    weatherIcon: string;
    language: string;
};

export const createCurrentWeatherConditionsImage = async ({
    stationName,
    weatherDescription,
    temperature,
    humidity,
    precipitation,
    windSpeed,
    weatherIcon,
    language,
}: CreateImageProps) => {
    try {
        const urlParamsOptions = {
            stationName: stationName,
            weatherDescription: weatherDescription,
            temperature: temperature.toString(),
            humidity: humidity.toString(),
            precipitation: precipitation.toString(),
            weatherIcon: weatherIcon,
            windSpeed: windSpeed.toString(),
        };
        const response = await fetch(
            `/api/${language}/share-card?cardType=current-weather&${new URLSearchParams(urlParamsOptions)}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch OG image");
        }
        return await response.blob();
    } catch (error) {
        console.error("Error fetching OG image:", error);
        return null;
    }
};
