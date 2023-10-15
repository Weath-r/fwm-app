'use client';
import Popup from 'reactjs-popup';
import { ReactNode, useContext } from "react";
import StationsContext from "@/context/stations";

export default function BaseModal({
    children,
    isOpen,
    }:{ 
        isOpen: boolean,
        children: ReactNode, 
    }) {
        const providerData = useContext(StationsContext);
        const closeModal = () => providerData?.handleModal(false);

    return (
        <Popup
            open={isOpen}
        >
            <div className="bg-white w-[400px] h-[200px]">
                <a className="text-black cursor-pointer" onClick={closeModal}> &times;</a>
                {children}
            </div>
        </Popup>
    )
}