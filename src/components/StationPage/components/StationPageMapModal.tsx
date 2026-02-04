import { Dialog, DialogContent, DialogTrigger } from "@/components/Common/CommonDialog";
import BaseMapLibre from "@/components/BaseComponents/BaseMapLibre";
import LibreMapMarker from "@/components/Common/LibreMap/LibreMapMarker";
import SvgInline from "@/components/Common/SvgInline";

type StationPageMapModalProps = {
    children: React.ReactNode;
    coordinates: [number, number];
    modalTitle: string;
};

export default function StationPageMapModal({
    children,
    coordinates,
    modalTitle,
}: Readonly<StationPageMapModalProps>) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent
                scrollable={true}
                dialogTitle={
                    <span className="flex items-center gap-2">
                        <span className="text-primary font-bold">{modalTitle}</span>
                    </span>
                }
            >
                <BaseMapLibre coordinates={coordinates} zoom={12} interactive={false}>
                    <LibreMapMarker lon={coordinates[0]} lat={coordinates[1]}>
                        <SvgInline path="/icons/marker_station.svg" className="size-10"></SvgInline>
                    </LibreMapMarker>
                </BaseMapLibre>
            </DialogContent>
        </Dialog>
    );
}
