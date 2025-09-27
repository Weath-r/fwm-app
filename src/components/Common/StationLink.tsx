import Link from "next/link";
import { urlStationName } from "@/helpers/createStationName";
import { StationParamsUrlProp } from "@/types";

type StationLinkProp = {
    pageName: string;
    stationId: number;
    stationName: string;
    className?: string;
    children?: React.ReactNode;
    lang: string;
    paramsQuery?: StationParamsUrlProp[];
};

export default function StationsLink(props: Readonly<StationLinkProp>) {
    const { 
        pageName = "station",
        stationId,
        stationName,
        children,
        className = "",
        lang,
        paramsQuery = [],
    } = props;
    const decodedStationName = urlStationName(stationName);
    let url = `/${lang}/${pageName}/${stationId}/${decodedStationName}`;

    if (paramsQuery.length > 0) {
        const allParams = paramsQuery
            .map(paramObj =>
                Object.entries(paramObj)
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join("&")
            )
            .join("&");
        url += `?${allParams}`;
    }

    return (
        <Link 
            className={className} 
            href={url}
        >
            {children}
        </Link>
    );
}