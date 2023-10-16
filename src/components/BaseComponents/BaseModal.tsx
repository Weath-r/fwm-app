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
            <div className="bg-white w-[400px] h-[auto] rounded-lg relative">
                <a className="text-black cursor-pointer absolute top-[2px] right-[8px]" onClick={closeModal}> &times;</a>
                {children}
            </div>
        </Popup>
    )
}