import Select from "react-dropdown-select";
import { useStationsProvider } from "@/providers/StationsProvider";
import { useState, useEffect } from "react";
import CommonButton from "@/components/Common/CommonButton";
import { XCircleIcon } from "@heroicons/react/24/solid";
import L from "leaflet";

type SearchValue = {
    name: string;
    id: number;
};
type SearchFormProps = {
    handleSearchResult: (val: number) => void;
};

export default function MapSearchForm(props: SearchFormProps) {
    const { stations } = useStationsProvider();
    const [selectedValue, setSelectedValue] = useState<SearchValue[]>([]);
    const sortedStations = stations.toSorted((a, b) => a.name.localeCompare(b.name));
    
    const handleOnChange = (value: SearchValue[]) => {
        return setSelectedValue(value);
    };

    useEffect(() => {
        if (selectedValue.length > 0) {
            props.handleSearchResult(selectedValue[0].id);
        }
    }, [selectedValue]);

    useEffect(() => {
        const element = L.DomUtil.get("selectComponentMap");
        if (element !== null) {
            L.DomEvent.disableScrollPropagation(element);
        }
    }, []);

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
            itemRenderer={({ item, methods }) => {
                return (
                    <div 
                        className="m-2 pl-2 text-primary"
                        onClick={() => methods.addItem(item)}
                    >
                        {item.name}
                    </div>
                );
            }}
            clearRenderer={
                ({ state, methods }) => {
                    return state.values.length > 0 ? (
                        <CommonButton color="secondary" handleClick={methods.clearAll}>
                            <XCircleIcon className="size-7 p-1"></XCircleIcon>
                        </CommonButton>
                    ) : (<span></span>);
                }
            }
            dropdownGap={0}
            options={sortedStations}
            values={selectedValue}
            onChange={handleOnChange}
        />
    );
}