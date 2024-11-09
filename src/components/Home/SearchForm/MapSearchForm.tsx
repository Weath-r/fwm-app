import { useAppStore } from "@/hooks/useAppStore";
import { useStationsProvider } from "@/providers/StationsProvider";
import { Station } from "@/types";
import Select from "react-dropdown-select";

type SearchFormProps = {
    showStationModal: (val: number) => void;
};

export default function MapSearchForm(props: Readonly<SearchFormProps>) {
    const { activeStation } = useAppStore();
    const { stations } = useStationsProvider();

    const sortedStations = stations.toSorted((a, b) => a.name.localeCompare(b.name));
    
    const getStationById = (id: number) => {
        return stations.filter( station =>  station.id == id)[0];
    }

    const handleOnChange = (selectedStations: Station[]) => {
        if (selectedStations.length > 0) {
            props.showStationModal(selectedStations[0].id);
        }
    };

    return (
        <Select
            name="Search stations"
            labelField="name"
            valueField="id"
            searchBy="name"
            sortBy="name"
            clearable
            placeholder="Search station"
            closeOnSelect={true}
            className="h-[40px] !rounded-lg !border-0 !bg-white/90 !p-2.5 !font-normal text-primary !shadow-sm focus:outline-none"
            clearRenderer={() => <></>}
            dropdownGap={0}
            options={sortedStations}
            values={activeStation != 0 ? [getStationById(activeStation)] : []}
            onChange={(values) => handleOnChange(values)}
        />
    );
}