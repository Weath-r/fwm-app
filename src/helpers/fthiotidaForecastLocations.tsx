type LocationObjectAttributes = {
    [k: string]: LocationMetadata
};

export type LocationMetadata = {
    assetCode: string | null;
    label: string;
    type: "forecast" | "wind";
    style: { top?: string; bottom?: string; left?: string, right?: string; }
};

export const locationsObject: LocationObjectAttributes = {
    "lamia": {
        assetCode: "lamia",
        label: "Lamia",
        type: "forecast",
        style:  { top: "40%", right: "30%" },
    },
    "oiti": { 
        assetCode: "lamia",
        label: "Mt. Oiti",
        type: "forecast",
        style: { bottom: "-10%", left: "35%" },
    },
    "north": {
        assetCode: "north",
        label: "North Fthiotida",
        type: "forecast",
        style: { top: "50%", right: "40%" },
    },
    "east": {
        assetCode: "east",
        label: "East Fthiotida",
        type: "forecast",
        style: { bottom: "0%", right: "35%" },
    },
    "orthris": {
        assetCode: "east",
        label: "Mt. Orthris",
        type: "forecast",
        style: { top: "30%", left: "25%" },
    },
    "west": {
        assetCode: "west",
        label: "West Fthiotida",
        type: "forecast",
        style: { top: "40%", left: "20%" },
    },
    "amfikleia": {
        assetCode: "amfikleia",
        label: "Amfikleia",
        type: "forecast",
        style: { bottom: "0%", right: "30%" },
    },
    "lokrida": {
        assetCode: "lokrida",
        label: "Lokrida",
        type: "forecast",
        style: { bottom: "0%", left: "20%" },
    },
    "kamena": {
        assetCode: "kamena",
        label: "Kamena Vourla",
        type: "forecast",
        style: { top: "50%", right: "40%" },
    },
    "oreoi": {
        assetCode: null,
        label: "Oreoi",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
    "domokos": {
        assetCode: null,
        label: "N. Fthiotida",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
    "makrakomi": {
        assetCode: null,
        label: "E. Fthiotida",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
    "maliakos": {
        assetCode: null,
        label: "Maliakos gulf",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
    "parnasos": {
        assetCode: null,
        label: "Mt. Parnassos",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
    "evvoikos": {
        assetCode: null,
        label: "Evvoikos gulf",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
};