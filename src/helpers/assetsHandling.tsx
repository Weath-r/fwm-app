import configuration from "@/app/appConfig";

export const assetUrl = (asset: string) => {
    return `${configuration.baseUrl}assets/${asset}`;
};