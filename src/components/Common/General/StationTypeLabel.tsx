import { StationTypesEnum } from "@/types/enums/stationTypesEnum";
import { useT } from "@/i18n/client";

type StationTypeLabelProps = {
    stationTypeLabel: string;
};

export default function StationTypeLabel({ stationTypeLabel }: StationTypeLabelProps) {
    const { i18n } = useT("common");
    const lang = i18n.language;

    const label = StationTypesEnum[stationTypeLabel as keyof typeof StationTypesEnum] || stationTypeLabel;

    return (<>
        {i18n.getFixedT(lang, "common")(`StationTypes.${label}`)}
    </>);
}