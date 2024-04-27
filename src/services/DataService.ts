import { StationResponse, WeatherDataResponse } from "@/types";
import { createAxiosInstance } from "@/utils/httpClientUtils";
import { AxiosInstance } from "axios";

export class DataServiceError extends Error {
    constructor(
        message: string,
        public status?: number
    ) {
        super(message);
    }
}

export class DataService {
    client: AxiosInstance;

    constructor() {
        this.client = createAxiosInstance();
    }

    fetchWeatherDataByStation = (station_id: number): Promise<WeatherDataResponse[]> => {
        const WEATHER_DATA_FILTER_PREFIX = "items/weather_data";
        const WEATHER_DATA_FILTER = `?filter[_and][0][weather_station_id][id][_eq]=${station_id}&sort=-date_created&limit=1&fields=date_created,temperature,barometer,humidity,percipitation,rainrate,windspd,winddir,weather_condition,weather_station_id.name,weather_station_id.id,weather_station_id.website_url,weather_station_id.prefecture_id.label,weather_condition_icon`;
        const WEATHER_DATA_PATH = `${WEATHER_DATA_FILTER_PREFIX}${WEATHER_DATA_FILTER}`;

        return new Promise<WeatherDataResponse[]>((resolve, reject) => {
            return this.client
                .get(`${WEATHER_DATA_PATH}`)
                .then((response) => {
                    // TO-DO check against the type with zod and return error
                    resolve(response.data.data);
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    fetchWeatherStations = (): Promise<StationResponse[]> => {
        const STATIONS_FILTER_PREFIX = "items/weather_stations";
        const STATIONS_FILTER =
            "?fields=id,name,location,website_url&fields=accuweather_location.current_weather_description,accuweather_location.weather_condition_icon.asset&filter[_and][0][_and][0][status][_eq]=published";
        const STATIONS_PATH = `${STATIONS_FILTER_PREFIX}${STATIONS_FILTER}`;

        return new Promise<any>((resolve, reject) => {
            return this.client
                .get(`${STATIONS_PATH}`)
                .then((response) => {
                    // TO-DO check against the type with zod and return error
                    resolve(response.data.data);
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    private generateDataServiceError = (error: any): DataServiceError => {
        if (!error.response) {
            return new DataServiceError(error.message);
        }
        return new DataServiceError(error.message, error.response.status);
    };
}
