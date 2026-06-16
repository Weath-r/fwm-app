"use client";

import { useRef } from "react";
import { useConfigurationStore } from "@/stores/configurationStore";
import { FeatureFlags, MenuLink } from "@/types";

type ConfigStoreHydratorProps = {
    featureFlags: FeatureFlags;
    menu: MenuLink[];
};

export const ConfigStoreHydrator = ({ featureFlags, menu }: ConfigStoreHydratorProps) => {
    const hydrated = useRef(false);

    if (!hydrated.current) {
        useConfigurationStore.setState({ featureFlags, menu });
        hydrated.current = true;
    }

    return null;
};
