export type WeatherStation = {
    date_created: Date;
    date_updated: Date;
    foreign_id: string;
    id: number;
    location: object;
    name: string;
    prefecture_id: number;
    sort: number | null;
    station_type: number;
    status: string;
    user_udpated: string;
    website_url: string;
};
