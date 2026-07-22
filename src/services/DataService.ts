import {
    StationResponse,
    WeatherDataResponse,
    WeatherWarnings,
    WarningHazard,
    WarningLevel,
    WarningsWithPages,
    WeatherForecastResponse,
    FetchStationDataPaginated,
    Assets,
    FthiotidaForecast,
    ClimateWeatherData,
    FrostData,
    WeatherHistoricalData,
    EnvironmentalData,
} from "@/types";
import configuration from "@/app/appConfig";
import { z } from "zod";
import {
    StationResponsesSchema,
    // WeatherDataResponsesSchema,
    WarningsResponsesSchema,
    HazardLevelsResponsesSchema,
    WarningLevelsResponsesSchema,
    WeatherForecastDataResponsesSchema,
    AssetsSchema,
    HistoricalClimaDataResponse,
    FrostinDataResponsesSchema,
    HistoricalDataResponse,
    EnvironmentalDataSchema,
} from "@/schemas";

type HandleResponseParams<T> = {
    data: unknown;
    schema: z.ZodSchema<T>;
    endpoint: string;
};

export class DataServiceError extends Error {
    constructor(
        message: string,
        public status?: number
    ) {
        super(message);
        // Required because the ES5 target breaks the prototype chain when
        // extending built-ins, which would make `instanceof` always false.
        Object.setPrototypeOf(this, DataServiceError.prototype);
        this.name = "DataServiceError";
    }
}

export class DataService {
    private readonly baseUrl: string;

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
        ENVIRONMENTAL_DATA: "items/environmental_data",
        FILES: "files",
        ASSETS: "assets",
    };

    constructor() {
        this.baseUrl = (configuration.baseUrl ?? "").replace(/\/$/, "");
    }

    // Single transport chokepoint. Returns the parsed JSON body; for Directus
    // collection endpoints that body is the `{ data: [...] }` envelope, for the
    // raw asset endpoint it is the asset payload itself.
    //
    // `next` opts a call into the Next.js Data Cache (revalidate window + tags).
    // Omitted, the fetch is uncached — matching the previous Axios behaviour, so
    // only callers that pass cache options are cached.
    private request = async (endpoint: string, next?: NextFetchRequestConfig): Promise<any> => {
        let response: Response;
        try {
            response = await fetch(`${this.baseUrl}/${endpoint}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                next,
            });
        } catch (error) {
            throw this.generateDataServiceError(error);
        }
        if (!response.ok) {
            throw new DataServiceError(
                `Request failed for ${endpoint}: ${response.statusText}`,
                response.status
            );
        }
        return response.json();
    };

    private fetchWithValidation = async <T>(
        endpoint: string,
        schema?: z.ZodSchema<T>,
        next?: NextFetchRequestConfig
    ): Promise<T> => {
        const body = await this.request(endpoint, next);
        if (!schema) {
            return body.data as T;
        }
        const { res, error } = this.handleResponse({
            data: body.data,
            schema: schema as any,
            endpoint,
        });
        if (error) {
            throw error;
        }
        return res as T;
    };

    // ============================================
    // STATIONS DOMAIN
    // ============================================
    fetchWeatherStations = (next?: NextFetchRequestConfig): Promise<StationResponse[]> => {
        const filter = this.buildStationsFilter();
        return this.fetchWithValidation<StationResponse[]>(
            filter,
            StationResponsesSchema as any,
            next
        );
    };

    fetchWeatherStationsWithData = (): Promise<WeatherDataResponse[]> => {
        const filter = this.buildWeatherStationsWithDataFilter();
        return this.fetchWithValidation<WeatherDataResponse[]>(filter).then((data) => {
            let result: WeatherDataResponse[] = [];
            data.forEach((element: WeatherDataResponse) => {
                const currentRecordIndex = result.findIndex(
                    (res) => res.weather_station_id.id === element.weather_station_id.id
                );
                if (currentRecordIndex === -1) {
                    result.push(element);
                } else {
                    const difference =
                        result[currentRecordIndex].temperature - element.temperature;
                    result[currentRecordIndex].temp_difference = Math.round(difference * 10) / 10;
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
            "id,name,location,website_url&fields=accuweather_location.current_weather_description,accuweather_location.weather_condition_icon.asset,elevation,translations.languages_code,translations.name,weather_station_id.header_bg,weather_station_id.cluster";
        const filter = "filter[_and][0][_and][0][status][_eq]=published";
        return `${this.ENDPOINTS.WEATHER_STATIONS}?fields=${fields}&${filter}`;
    };

    private buildWeatherStationsWithDataFilter = (): string => {
        const dateFilters = {
            from: "$NOW(-1 hour)",
            to: "$NOW",
        };
        const fields =
            "date_created,temperature,barometer,humidity,percipitation,rainrate,windspd,winddir,weather_condition,weather_station_id.name,weather_station_id.id,weather_station_id.website_url,weather_station_id.prefecture_id.label,weather_station_id.prefecture_id.translations.languages_code,weather_station_id.prefecture_id.translations.name,weather_condition_icon,weather_station_id.translations.languages_code,weather_station_id.translations.name,weather_station_id.header_bg,weather_station_id.cluster";
        const filter = `filter[_and][0][_and][1][weather_station_id][status][_eq]=published&filter[_and][0][_and][0][date_created][_between][0]=${dateFilters.from}&filter[_and][0][_and][0][date_created][_between][1]=${dateFilters.to}&sort=-date_created`;
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
            "date_created,temperature,barometer,humidity,percipitation,rainrate,windspd,winddir,weather_condition,weather_station_id.name,weather_station_id.id,weather_station_id.website_url,weather_station_id.prefecture_id.label,weather_station_id.prefecture_id.translations.languages_code,weather_station_id.prefecture_id.translations.name,weather_condition_icon,weather_station_id.elevation,weather_station_id.translations.languages_code,weather_station_id.translations.name,weather_station_id.climatology_location_id,weather_station_id.station_type.label,weather_station_id.station_type.value,weather_station_id.municipality_id,weather_station_id.location,weather_station_id.header_bg,weather_station_id.cluster";
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
    // ENVIRONMENTAL DATA DOMAIN
    // ============================================
    fetchEnvironmentalDataByStation = (cluster_id: number): Promise<EnvironmentalData[]> => {
        const filter = this.buildEnvironmentalDataByStationFilter(cluster_id);
        return this.fetchWithValidation<EnvironmentalData[]>(
            filter,
            EnvironmentalDataSchema as any
        );
    };

    // Environmental data filter builders
    private buildEnvironmentalDataByStationFilter = (cluster_id: number): string => {
        const fields = "cluster,date_updated,current,hourly,units";
        const filter = `filter[_and][0][cluster][id][_eq]=${cluster_id}`;
        return `${this.ENDPOINTS.ENVIRONMENTAL_DATA}?${filter}&fields=${fields}`;
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
        clima_location_id: number,
        next?: NextFetchRequestConfig
    ): Promise<ClimateWeatherData[]> => {
        const filter = this.buildHistoricalClimateDataFilter(clima_location_id);
        return this.fetchWithValidation<ClimateWeatherData[]>(
            filter,
            HistoricalClimaDataResponse as any,
            next
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

    fetchAllWeatherWarnings = async (page: number): Promise<WarningsWithPages> => {
        const limitPerPage = 50;
        const [warningsBody, countBody] = await Promise.all([
            this.request(this.buildAllWarningsFilter(page, limitPerPage)),
            this.request(this.buildWarningsCountFilter()),
        ]);
        const totalPages = Math.ceil(+countBody.data[0].countDistinct.id / limitPerPage);
        return {
            warnings: warningsBody.data,
            totalPages,
        };
    };

    fetchWeatherHazards = (next?: NextFetchRequestConfig): Promise<WarningHazard[]> => {
        const filter = this.buildHazardsFilter();
        return this.fetchWithValidation<WarningHazard[]>(
            filter,
            HazardLevelsResponsesSchema as any,
            next
        );
    };

    fetchWarningLevels = (next?: NextFetchRequestConfig): Promise<WarningLevel[]> => {
        const filter = this.buildWarningLevelsFilter();
        return this.fetchWithValidation<WarningLevel[]>(
            filter,
            WarningLevelsResponsesSchema as any,
            next
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
    // ASSETS DOMAIN
    // ============================================
    fetchAssetsFromFolder = (folderId: string): Promise<Assets[]> => {
        const filter = this.buildAssetsFromFolderFilter(folderId);
        return this.fetchWithValidation<Assets[]>(filter, AssetsSchema as any);
    };

    // The asset endpoint returns the raw payload (not a `{ data }` envelope).
    // Consumers read `response.data`, so wrap the parsed body to keep that shape.
    fetchAsset = async (assetId: string): Promise<any> => {
        const body = await this.request(`${this.ENDPOINTS.ASSETS}/${assetId}`);
        return { data: body };
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
        if (error instanceof DataServiceError) {
            return error;
        }
        return new DataServiceError(error?.message ?? "Request failed");
    };

    private handleResponse = <T>({
        data,
        schema,
        endpoint,
    }: HandleResponseParams<T>): { res: T | null; error: DataServiceError | null } => {
        try {
            const parsedResponse = schema.parse(data);
            return {
                res: parsedResponse,
                error: null,
            };
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(
                    `Validation error! API message does not comply! Endpoint: ${endpoint}`,
                    error.issues
                );
                const issueSummary = error.issues
                    .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
                    .join("; ");
                return {
                    res: null,
                    error: new DataServiceError(
                        `Response validation failed for ${endpoint} — ${issueSummary}`
                    ),
                };
            }
            return {
                res: null,
                error: this.generateDataServiceError(error),
            };
        }
    };
}
