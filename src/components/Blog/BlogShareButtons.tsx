"use client";

import { useState } from "react";
import { CheckIcon, LinkIcon } from "@heroicons/react/24/outline";
import SvgInline from "@/components/Common/SvgInline";

type BlogShareButtonsProps = {
    url: string;
    title: string;
};

const ICON_BUTTON_CLASS =
    "flex size-9 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-colors hover:bg-secondary";

export default function BlogShareButtons({ url, title }: BlogShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy blog post link:", error);
        }
    };

    const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
    )}&url=${encodeURIComponent(url)}`;
    const blueskyHref = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title}\n${url}`)}`;

    return (
        <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-primary/50">Μοιραστείτε:</span>
            <a href={facebookHref} target="_blank" rel="noreferrer" className={ICON_BUTTON_CLASS}>
                <SvgInline
                    path="/icons/facebook.svg"
                    title="Κοινοποίηση στο Facebook"
                    className="fill-primary"
                    style={{ width: 16, height: 16 }}
                />
            </a>
            <a href={twitterHref} target="_blank" rel="noreferrer" className={ICON_BUTTON_CLASS}>
                <SvgInline
                    path="/icons/twitter.svg"
                    title="Κοινοποίηση στο X"
                    className="fill-primary"
                    style={{ width: 16, height: 16 }}
                />
            </a>
            <a href={blueskyHref} target="_blank" rel="noreferrer" className={ICON_BUTTON_CLASS}>
                <SvgInline
                    path="/icons/bluesky.svg"
                    title="Κοινοποίηση στο Bluesky"
                    className="fill-primary"
                    style={{ width: 16, height: 16 }}
                />
            </a>
            <button type="button" onClick={handleCopyLink} className={ICON_BUTTON_CLASS}>
                {copied ? (
                    <CheckIcon className="size-4 text-accent" title="Ο σύνδεσμος αντιγράφηκε" />
                ) : (
                    <LinkIcon className="size-4" title="Αντιγραφή συνδέσμου" />
                )}
            </button>
        </div>
    );
}
