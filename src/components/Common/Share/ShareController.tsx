type ShareProps = {
    children: React.ReactNode;
    shareData: ShareData;
    onSuccess?: () => void;
    onError?: (error?: unknown) => void;
    onInteraction?: () => void;
    disabled?: boolean;
    onNonNativeShare?: () => void;
};

export default function ShareController({
    children,
    shareData,
    onInteraction,
    onSuccess,
    onError,
    disabled,
    onNonNativeShare,
}: ShareProps) {
    const handleOnClick = async () => {
        onInteraction?.();
        if (navigator?.share) {
            try {
                await navigator.share(shareData);
                onSuccess?.();
            } catch (err) {
                onError?.(err);
            }
        } else {
            onNonNativeShare?.();
        }
    };

    return (
        <button onClick={handleOnClick} type="button" disabled={disabled}>
            {children}
        </button>
    );
}
