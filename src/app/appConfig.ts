type NODE_MODE = "development" | "production" | "test";

type AppConfig = {
    baseUrl?: string;
    env: NODE_MODE;
    appVersion: string;
    searchBarToggle: boolean;
};

const configuration: AppConfig = {
    baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
    env: process.env.NODE_ENV,
    appVersion: process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.1",
    searchBarToggle: process.env.SEARCH_BAR_TOGGLE == "true" || false,
};

export default configuration;
