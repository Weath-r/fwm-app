import { useAppStore } from "@/hooks/useAppStore";
import { useStationsProvider } from "@/providers/StationsProvider";
import { Station } from "@/types";
import Select from "react-dropdown-select";
import { useT } from "@/i18n/client";

type SearchFormProps = {
    showStationModal: (val: number) => void;
};

export default function MapSearchForm(props: Readonly<SearchFormProps>) {
    const { activeStation } = useAppStore();
    const { stations } = useStationsProvider();

    const sortedStations = stations.toSorted((a, b) => a.name.localeCompare(b.name));

    const getStationById = (id: number) => {
        if (stations.length === 0) return [];
        const station = stations.find((station) => station.id === id);
        return station ? [station] : [];
    };

    const handleOnChange = (selectedStations: Station[]) => {
        if (selectedStations.length > 0) {
            props.showStationModal(selectedStations[0].id);
        }
    };

    const { i18n } = useT("common");
    const selectedLanguage = i18n.language;

    return (
        <Select
            name="Search stations"
            labelField="name"
            valueField="id"
            searchBy="name"
            sortBy="name"
            clearable
            placeholder={i18n.getFixedT(selectedLanguage, "common")("searchStation")}
            closeOnSelect={true}
            className="h-[40px] !rounded-lg !border-0 !bg-white/90 !p-2.5 !font-normal text-primary !shadow-sm focus:outline-none"
            clearRenderer={() => <></>}
            dropdownGap={0}
            options={sortedStations}
            values={activeStation !== 0 ? getStationById(activeStation) : []}
            onChange={(values) => handleOnChange(values)}
        />
    );
}
