"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactElement, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import CommonButton from "../Common/CommonButton";

type BaseModalProps = {
    children: ReactElement;
    trigger: ReactElement;
    triggerClass?: string;
};

export default function BaseControlledModal(props: Readonly<BaseModalProps>) {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <>
            <CommonButton 
                rounded
                color="primary"
                handleClick={openModal}
            >
                {props.trigger}
            </CommonButton>

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
                                <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-2xl bg-white p-2 text-left shadow-xl transition-all min-h-[430px]">
                                    <Dialog.Description as="section">
                                        {props.children}
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
        </>
    );
}
