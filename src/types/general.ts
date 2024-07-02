export type Configurations = {
    id: number;
    value: string;
    config: JSON;
};

export type FeatureFlags = {
    [k:string]: any;
};

export type MenuLink = {
    pathName: string;
    text: string;
    value: string;
};