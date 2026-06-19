"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import { useT } from "@/i18n/client";
import { Measurements } from "@/types/measurements";

const INITIAL_COUNT = 8;

export type StationCardData = {
    id: number;
    translatedName: string;
    prefectureKey: string;
    prefectureName: string;
    conditionIcon: string;
    conditionText: string;
    temperature: number;
    windBeaufort: number;
    rainMm: number;
    href: string;
};

type HomepageStationsSectionViewProps = {
    lng: string;
    cards: StationCardData[];
};

function StationCard({ card }: { card: StationCardData }) {
    const posthog = usePostHog();

    return (
        <Link
            href={card.href}
            onClick={() =>
                posthog?.capture("homepage_station_card_clicked", {
                    stationId: card.id,
                    stationName: card.translatedName,
                    prefecture: card.prefectureKey,
                    href: card.href,
                })
            }
            className="group bg-primary rounded-xl p-3 flex flex-col gap-2 shadow-sm hover:shadow-lg transition-shadow duration-200"
        >
            <div className="flex items-center gap-2">
                <div className="size-10 shrink-0">
                    <BaseWeatherIcon
                        assetId={card.conditionIcon}
                        weatherDescriptionText={card.conditionText}
                    />
                </div>
                <span className="text-secondary text-2xl font-bold leading-none">
                    {card.temperature}
                    {Measurements.CELCIUS}
                </span>
            </div>
            <p className="text-secondary text-sm font-semibold leading-tight truncate group-hover:underline">
                {card.translatedName}
            </p>
            <div className="border-t border-secondary/20 pt-2 flex items-center gap-3 mt-auto">
                <span className="text-secondary/80 text-xs">
                    <span className="font-semibold">{card.windBeaufort}</span> {Measurements.BFT}
                </span>
                <span className="text-secondary/30">·</span>
                <span className="text-secondary/80 text-xs">
                    <span className="font-semibold">{card.rainMm}</span> {Measurements.MILLIMETER}
                </span>
            </div>
        </Link>
    );
}

export default function HomepageStationsSectionView({
    lng,
    cards,
}: HomepageStationsSectionViewProps) {
    const { t } = useT("homepage");
    const [activeTab, setActiveTab] = useState<string>("");
    const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({});

    const tabs = useMemo(() => {
        const prefectureMap = new Map<string, { key: string; name: string; count: number }>();
        for (const card of cards) {
            if (!prefectureMap.has(card.prefectureKey)) {
                prefectureMap.set(card.prefectureKey, {
                    key: card.prefectureKey,
                    name: card.prefectureName,
                    count: 0,
                });
            }
            prefectureMap.get(card.prefectureKey)!.count++;
        }
        return Array.from(prefectureMap.values()).sort((tabA, tabB) => tabB.count - tabA.count);
    }, [cards]);

    const resolvedTab = activeTab || tabs[0]?.key || "";
    const isExpanded = expandedTabs[resolvedTab] ?? false;

    const tabCards = useMemo(
        () => cards.filter((card) => card.prefectureKey === resolvedTab),
        [cards, resolvedTab]
    );

    const visibleCards = isExpanded ? tabCards : tabCards.slice(0, INITIAL_COUNT);
    const hiddenCount = tabCards.length - INITIAL_COUNT;

    function toggleExpand() {
        setExpandedTabs((prev) => ({ ...prev, [resolvedTab]: !isExpanded }));
    }

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
                <p className="text-primary/70 text-sm">
                    {t("liveNetwork.activeStations", { count: cards.length })}
                </p>
            </div>

            <div className="flex gap-1 mb-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] pb-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                            resolvedTab === tab.key
                                ? "bg-primary text-secondary"
                                : "text-primary/60 hover:text-primary hover:bg-primary/10"
                        }`}
                    >
                        {tab.name}
                        <span
                            className={`ml-1.5 text-xs ${
                                resolvedTab === tab.key ? "text-secondary/60" : "text-primary/40"
                            }`}
                        >
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {visibleCards.map((card) => (
                    <StationCard key={card.id} card={card} />
                ))}
            </div>

            {hiddenCount > 0 && (
                <div className="mt-4 text-center">
                    <button
                        onClick={toggleExpand}
                        className="text-sm font-medium text-primary/60 hover:text-primary transition-colors duration-150"
                    >
                        {isExpanded
                            ? t("liveNetwork.showLess") + " ↑"
                            : t("liveNetwork.showAll", { count: tabCards.length }) + " ↓"}
                    </button>
                </div>
            )}
        </div>
    );
}
