import { create } from "zustand";
type ModalView = "list" | "stationDetails";

type DialogStore = {
    dialog: boolean;
    setDialog: (status: boolean) => void;
    dialogMarkerType: string;
    setDialogMarkerType: (type: ModalView) => void;
    dialogLoading: boolean;
    setDialogLoading: (isLoading: boolean) => void;
    dialogContent: any;
    setDialogContent: (dialogContent: any) => void;
 };

export const useDialogStore = create<DialogStore>((set) => ({
    dialog: false,
    setDialog: (dialog: boolean) => set({ dialog }),
    dialogMarkerType: "stationDetails",
    setDialogMarkerType: (dialogMarkerType: string) => set({ dialogMarkerType }),
    dialogLoading: false,
    setDialogLoading: (dialogLoading: boolean) => set({ dialogLoading }),
    dialogContent: null,
    setDialogContent: (dialogContent: any) => set({ dialogContent }),
}));
