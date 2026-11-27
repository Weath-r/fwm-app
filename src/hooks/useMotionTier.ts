import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export type MotionTier = "full" | "lite" | "still";

export type MotionEnvironment = {
    reducedMotion: boolean;
    reducedData: boolean;
    saveData: boolean;
    deviceMemory?: number;
    hardwareConcurrency?: number;
};

const LITE_DEVICE_LIMIT = 4;
const WAKE_EVENTS = ["pointerenter", "pointerdown", "focusin", "keydown"] as const;
const ENVIRONMENT_QUERIES = ["(prefers-reduced-motion: reduce)", "(prefers-reduced-data: reduce)"];

export const detectMotionTier = (environment: MotionEnvironment): MotionTier => {
    if (environment.reducedMotion) {
        return "still";
    }
    const lowMemory =
        environment.deviceMemory !== undefined && environment.deviceMemory <= LITE_DEVICE_LIMIT;
    const fewCores =
        environment.hardwareConcurrency !== undefined &&
        environment.hardwareConcurrency <= LITE_DEVICE_LIMIT;
    return lowMemory || fewCores || environment.saveData || environment.reducedData
        ? "lite"
        : "full";
};

const readEnvironment = (): MotionEnvironment => {
    const hints = navigator as Navigator & {
        deviceMemory?: number;
        connection?: { saveData?: boolean };
    };
    return {
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        reducedData: window.matchMedia("(prefers-reduced-data: reduce)").matches,
        saveData: hints.connection?.saveData === true,
        deviceMemory: hints.deviceMemory,
        hardwareConcurrency: navigator.hardwareConcurrency,
    };
};

const subscribeToEnvironment = (onChange: () => void) => {
    const queries = ENVIRONMENT_QUERIES.map((query) => window.matchMedia(query));
    queries.forEach((query) => query.addEventListener("change", onChange));
    return () => queries.forEach((query) => query.removeEventListener("change", onChange));
};

const readTier = () => detectMotionTier(readEnvironment());

const serverTier = (): MotionTier => "full";

export const useMotionTier = <T extends HTMLElement>(settleMilliseconds = 20_000) => {
    const ref = useRef<T>(null);
    const tier = useSyncExternalStore(subscribeToEnvironment, readTier, serverTier);
    const [inView, setInView] = useState(false);
    const [settled, setSettled] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || typeof IntersectionObserver === "undefined") {
            return;
        }
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const element = ref.current;
        if (!element || !inView) {
            return;
        }
        let timer = window.setTimeout(() => setSettled(true), settleMilliseconds);
        const wake = () => {
            setSettled(false);
            window.clearTimeout(timer);
            timer = window.setTimeout(() => setSettled(true), settleMilliseconds);
        };
        WAKE_EVENTS.forEach((name) => element.addEventListener(name, wake));
        window.addEventListener("scroll", wake, { passive: true });
        return () => {
            window.clearTimeout(timer);
            WAKE_EVENTS.forEach((name) => element.removeEventListener(name, wake));
            window.removeEventListener("scroll", wake);
        };
    }, [inView, settleMilliseconds]);

    return { ref, tier, paused: !inView || settled };
};
