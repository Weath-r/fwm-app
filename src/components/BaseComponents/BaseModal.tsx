"use client";
import CommonButton from "@/components/Common/CommonButton";
import { useAppStore } from "@/hooks/useAppStore";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, ReactNode } from "react";

type BaseModalProps = {
    children: ReactNode;
    handleCloseModal: () => void;
    handleFavouriteButton: (stationId: number) => void;
    isModalOpen: boolean;
    dialogClass?: string;
};

export default function BaseModal({
    children,
    handleCloseModal,
    handleFavouriteButton,
    isModalOpen,
    dialogClass,
}: Readonly<BaseModalProps>) {
    const { activeStation, isStationFavourite } = useAppStore();
    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
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
                            <Dialog.Panel
                                className={`min-h-[430px] w-full overflow-hidden rounded-2xl bg-white p-2 text-left shadow-xl transition-all ${dialogClass}`}
                            >
                                <Dialog.Description as="section">
                                    {children}
                                    <div className="absolute right-3 top-3 flex gap-2 items-center">
                                        <CommonButton
                                            handleClick={() => handleFavouriteButton(activeStation)}
                                            color={
                                                isStationFavourite(activeStation)
                                                    ? "primary"
                                                    : "secondary"
                                            }
                                        >
                                            <HeartIcon className="size-8 p-1" />
                                        </CommonButton>
                                        <CommonButton handleClick={handleCloseModal} color="danger">
                                            <XCircleIcon className="size-8 p-1" />
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
