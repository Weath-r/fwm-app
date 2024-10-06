import { 
    StationResponse,
    WeatherDataResponse,
    WeatherWarnings,
    WarningHazard,
    WarningLevel,
    WarningsWithPages,
    Configurations,
    WeatherForecastResponse,
    FetchStationDataPaginated,
    Assets
} from "@/types";
import { createAxiosInstance } from "@/utils/httpClientUtils";
import { AxiosInstance, AxiosResponse } from "axios";
import { z } from "zod";
import { 
    StationResponsesSchema,
    // WeatherDataResponsesSchema,
    WarningsResponsesSchema,
    HazardLevelsResponsesSchema,
    WarningLevelsResponsesSchema,
    ConfigurationSchema,
    WeatherForecastDataResponsesSchema,
    AssetsSchema
} from "@/schemas";

type HandleResponseParams<T> = {
    response: AxiosResponse;
    schema: z.ZodSchema<T>;
    reject: (reason?: any) => void;
};

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

    fetchWeatherStations = (): Promise<StationResponse[]> => {
        const STATIONS_FILTER_PREFIX = "items/weather_stations";
        const STATIONS_FILTER = "?fields=id,name,location,website_url&fields=accuweather_location.current_weather_description,accuweather_location.weather_condition_icon.asset&filter[_and][0][_and][0][status][_eq]=published";
        const STATIONS_PATH = `${STATIONS_FILTER_PREFIX}${STATIONS_FILTER}`;

        return new Promise<any>((resolve, reject) => {
            return this.client
                .get(`${STATIONS_PATH}`)
                .then((response) => {
                    const { res, error } = this.handleResponse({ 
                        response, 
                        schema: StationResponsesSchema,
                        reject,
                    });
                    if ( res && !error ) {
                        resolve(res);
                    }
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    // WindDir returns null values for Mavrolithari.
    // We need to handle it in the BE.
    // ZOD IS DISABLED
    fetchWeatherDataByStation = (station_id: number): Promise<WeatherDataResponse[]> => {
        const WEATHER_DATA_FILTER_PREFIX = "items/weather_data";
        const WEATHER_DATA_FILTER = `?filter[_and][0][weather_station_id][id][_eq]=${station_id}&sort=-date_created&limit=1&fields=date_created,temperature,barometer,humidity,percipitation,rainrate,windspd,winddir,weather_condition,weather_station_id.name,weather_station_id.id,weather_station_id.website_url,weather_station_id.prefecture_id.label,weather_condition_icon`;
        const WEATHER_DATA_PATH = `${WEATHER_DATA_FILTER_PREFIX}${WEATHER_DATA_FILTER}`;

        return new Promise<WeatherDataResponse[]>((resolve, reject) => {
            return this.client
                .get(`${WEATHER_DATA_PATH}`)
                .then((response) => {
                    // const { res, error } = this.handleResponse({ 
                    //     response, 
                    //     schema: WeatherDataResponsesSchema,
                    //     reject,
                    // });
                    // if ( res && !error ) {
                    //     resolve(res);
                    // }
                    resolve(response.data.data);
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    // WindDir returns null values for Mavrolithari.
    // We need to handle it in the BE.
    // ZOD IS DISABLED
    fetchWeatherDataByStationPaginated = ({
        station_id,
        start_date,
        end_date,
        page = 1,
        limit = 64,
    }: FetchStationDataPaginated): Promise<WeatherDataResponse[]> => {
        const WEATHER_DATA_FILTER_PREFIX = "items/weather_data";
        const WEATHER_DATA_FILTER = `?filter[_and][0][weather_station_id][id][_eq]=${station_id}&sort=-date_created&fields=date_created,temperature,barometer,humidity,percipitation,rainrate,windspd,winddir,weather_condition,weather_station_id.name,weather_station_id.id,weather_station_id.website_url,weather_station_id.prefecture_id.label,weather_condition_icon&filter[_and][0][_and][1][date_created][_lte]=${end_date}&filter[_and][0][_and][2][date_created][_gte]=${start_date}&page=${page}&limit=${limit}`;

        const WEATHER_DATA_PATH = `${WEATHER_DATA_FILTER_PREFIX}${WEATHER_DATA_FILTER}`;

        return new Promise<WeatherDataResponse[]>((resolve, reject) => {
            return this.client
                .get(`${WEATHER_DATA_PATH}`)
                .then((response) => {
                    // const { res, error } = this.handleResponse({ 
                    //     response, 
                    //     schema: WeatherDataResponsesSchema,
                    //     reject,
                    // });
                    // if ( res && !error ) {
                    //     resolve(res);
                    // }
                    resolve(response.data.data);
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    
    fetchWeatherStationsWithData = (): Promise<WeatherDataResponse[]> => {
        const WEATHER_DATA_FILTER_PREFIX = "items/weather_data";
        const DATE_FILTERS = {
            from: "$NOW(-1 hour)",
            to: "$NOW",
        };
        const WEATHER_DATA_FILTER = `?filter[_and][0][_and][1][weather_station_id][status][_eq]=published&filter[_and][0][_and][0][date_created][_between][0]=${DATE_FILTERS.from}&filter[_and][0][_and][0][date_created][_between][1]=${DATE_FILTERS.to}&sort=date_created&fields=date_created,temperature,barometer,humidity,percipitation,rainrate,windspd,winddir,weather_condition,weather_station_id.name,weather_station_id.id,weather_station_id.website_url,weather_station_id.prefecture_id.label,weather_condition_icon`;
        const WEATHER_DATA_PATH = `${WEATHER_DATA_FILTER_PREFIX}${WEATHER_DATA_FILTER}`;

        return new Promise<any>((resolve, reject) => {
            return this.client
                .get(WEATHER_DATA_PATH)
                .then((response) => {
                    let result: WeatherDataResponse[] = [];
                    response.data.data
                        .forEach((element:WeatherDataResponse) => {
                            const previousMeasurement = result.findIndex(res => res.weather_station_id.id === element.weather_station_id.id);
                            if (previousMeasurement !== -1) {
                                const difference = element.temperature - result[previousMeasurement].temperature;
                                result[previousMeasurement].temp_difference =  Math.round(difference * 10 ) / 10;
                                result[previousMeasurement].date_created = element.date_created;
                            } else {
                                result.push(element);
                            }
                        });
                    result = result.sort((a,b) => {
                        return a.weather_station_id.name.localeCompare(b.weather_station_id.name);
                    });
                    resolve(result);
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    fetchWeatherWarningsByCreatedDate = (date:string): Promise<WeatherWarnings[]> => {
        const WARNINGS_PREFIX = "items/weather_warnings";
        const WARNING_FILTER =
            `?fields=id,date_created,meteoalarm_warning_id,start_date,end_date,description_en,description_el,instruction_en,instruction_el,warning_location_id.label,warning_location_id.value,warning_location_id.geojson,warning_location_id.order,level_id.id,level_id.label,level_id.color,hazard_id.label,hazard_id.asset&filter[_and][0][_and][0][date_created][_gt]=${date}&filter[_and][0][_and][1][end_date][_gt]=$NOW`;
        const WARNINGS_PATH = `${WARNINGS_PREFIX}${WARNING_FILTER}`;

        return new Promise<any>((resolve, reject) => {
            return this.client
                .get(`${WARNINGS_PATH}`)
                .then((response) => {
                    const { res, error } = this.handleResponse({ 
                        response, 
                        schema: WarningsResponsesSchema,
                        reject,
                    });
                    if ( res && !error ) {
                        resolve(res);
                    }
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    fetchWeatherHazards = (): Promise<WarningHazard[]> => {
        const HAZARD_TYPES_PREFIX = "items/hazard_types";
        const HAZARD_FILTER = "?fields=id,label,asset";
        const HAZARD_PATH = `${HAZARD_TYPES_PREFIX}${HAZARD_FILTER}`;

        return new Promise<any>((resolve, reject) => {
            return this.client
                .get(`${HAZARD_PATH}`)
                .then((response) => {
                    const { res, error } = this.handleResponse({ 
                        response, 
                        schema: HazardLevelsResponsesSchema,
                        reject,
                    });
                    if ( res && !error ) {
                        resolve(res);
                    }
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    fetchWarningLevels = (): Promise<WarningLevel[]> => {
        const WARNING_LEVELS_PREFIX = "items/warning_levels";
        const WARNING_LEVELS_FILTER = "?fields=id,label,color";
        const WARNING_LEVELS_PATH = `${WARNING_LEVELS_PREFIX}${WARNING_LEVELS_FILTER}`;

        return new Promise<any>((resolve, reject) => {
            return this.client
                .get(`${WARNING_LEVELS_PATH}`)
                .then((response) => {
                    const { res, error } = this.handleResponse({ 
                        response, 
                        schema: WarningLevelsResponsesSchema,
                        reject,
                    });
                    if ( res && !error ) {
                        resolve(res);
                    }
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    /**
    * @todo Zod has failed here, for some reason it doesn't identify label and color of level_id
    */
    
    fetchAllWeatherWarnings = (page:number): Promise<WarningsWithPages> => {
        const limitPerPage = 50;
        const WARNINGS_PREFIX = "items/weather_warnings";
        const WARNING_FILTER =
            `?fields=id,date_created,meteoalarm_warning_id,start_date,end_date,description_en,description_el,instruction_en,instruction_el,warning_location_id.label,warning_location_id.value,level_id.id,level_id.label,level_id.color,hazard_id.label,hazard_id.asset&sort=-date_created&limit=${limitPerPage}&page=${page}`;
        const WARNINGS_PATH = `${WARNINGS_PREFIX}${WARNING_FILTER}`;
        const COUNT_PATH = "items/weather_warnings?aggregate[countDistinct]=id";

        return new Promise<any>((resolve, reject) => {
            const warningsPromise = this.client.get(WARNINGS_PATH);
            const countPromise = this.client.get(COUNT_PATH);
            Promise.all([warningsPromise, countPromise])
                .then(([warningsResponse, countResponse]) => {
                    // const { res: resWarnings, error: errorWarnings } = this.handleResponse({ 
                    //     response: warningsResponse, 
                    //     schema: WarningLevelsResponsesSchema,
                    //     reject,
                    // });
                    // const { res: resPages, error: errorPages } = this.handleResponse({ 
                    //     response: countResponse, 
                    //     schema: WeatherWarningsCounterSchema,
                    //     reject,
                    // });

                    // if (errorWarnings || errorPages || !resWarnings || !resPages) {
                    //     reject(new DataServiceError("Failed to fetch warnings"));
                    //     return;
                    // }
                      
                    // const totalPages = Math.ceil(+resPages[0].countDistinct.id / limitPerPage);
                    // resolve({
                    //     warnings: resWarnings,
                    //     totalPages,
                    // });
                    const totalPages = Math.ceil(+countResponse.data.data[0].countDistinct.id / limitPerPage);
                    resolve({
                        warnings: warningsResponse.data.data,
                        totalPages,
                    });
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    fetchConfiguration = (): Promise<Configurations[]> => {
        const CONFIG_PREFIX = "items/configurations";
        const CONFIG_FILTER = "?fields=id,value,config&filter[_and][0][frontend][_eq]=true";
        const CONFIG_PATH = `${CONFIG_PREFIX}${CONFIG_FILTER}`;

        return new Promise<any>((resolve, reject) => {
            return this.client
                .get(`${CONFIG_PATH}`)
                .then((response) => {
                    const { res, error } = this.handleResponse({ 
                        response, 
                        schema: ConfigurationSchema,
                        reject,
                    });
                    if ( res && !error ) {
                        resolve(res);
                    }
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    fetchForecastByStation = (station_id: number): Promise<WeatherForecastResponse[]> => {
        const WEATHER_FORECAST_FILTER_PREFIX = "items/weather_forecasts";
        const WEATHER_FORECAST_FILTER = `?filter[_and][0][station_id][id][_eq]=${station_id}&sort=-date_created&limit=1`;
        const WEATHER_FORECAST_PATH = `${WEATHER_FORECAST_FILTER_PREFIX}${WEATHER_FORECAST_FILTER}`;

        return new Promise<WeatherForecastResponse[]>((resolve, reject) => {
            return this.client
                .get(`${WEATHER_FORECAST_PATH}`)
                .then((response) => {
                    const { res, error } = this.handleResponse({ 
                        response, 
                        schema: WeatherForecastDataResponsesSchema,
                        reject,
                    });
                    if ( res && !error ) {
                        resolve(res);
                    }
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    fetchAssetsFromFolder = (folderId: string): Promise<Assets[]> => {
        const ASSETS_PREFIX = "files";
        const ASSETS_FILTER = `?filter[_and][0][type][_nnull]=true&filter[_and][1][folder][_eq]=${folderId}&sort[]=-uploaded_on&fields=id,title,filename_download`;
        const FULL_ASSETS_PATH = `${ASSETS_PREFIX}${ASSETS_FILTER}`;

        return new Promise<Assets[]>((resolve, reject) => {
            return this.client
                .get(`${FULL_ASSETS_PATH}`)
                .then((response) => {
                    const { res, error } = this.handleResponse({ 
                        response, 
                        schema: AssetsSchema,
                        reject,
                    });
                    if ( res && !error ) {
                        resolve(res);
                    }
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    fetchAsset = (assetId: string): Promise<any> => {
        const ASSETS_PREFIX = "assets/";
        const FULL_ASSETS_PATH = `${ASSETS_PREFIX}${assetId}`;

        return new Promise<any>((resolve, reject) => {
            return this.client
                .get(`${FULL_ASSETS_PATH}`)
                .then((response) => {
                    resolve(response);
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

    private handleResponse = <T>({
        response,
        schema,
        reject,
    }: HandleResponseParams<T>): { res: T | null; error: boolean } => {
        try {
            const parsedResponse = schema.parse(response.data.data);
            return {
                res: parsedResponse,
                error: false,
            };
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error("Validation error! API message does not comply!", error.errors);
            } else {
                reject(this.generateDataServiceError(error));
            }
            return {
                res: null,
                error: true,
            };
        }  
    };
}
