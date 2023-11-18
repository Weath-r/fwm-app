"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ReactNode } from "react";
import { useStationsProvider } from "@/providers/StationsProvider";
import Btn from "@/components/Common/Btn";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function BaseModal({
    children,
    isOpen,
}:{ 
        isOpen: boolean,
        children: ReactNode,
    }) {
    const stationsProvider = useStationsProvider();
    const closeModal = () => stationsProvider.handleModal(false);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog 
                open={isOpen} 
                onClose={closeModal}
                as="div" 
                className="relative z-10"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-2 text-left shadow-xl transition-all">
                                <Dialog.Description as="section">
                                    {children}
                                </Dialog.Description>
                                <div className="absolute top-2 right-2">
                                    <Btn 
                                        handleClick={closeModal}
                                        color="danger"
                                    >
                                        <XCircleIcon className="h-8 w-8 p-1"></XCircleIcon>
                                    </Btn>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
