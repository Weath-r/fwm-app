import Link from "next/link";
import { urlStationName } from "@/helpers/createStationName";

type StationLinkProp = {
    stationId: number;
    stationName: string;
    className?: string;
    children?: React.ReactNode;
    lang: string;
};

export default function StationsTableData(props: Readonly<StationLinkProp>) {
    const { stationId, stationName, children, className = "", lang } = props;
    const decodedStationName = urlStationName(stationName);
    return (
        <Link 
            className={className} 
            href={`/${lang}/station/${stationId}/${decodedStationName}`}
        >
            {children}
        </Link>
    );
}