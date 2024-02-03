export type MarkerCustomAttrs = {
    weatherDescription: string;
    assetId: string;
};

declare module "leaflet" {
    interface MarkerOptions {
        customAttr?: MarkerCustomAttrs;
    }
};