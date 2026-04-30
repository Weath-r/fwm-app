import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../CommonPopover";
import CommonButton from "../CommonButton";
import SvgInline from "../SvgInline";
import { useT } from "@/i18n/client";

type SharePopupProps = {
    shareData: ShareData;
    onClose: () => void;
    onError?: (error?: unknown) => void;
};
type ShareState = "pending" | "success" | "error";

export default function SharePopup({ shareData, onClose, onError }: SharePopupProps) {
    const [state, setState] = useState<ShareState>("pending");
    const { i18n } = useT("common");
    const selectedLanguage = i18n.language;

    const copyClicked = async () => {
        try {
            await navigator.clipboard.writeText(shareData?.url || "");
            setState("success");
        } catch (err) {
            onError?.(err);
            setState("error");
        }
    };

    const getIconClass = (state: ShareState) => {
        switch (state) {
            case "success":
                return "fill-success";
            case "pending":
            default:
                return "fill-primary";
        }
    };

    return (
        <Popover open={true} onOpenChange={(open) => !open && onClose()}>
            <PopoverTrigger></PopoverTrigger>
            <PopoverContent className="PopoverContent bg-white p-2 border-primary border shadow-2xl rounded mr-4">
                <div className="flex flex-col p-4 pt-0 gap-4">
                    <h3 className="font-bold text-lg text-primary mt-2">
                        {i18n.getFixedT(selectedLanguage, "common", "SharePopup")("popupTitle")}
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="border border-primary p-1 rounded w-64">
                            <p className="text-primary line-clamp-1">{shareData.url}</p>
                        </div>
                        <CommonButton
                            className="flex gap-2 items-center text-primary text-sm"
                            handleClick={() => copyClicked()}
                        >
                            <SvgInline
                                path="/icons/copy.svg"
                                title={i18n.getFixedT(
                                    selectedLanguage,
                                    "common",
                                    "SharePopup"
                                )("iconAlt")}
                                className={getIconClass(state)}
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                            />
                        </CommonButton>
                    </div>

                    <div className="flex gap-2 items-center mt-4">
                        <div className="pr-2 border-r-2 border-primary">
                            <p className="text-primary text-sm">
                                {i18n.getFixedT(
                                    selectedLanguage,
                                    "common",
                                    "SharePopup"
                                )("shareOnSocial")}
                            </p>
                        </div>
                        <div className="text-primary">
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <SvgInline
                                    path="/icons/facebook.svg"
                                    title="Share on Facebook"
                                    className="fill-primary"
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            </a>
                        </div>
                        <div className="text-primary">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${shareData.text}&url=${shareData.url}&hashtags=weather,greece,myweathr`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <SvgInline
                                    path="/icons/twitter.svg"
                                    title="Share on Twitter"
                                    className="fill-primary"
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            </a>
                        </div>
                        <div className="text-primary">
                            <a
                                href={`https://bsky.app/intent/compose?text=${shareData.text}%0A${shareData.url}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <SvgInline
                                    path="/icons/bluesky.svg"
                                    title="Share on BlueSky"
                                    className="fill-primary"
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            </a>
                        </div>
                        <div className="text-primary">
                            <a
                                href={`http://www.reddit.com/submit?url=${shareData.url}&title=${shareData.title}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <SvgInline
                                    path="/icons/reddit.svg"
                                    title="Share on Reddit"
                                    className="fill-primary"
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
