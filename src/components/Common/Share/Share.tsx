import { useState } from "react";
import ShareController from "./ShareController";
import SharePopup from "./SharePopup";

type ShareProps = {
    children: React.ReactNode;
    shareData: ShareData;
    onSuccess?: () => void;
    onError?: (error?: unknown) => void;
    onInteraction?: () => void;
    disabled?: boolean;
};
export default function Share({
    children,
    shareData,
    onInteraction,
    onSuccess,
    onError,
    disabled,
}: ShareProps) {
    const [openPopup, setOpenPopup] = useState(false);
    const handleNonNativeShare = () => {
        setOpenPopup(true);
    };

    return (
        <>
            <ShareController
                shareData={shareData}
                onInteraction={onInteraction}
                onSuccess={onSuccess}
                onError={onError}
                onNonNativeShare={handleNonNativeShare}
                disabled={disabled}
            >
                {children}
            </ShareController>
            {openPopup ? (
                <SharePopup shareData={shareData} onClose={() => setOpenPopup(false)} />
            ) : null}
        </>
    );
}
