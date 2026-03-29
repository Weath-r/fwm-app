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
    Assets,
    FthiotidaForecast,
    ClimateWeatherData,
    FrostData,
    WeatherHistoricalData,
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
    AssetsSchema,
    HistoricalClimaDataResponse,
    FrostinDataResponsesSchema,
    HistoricalDataResponse,
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

    private readonly ENDPOINTS = {
        WEATHER_STATIONS: "items/weather_stations",
        WEATHER_DATA: "items/weather_data",
        WEATHER_DATA_HISTORICAL: "items/weather_data_aggregated_monthly",
        HISTORICAL_CLIMATOLOGICAL: "items/historical_climatological_data",
        WEATHER_WARNINGS: "items/weather_warnings",
        HAZARD_TYPES: "items/hazard_types",
        WARNING_LEVELS: "items/warning_levels",
        WEATHER_FORECASTS: "items/weather_forecasts",
        FTHIOTIDA_FORECASTS: "items/fthiotida_forecasts",
        FROST_DATA: "items/frost_data",
        CONFIGURATIONS: "items/configurations",
        FILES: "files",
        ASSETS: "assets",
    };

    constructor() {
        this.client = createAxiosInstance();
    }

    private fetchWithValidation = <T>(endpoint: string, schema?: z.ZodSchema<T>): Promise<T> => {
        return new Promise<T>((resolve, reject) => {
            this.client
                .get(endpoint)
                .then((response) => {
                    if (schema) {
                        const { res, error } = this.handleResponse({
                            response,
                            schema: schema as any,
                            reject,
                        });
                        if (res && !error) {
                            resolve(res as T);
                        }
                    } else {
                        resolve(response.data.data as T);
                    }
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    // ============================================
    // STATIONS DOMAIN
    // ============================================
    fetchWeatherStations = (): Promise<StationResponse[]> => {
        const filter = this.buildStationsFilter();
        return this.fetchWithValidation<StationResponse[]>(filter, StationResponsesSchema as any);
    };

    fetchWeatherStationsWithData = (): Promise<WeatherDataResponse[]> => {
        const filter = this.buildWeatherStationsWithDataFilter();
        return this.fetchWithValidation<WeatherDataResponse[]>(filter).then((data) => {
            let result: WeatherDataResponse[] = [];
            data.forEach((element: WeatherDataResponse) => {
                const previousMeasurement = result.findIndex(
                    (res) => res.weather_station_id.id === element.weather_station_id.id
                );
                if (previousMeasurement !== -1) {
                    const difference =
                        element.temperature - result[previousMeasurement].temperature;
                    result[previousMeasurement].temp_difference = Math.round(difference * 10) / 10;
                    result[previousMeasurement].date_created = element.date_created;
                } else {
                    result.push(element);
                }
            });
            result = result.sort((a, b) => {
                return a.weather_station_id.name.localeCompare(b.weather_station_id.name);
            });
            return result;
        });
    };

    // Stations filter builders
    private buildStationsFilter = (): string => {
        const fields =
            "id,name,location,website_url&fields=accuweather_location.current_weather_description,accuweather_location.weather_condition_icon.asset,elevation,translations.languages_code,translations.name";
        const filter = "filter[_and][0][_and][0][status][_eq]=published";
        return `${this.ENDPOINTS.WEATHER_STATIONS}?fields=${fields}&${filter}`;
    };

    private buildWeatherStationsWithDataFilter = (): string => {
        const dateFilters = {
            from: "$NOW(-1 hour)",
            to: "$NOW",
        };
        const fields =
            "date_created,temperature,barometer,humidity,percipitation,rainrate,windspd,winddir,weather_condition,weather_station_id.name,weather_station_id.id,weather_station_id.website_url,weather_station_id.prefecture_id.label,weather_station_id.prefecture_id.translations.languages_code,weather_station_id.prefecture_id.translations.name,weather_condition_icon,weather_station_id.translations.languages_code,weather_station_id.translations.name";
        const filter = `filter[_and][0][_and][1][weather_station_id][status][_eq]=published&filter[_and][0][_and][0][date_created][_between][0]=${dateFilters.from}&filter[_and][0][_and][0][date_created][_between][1]=${dateFilters.to}&sort=date_created`;
        return `${this.ENDPOINTS.WEATHER_DATA}?${filter}&fields=${fields}`;
    };

    // ============================================
    // WEATHER DATA DOMAIN
    // ============================================
    fetchWeatherDataByStation = (station_id: number): Promise<WeatherDataResponse[]> => {
        const filter = this.buildWeatherDataByStationFilter(station_id);
        return this.fetchWithValidation(filter);
    };

    fetchWeatherDataByStationPaginated = ({
        station_id,
        start_date,
        end_date,
        page = 1,
        limit = 64,
    }: FetchStationDataPaginated): Promise<WeatherDataResponse[]> => {
        const filter = this.buildWeatherDataPaginatedFilter({
            station_id,
            start_date,
            end_date,
            page,
            limit,
        });
        return this.fetchWithValidation(filter);
    };

    // Weather data filter builders
    private buildWeatherDataByStationFilter = (station_id: number): string => {
        const fields =
            "date_created,temperature,barometer,humidity,percipitation,rainrate,windspd,winddir,weather_condition,weather_station_id.name,weather_station_id.id,weather_station_id.website_url,weather_station_id.prefecture_id.label,weather_station_id.prefecture_id.translations.languages_code,weather_station_id.prefecture_id.translations.name,weather_condition_icon,weather_station_id.elevation,weather_station_id.translations.languages_code,weather_station_id.translations.name,weather_station_id.climatology_location_id,weather_station_id.station_type.label,weather_station_id.station_type.value,weather_station_id.municipality_id,weather_station_id.location,weather_station_id.header_bg";
        const filter = `filter[_and][0][weather_station_id][id][_eq]=${station_id}&sort=-date_created&limit=1`;
        return `${this.ENDPOINTS.WEATHER_DATA}?${filter}&fields=${fields}`;
    };

    private buildWeatherDataPaginatedFilter = ({
        station_id,
        start_date,
        end_date,
        page,
        limit,
    }: FetchStationDataPaginated): string => {
        const fields =
            "date_created,temperature,barometer,humidity,percipitation,rainrate,windspd,winddir,weather_condition,weather_station_id.name,weather_station_id.id,weather_station_id.website_url,weather_station_id.prefecture_id.label,weather_station_id.prefecture_id.translations.languages_code,weather_station_id.prefecture_id.translations.name,weather_condition_icon,weather_station_id.elevation,weather_station_id.translations.languages_code,weather_station_id.translations.name";
        const filter = `filter[_and][0][weather_station_id][id][_eq]=${station_id}&sort=-date_created&fields=${fields}&filter[_and][0][_and][1][date_created][_lte]=${end_date}&filter[_and][0][_and][2][date_created][_gte]=${start_date}&page=${page}&limit=${limit}`;
        return `${this.ENDPOINTS.WEATHER_DATA}?${filter}`;
    };

    // ============================================
    // HISTORICAL DATA DOMAIN
    // ============================================
    fetchStationHistoricalData = (weatherStationId: number): Promise<WeatherHistoricalData[]> => {
        const filter = this.buildHistoricalDataFilter(weatherStationId);
        return this.fetchWithValidation<WeatherHistoricalData[]>(
            filter,
            HistoricalDataResponse as any
        );
    };

    fetchStationHistoricalClimateData = (
        clima_location_id: number
    ): Promise<ClimateWeatherData[]> => {
        const filter = this.buildHistoricalClimateDataFilter(clima_location_id);
        return this.fetchWithValidation<ClimateWeatherData[]>(
            filter,
            HistoricalClimaDataResponse as any
        );
    };

    fetchFrostDataByMunicipality = (municipality: number): Promise<FrostData[]> => {
        const filter = this.buildFrostDataFilter(municipality);
        return this.fetchWithValidation<FrostData[]>(filter, FrostinDataResponsesSchema as any);
    };

    // Historical data filter builders
    private buildHistoricalDataFilter = (weatherStationId: number): string => {
        const fields =
            "weather_station_id,year,month,avg_temperature,avg_humidity,avg_barometer,total_percipitation,avg_windspd,avg_winddir";
        const filter = `filter[_and][0][_and][0][weather_station_id][_eq]=${weatherStationId}&sort=-year,-month`;
        return `${this.ENDPOINTS.WEATHER_DATA_HISTORICAL}?${filter}&fields=${fields}`;
    };

    private buildHistoricalClimateDataFilter = (clima_location_id: number): string => {
        const fields =
            "month_id.value,month_id.translations.languages_code,month_id.translations.name,max_temperature,min_temperature,mean_temperature,precipitation";
        const filter = `filter[_and][0][_and][0][climatology_location_id][_eq]=${clima_location_id}`;
        return `${this.ENDPOINTS.HISTORICAL_CLIMATOLOGICAL}?${filter}&fields=${fields}`;
    };

    private buildFrostDataFilter = (municipality: number): string => {
        const fields = "frost_level,frost_date,frost_location_id";
        const filter = `filter[_and][0][frost_location_id][municipality_id][_eq]=${municipality}&sort=-date_created&limit=1`;
        return `${this.ENDPOINTS.FROST_DATA}?${filter}&fields=${fields}`;
    };

    // ============================================
    // WARNINGS DOMAIN
    // ============================================
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchWeatherWarningsByCreatedDate = (date: string): Promise<WeatherWarnings[]> => {
        const filter = this.buildActiveWarningsFilter();
        return this.fetchWithValidation<WeatherWarnings[]>(filter, WarningsResponsesSchema as any);
    };

    fetchAllWeatherWarnings = (page: number): Promise<WarningsWithPages> => {
        const limitPerPage = 50;
        const warningsFilter = this.buildAllWarningsFilter(page, limitPerPage);
        const countFilter = this.buildWarningsCountFilter();

        return new Promise<WarningsWithPages>((resolve, reject) => {
            const warningsPromise = this.client.get(warningsFilter);
            const countPromise = this.client.get(countFilter);
            Promise.all([warningsPromise, countPromise])
                .then(([warningsResponse, countResponse]) => {
                    const totalPages = Math.ceil(
                        +countResponse.data.data[0].countDistinct.id / limitPerPage
                    );
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

    fetchWeatherHazards = (): Promise<WarningHazard[]> => {
        const filter = this.buildHazardsFilter();
        return this.fetchWithValidation<WarningHazard[]>(
            filter,
            HazardLevelsResponsesSchema as any
        );
    };

    fetchWarningLevels = (): Promise<WarningLevel[]> => {
        const filter = this.buildWarningLevelsFilter();
        return this.fetchWithValidation<WarningLevel[]>(
            filter,
            WarningLevelsResponsesSchema as any
        );
    };

    // Warnings filter builders
    private buildActiveWarningsFilter = (): string => {
        const fields =
            "id,date_created,meteoalarm_warning_id,start_date,end_date,description_en,description_el,instruction_en,instruction_el,warning_location_id.label,warning_location_id.value,warning_location_id.geojson,warning_location_id.order,warning_location_id.translations.languages_code,warning_location_id.translations.name,level_id.id,level_id.label,level_id.color,level_id.translations.languages_code,level_id.translations.name,hazard_id.label,hazard_id.asset,hazard_id.translations.languages_code,hazard_id.translations.name";
        const filter = "filter[_and][0][_and][1][end_date][_gt]=$NOW";
        return `${this.ENDPOINTS.WEATHER_WARNINGS}?${filter}&fields=${fields}`;
    };

    private buildAllWarningsFilter = (page: number, limit: number): string => {
        const fields =
            "id,date_created,meteoalarm_warning_id,start_date,end_date,description_en,description_el,instruction_en,instruction_el,warning_location_id.label,warning_location_id.value,level_id.id,level_id.label,level_id.color,level_id.translations.languages_code,level_id.translations.name,hazard_id.label,hazard_id.asset,hazard_id.translations.languages_code,hazard_id.translations.name,warning_location_id.translations.languages_code,warning_location_id.translations.name";
        const sort = "-date_created";
        return `${this.ENDPOINTS.WEATHER_WARNINGS}?fields=${fields}&sort=${sort}&limit=${limit}&page=${page}`;
    };

    private buildWarningsCountFilter = (): string => {
        return `${this.ENDPOINTS.WEATHER_WARNINGS}?aggregate[countDistinct]=id`;
    };

    private buildHazardsFilter = (): string => {
        const fields = "id,label,asset,translations.languages_code,translations.name";
        return `${this.ENDPOINTS.HAZARD_TYPES}?fields=${fields}`;
    };

    private buildWarningLevelsFilter = (): string => {
        const fields = "id,label,color,translations.languages_code,translations.name";
        return `${this.ENDPOINTS.WARNING_LEVELS}?fields=${fields}`;
    };

    // ============================================
    // FORECASTS DOMAIN
    // ============================================
    fetchForecastByStation = (station_id: number): Promise<WeatherForecastResponse[]> => {
        const filter = this.buildForecastByStationFilter(station_id);
        return this.fetchWithValidation<WeatherForecastResponse[]>(
            filter,
            WeatherForecastDataResponsesSchema as any
        );
    };

    fetchFthiotidaForecasts = (): Promise<FthiotidaForecast[]> => {
        const filter = this.buildFthiotidaForecastsFilter();
        return this.fetchWithValidation(filter);
    };

    // Forecasts filter builders
    private buildForecastByStationFilter = (station_id: number): string => {
        const filter = `filter[_and][0][station_id][id][_eq]=${station_id}&sort=-date_created&limit=1`;
        return `${this.ENDPOINTS.WEATHER_FORECASTS}?${filter}`;
    };

    private buildFthiotidaForecastsFilter = (): string => {
        return `${this.ENDPOINTS.FTHIOTIDA_FORECASTS}?fields=forecast&sort=-id&limit=10`;
    };

    // ============================================
    // CONFIGURATION DOMAIN
    // ============================================
    fetchConfiguration = (): Promise<Configurations[]> => {
        const filter = this.buildConfigurationFilter();
        return this.fetchWithValidation<Configurations[]>(filter, ConfigurationSchema as any);
    };

    private buildConfigurationFilter = (): string => {
        const fields = "id,value,config";
        const filter = "filter[_and][0][frontend][_eq]=true";
        return `${this.ENDPOINTS.CONFIGURATIONS}?${filter}&fields=${fields}`;
    };

    // ============================================
    // ASSETS DOMAIN
    // ============================================
    fetchAssetsFromFolder = (folderId: string): Promise<Assets[]> => {
        const filter = this.buildAssetsFromFolderFilter(folderId);
        return this.fetchWithValidation<Assets[]>(filter, AssetsSchema as any);
    };

    fetchAsset = (assetId: string): Promise<any> => {
        const filter = `${this.ENDPOINTS.ASSETS}/${assetId}`;
        return new Promise<any>((resolve, reject) => {
            this.client
                .get(filter)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(this.generateDataServiceError(error));
                });
        });
    };

    // Assets filter builders
    private buildAssetsFromFolderFilter = (folderId: string): string => {
        const fields = "id,title,filename_download";
        const filter = `filter[_and][0][type][_nnull]=true&filter[_and][1][folder][_eq]=${folderId}&sort[]=-uploaded_on`;
        return `${this.ENDPOINTS.FILES}?${filter}&fields=${fields}`;
    };

    // ============================================
    // PRIVATE UTILITY METHODS
    // ============================================
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
                console.error("Validation error! API message does not comply!", error.issues);
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
