import Link from "next/link";
import { urlStationName } from "@/helpers/createStationName";

type StationLinkProp = {
    pageName: string;
    stationId: number;
    stationName: string;
    className?: string;
    children?: React.ReactNode;
    lang: string;
    paramsQuery?: Record<string, string>[];
    onBeforeNavigate?: () => void;
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
        onBeforeNavigate,
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
            onClick={() => onBeforeNavigate?.()}
        >
            {children}
        </Link>
    );
}