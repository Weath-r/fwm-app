import Link from "next/link";
import { urlStationName } from "@/helpers/createStationName";

type StationLinkProp = {
    stationId: number;
    stationName: string;
    className?: string;
    children?: React.ReactNode;
};

export default function StationsTableData(props: Readonly<StationLinkProp>) {
    const { stationId, stationName, children, className = "" } = props;
    const decodedStationName = urlStationName(stationName);
    return (
        <Link 
            className={className} 
            href={`/station/${stationId}/${decodedStationName}`}
        >
            {children}
        </Link>
    );
}