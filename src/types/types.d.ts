type WeatherStationType = {
    date_created: Date;
    date_updated: Date;
    foreign_id: string;
    id: number;
    location: Object;
    name: string;
    prefecture_id: number;
    sort: number | null;
    station_type: number;
    status: string;
    user_udpated: string;
    website_url: string;
};

type WeatherDataType = {
    id: number;
    sort: number | null;
    date_created: Date;
    temperature: number,
    humidity: number,
    barometer: number,
    percipitation: number,
    rainrate: number,
    windspd: number,
    winddir: number,
    weather_condition_id: Object,
    weather_station_id: WeatherStationType
};