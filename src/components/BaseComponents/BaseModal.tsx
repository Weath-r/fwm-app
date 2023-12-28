"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { useStationsProvider } from "@/providers/StationsProvider";
import CommonButton from "@/components/Common/CommonButton";
import { XCircleIcon } from "@heroicons/react/24/solid";

type BaseModalProps = {
    isOpen: boolean;
    children: ReactNode;
};

export default function BaseModal({ children, isOpen }: Readonly<BaseModalProps>) {
    const stationsProvider = useStationsProvider();
    const closeModal = () => stationsProvider.handleModal(false);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog open={isOpen} onClose={closeModal} as="div" className="relative z-10">
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
                            <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-2xl bg-white p-2 text-left shadow-xl transition-all">
                                <Dialog.Description as="section">
                                    {children}
                                    <div className="absolute top-3 right-3">
                                        <CommonButton handleClick={closeModal} color="danger">
                                            <XCircleIcon className="h-8 w-8 p-1"></XCircleIcon>
                                        </CommonButton>
                                    </div>
                                </Dialog.Description>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
