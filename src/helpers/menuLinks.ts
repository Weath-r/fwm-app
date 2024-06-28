type LinkConfig = {
    pathName: string;
    text: string;
};

const menu: LinkConfig[] = [
    {
        pathName: "/",
        text: "Weather Map",
    },{
        pathName: "/stations",
        text: "Stations",
    },{
        pathName: "/warnings",
        text: "Warnings",
    }
];

export default menu;