"use client";
import Link from "next/link";
import { useT } from "@/i18n/client";

const INITIAL_COUNT = 8;

type HomepageStationsSkeletonProps = {
    lng: string;
};

export default function HomepageStationsSkeleton({ lng }: HomepageStationsSkeletonProps) {
    const { t } = useT("homepage");

    return (
        <div className="bg-white rounded-lg w-full p-4">
            <div className="mb-4">
                <h2 className="text-primary font-bold text-lg mb-1 flex items-center">
                    {t("liveNetwork.heading")}
                    <Link
                        href={`/${lng}/stations`}
                        className="text-sm ml-auto font-medium text-primary/60 hover:text-primary transition-colors"
                    >
                        {t("warnings.viewAll")}
                    </Link>
                </h2>
                <p className="text-primary/70 text-sm">&nbsp;</p>
            </div>

            <div className="flex gap-2 mb-4">
                {[88, 76, 96, 68].map((width, skeletonIndex) => (
                    <div
                        key={skeletonIndex}
                        className="h-8 rounded-lg bg-secondary animate-pulse"
                        style={{ width }}
                    />
                ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {Array.from({ length: INITIAL_COUNT }).map((_item, skeletonIndex) => (
                    <div key={skeletonIndex} className="h-28 rounded-xl bg-secondary animate-pulse" />
                ))}
            </div>
        </div>
    );
}
