import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import { CACHE_TAGS } from "@/services/cacheTags";
import type { WarningLevel } from "@/types";

export const WARNING_LEVELS_CACHE_TAG = CACHE_TAGS.warningLevels;

const WARNING_LEVELS_REVALIDATE_SECONDS = 604_800;

export const getWarningLevels = cache(
    async (): Promise<WarningLevel[]> =>
        new DataService().fetchWarningLevels({
            revalidate: WARNING_LEVELS_REVALIDATE_SECONDS,
            tags: [WARNING_LEVELS_CACHE_TAG],
        })
);
