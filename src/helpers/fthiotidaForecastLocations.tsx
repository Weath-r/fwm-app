type LocationObjectAttributes = {
    [k: string]: LocationMetadata
};

export type LocationMetadata = {
    assetCode: string | null;
    value: string;
    type: "forecast" | "wind";
    style: { top?: string; bottom?: string; left?: string, right?: string; }
};

export const locationsObject: LocationObjectAttributes = {
    "lamia": {
        assetCode: "lamia",
        value: "lamia",
        type: "forecast",
        style:  { top: "40%", right: "30%" },
    },
    "oiti": { 
        assetCode: "lamia",
        value: "mt_oiti",
        type: "forecast",
        style: { bottom: "-10%", left: "35%" },
    },
    "north": {
        assetCode: "north",
        value: "north_fthiotida",
        type: "forecast",
        style: { top: "50%", right: "40%" },
    },
    "east": {
        assetCode: "east",
        value: "east_fthiotida",
        type: "forecast",
        style: { bottom: "0%", right: "35%" },
    },
    "orthris": {
        assetCode: "east",
        value: "mt_orthris",
        type: "forecast",
        style: { top: "30%", left: "25%" },
    },
    "west": {
        assetCode: "west",
        value: "west_fthiotida",
        type: "forecast",
        style: { top: "40%", left: "20%" },
    },
    "amfikleia": {
        assetCode: "amfikleia",
        value: "amfiklia",
        type: "forecast",
        style: { bottom: "0%", right: "30%" },
    },
    "lokrida": {
        assetCode: "lokrida",
        value: "lokrida",
        type: "forecast",
        style: { bottom: "0%", left: "20%" },
    },
    "kamena": {
        assetCode: "kamena",
        value: "kamena_vourla",
        type: "forecast",
        style: { top: "50%", right: "40%" },
    },
    "oreoi": {
        assetCode: null,
        value: "oreoi",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
    "domokos": {
        assetCode: null,
        value: "n_fthiotida",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
    "makrakomi": {
        assetCode: null,
        value: "w_fthiotida",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
    "maliakos": {
        assetCode: null,
        value: "maliakos_gulf",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
    "parnasos": {
        assetCode: null,
        value: "mt_Parnassos",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
    "evvoikos": {
        assetCode: null,
        value: "evvoikos_gulf",
        type: "wind",
        style: { top: "20%", left: "30%" },
    },
};