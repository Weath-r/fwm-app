'use client';
import { Tooltip } from "react-leaflet";
import BaseMap from '@/components/BaseComponents/BaseMap';
import BaseMarker from "@/components/BaseComponents/BaseMarker";
import BaseModal from '@/components/BaseComponents/BaseModal';

import { useContext } from "react";
import StationsContext from "@/context/stations";

export default function HomepageMap() {
    const providerData = useContext(StationsContext);
    const handleModal = (value:boolean) => providerData.handleModal(value);
    const isModalOpen = providerData.isStationModalOpen;

    const markers = providerData.stations.map(station => {
        return (
        <BaseMarker
            position={station.location.coordinates.reverse()}
            key={station.id}
            handleClick={handleModal}
        >
            <Tooltip direction="bottom" offset={[0, 2]} opacity={1} permanent>
                <div className="bg-white p-1 opacity-75 rounded-full border-solid border truncate overflow-hidden max-w-[80px] font-medium">
                    {station.name}
                </div>
            </Tooltip>
        </BaseMarker>)
    })
    return (
        <BaseMap>
            {markers}
            <div className='absolute top-0'>
                    <BaseModal
                        isOpen={isModalOpen}
                    >
                        Testing modal
                    </BaseModal>
                </div>
        </BaseMap>
    );
}