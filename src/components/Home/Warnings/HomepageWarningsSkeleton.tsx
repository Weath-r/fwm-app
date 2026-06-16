"use client";
import Link from "next/link";
import { useT } from "@/i18n/client";

type HomepageWarningsSkeletonProps = {
    lng: string;
};

export default function HomepageWarningsSkeleton({ lng }: HomepageWarningsSkeletonProps) {
    const { t } = useT("homepage");

    return (
        <div className="bg-white rounded-lg p-4 w-full">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-primary font-bold text-lg">{t("warnings.heading")}</h2>
                <Link
                    href={`/${lng}/warnings`}
                    className="text-sm text-primary/60 hover:text-primary transition-colors"
                >
                    {t("warnings.viewAll")}
                </Link>
            </div>
            <div className="flex flex-col gap-2">
                <div className="h-10 animate-pulse rounded-lg bg-secondary" />
                <div className="h-10 animate-pulse rounded-lg bg-secondary" />
            </div>
        </div>
    );
}
