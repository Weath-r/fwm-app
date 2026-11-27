"use client";
import { useCallback, useEffect, useState } from "react";
import { useT } from "@/i18n/client";
import { useSky } from "@/hooks/useDaypart";
import { useMotionTier } from "@/hooks/useMotionTier";
import {
    placeholderAreas,
    type DioramaArea,
    type FthiotidaDayModel,
} from "@/helpers/fthiotida/sectionModel";
import { regionalRange } from "@/helpers/fthiotida/areaSummary";
import DayToggle, { type DayKind } from "./DayToggle";
import FthiotidaFooter from "./FthiotidaFooter";
import FthiotidaHeader from "./FthiotidaHeader";
import ReliefDiorama from "./diorama/ReliefDiorama";
import AreaCard from "./panel/AreaCard";
import AreaRail from "./panel/AreaRail";
import DormantPanel from "./panel/DormantPanel";
import AreaChips from "./mobile/AreaChips";
import AreaSheet from "./mobile/AreaSheet";
import styles from "./fthiotida.module.css";

export type FthiotidaDay = {
    dateLabel: string;
    model: FthiotidaDayModel;
};

type FthiotidaSectionViewProps = {
    lng: string;
    today: FthiotidaDay | null;
    tomorrow: FthiotidaDay | null;
};

const SHEET_TITLE_ID = "fthiotida-sheet-title";

export default function FthiotidaSectionView({ lng, today, tomorrow }: FthiotidaSectionViewProps) {
    const { t } = useT("fthiotida");
    const sky = useSky();
    const { daypart } = sky;
    const { ref, tier, paused } = useMotionTier<HTMLElement>();
    const [selectedDay, setSelectedDay] = useState<DayKind>(tomorrow ? "tomorrow" : "today");
    const [focusedKey, setFocusedKey] = useState<string | null>(null);
    const [spotlightKey, setSpotlightKey] = useState<string | null>(null);
    const [cameraMoving, setCameraMoving] = useState(false);

    const dayKind: DayKind =
        (selectedDay === "tomorrow" && tomorrow) || !today ? "tomorrow" : "today";
    const current = dayKind === "tomorrow" ? tomorrow : today;
    const dormant = current === null;
    const areas = current?.model.areas ?? [];
    const winds = current?.model.winds ?? [];
    const range = regionalRange(areas);
    const focusedArea = areas.find((area) => area.key === focusedKey) ?? null;

    const changeFocus = useCallback(
        (nextKey: string | null) => {
            if (nextKey === focusedKey) {
                return;
            }
            setFocusedKey(nextKey);
            setCameraMoving(true);
            if (nextKey) {
                setSpotlightKey(nextKey);
            }
        },
        [focusedKey]
    );

    const changeDay = (day: DayKind) => {
        setSelectedDay(day);
        changeFocus(null);
    };

    useEffect(() => {
        if (!focusedKey) {
            return;
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                changeFocus(null);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [focusedKey, changeFocus]);

    const areaName = useCallback((translationKey: string) => t(`areas.${translationKey}`), [t]);
    const areaLabel = useCallback(
        (area: DioramaArea) =>
            area.high === undefined || area.low === undefined
                ? areaName(area.translationKey)
                : t("areaLabel", {
                      name: areaName(area.translationKey),
                      high: area.high,
                      low: area.low,
                  }),
        [areaName, t]
    );

    const card = (titleId?: string, onBack?: () => void) =>
        focusedArea &&
        current && (
            <AreaCard
                area={focusedArea}
                areas={areas}
                winds={winds}
                range={range}
                dateLabel={current.dateLabel}
                titleId={titleId}
                onBack={onBack}
            />
        );

    return (
        <section
            ref={ref}
            id="fthiotida"
            aria-labelledby="fthiotida-title"
            className={styles.section}
            data-tier={tier}
            data-paused={paused}
            data-daypart={daypart}
            data-dormant={dormant}
        >
            <FthiotidaHeader
                eyebrow={
                    current
                        ? `${t(`eyebrow.${dayKind}`)} · ${current.dateLabel}`
                        : t("dormant.eyebrow")
                }
                title={current ? t(`title.${dayKind}`) : t("dormant.title")}
                subtitle={current ? t("subtitle") : t("dormant.subtitle")}
                creditPrefix={t("creditPrefix")}
                titleId="fthiotida-title"
                actions={
                    !dormant && (
                        <DayToggle
                            selected={dayKind}
                            available={{ today: today !== null, tomorrow: tomorrow !== null }}
                            onChange={changeDay}
                        />
                    )
                }
            />
            <div className={styles.body}>
                <ReliefDiorama
                    areas={areas}
                    winds={winds}
                    snowCaps={current?.model.snowCaps ?? []}
                    placeholders={dormant ? placeholderAreas() : undefined}
                    daypart={daypart}
                    sky={sky}
                    focusedKey={focusedKey}
                    spotlightKey={spotlightKey}
                    cameraMoving={cameraMoving}
                    onSelect={(key) => changeFocus(focusedKey === key ? null : key)}
                    onCameraSettled={() => setCameraMoving(false)}
                    areaName={areaName}
                    areaLabel={areaLabel}
                />
                {focusedArea && (
                    <aside className={`${styles.floatingCard} hidden lg:block`}>
                        {card(undefined, () => changeFocus(null))}
                    </aside>
                )}
                <aside
                    aria-label={t("rail.chips")}
                    className={`${styles.railStrip} hidden lg:block`}
                >
                    {dormant ? (
                        <DormantPanel lng={lng} />
                    ) : (
                        <AreaRail
                            areas={areas}
                            range={range}
                            onSelect={changeFocus}
                            areaLabel={areaLabel}
                        />
                    )}
                </aside>
            </div>
            <div className="lg:hidden">
                {dormant ? (
                    <div className={styles.mobilePanel}>
                        <DormantPanel lng={lng} />
                    </div>
                ) : (
                    <AreaChips
                        areas={areas}
                        focusedKey={focusedKey}
                        onSelect={(key) => changeFocus(focusedKey === key ? null : key)}
                        areaLabel={areaLabel}
                    />
                )}
                {focusedArea && (
                    <AreaSheet titleId={SHEET_TITLE_ID} onClose={() => changeFocus(null)}>
                        {card(SHEET_TITLE_ID)}
                    </AreaSheet>
                )}
            </div>
            <FthiotidaFooter lng={lng} sky={sky} showWindLegend={winds.length > 0} />
        </section>
    );
}
