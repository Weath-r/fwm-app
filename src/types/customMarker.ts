export type MarkerCustomAttrs = {
    iconImg: string
    isDay: boolean
};

declare module "leaflet" {
    interface MarkerOptions {
        customAttr?: MarkerCustomAttrs;
    }
};