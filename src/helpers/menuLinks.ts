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
    }
];

export default menu;