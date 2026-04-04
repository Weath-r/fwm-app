import { useMapStore } from "../mapStore";
import { MapMarker } from "@/types";
import { Map } from "leaflet";

jest.mock("leaflet");

describe("useMapStore", () => {
    let mockMap: Partial<Map>;

    beforeEach(() => {
        mockMap = {
            on: jest.fn(),
            off: jest.fn(),
            remove: jest.fn(),
        } as Partial<Map>;

        useMapStore.setState({
            map: null,
            markers: [],
        });
    });

    describe("Initial State", () => {
        it("should initialize with null map", () => {
            const state = useMapStore.getState();
            expect(state.map).toBeNull();
        });

        it("should initialize with empty markers array", () => {
            const state = useMapStore.getState();
            expect(state.markers).toEqual([]);
        });
    });

    describe("setMap", () => {
        it("should set map instance", () => {
            useMapStore.getState().setMap(mockMap as Map);
            expect(useMapStore.getState().map).toBe(mockMap);
        });

        it("should replace existing map", () => {
            const firstMap = { id: "first" } as any;
            const secondMap = { id: "second" } as any;

            useMapStore.getState().setMap(firstMap);
            expect(useMapStore.getState().map).toBe(firstMap);

            useMapStore.getState().setMap(secondMap);
            expect(useMapStore.getState().map).toBe(secondMap);
        });

        it("should store map reference correctly", () => {
            useMapStore.getState().setMap(mockMap as Map);
            const stored = useMapStore.getState().map;

            expect(stored).toBe(mockMap);
            expect(stored?.on).toBeDefined();
        });
    });

    describe("addMarker", () => {
        it("should add single marker to list", () => {
            const marker: MapMarker = {
                coordinates: { lat: 10, lng: 20 },
                value: { color: "red", value: 12 },
            } as any;

            useMapStore.getState().addMarker(marker);

            const markers = useMapStore.getState().markers;
            expect(markers).toContain(marker);
            expect(markers.length).toBe(1);
        });

        it("should add multiple markers sequentially", () => {
            const marker1: MapMarker = {
                coordinates: { lat: 10, lng: 20 },
                value: { color: "red", value: 12 },
            } as any;
            const marker2: MapMarker = {
                coordinates: { lat: 30, lng: 40 },
                value: { color: "blue", value: 15 },
            } as any;

            useMapStore.getState().addMarker(marker1);
            useMapStore.getState().addMarker(marker2);

            const markers = useMapStore.getState().markers;
            expect(markers).toContain(marker1);
            expect(markers).toContain(marker2);
            expect(markers.length).toBe(2);
        });

        it("should preserve existing markers when adding new one", () => {
            const marker1: MapMarker = {
                coordinates: { lat: 10, lng: 20 },
                value: { color: "red", value: 12 },
            } as any;
            const marker2: MapMarker = {
                coordinates: { lat: 30, lng: 40 },
                value: { color: "blue", value: 15 },
            } as any;

            useMapStore.getState().addMarker(marker1);
            const firstMarkers = [...useMapStore.getState().markers];

            useMapStore.getState().addMarker(marker2);
            const secondMarkers = useMapStore.getState().markers;

            expect(secondMarkers[0]).toEqual(firstMarkers[0]);
        });

        it("should maintain marker order", () => {
            const markers: MapMarker[] = [
                { coordinates: { lat: 10, lng: 20 }, value: { color: "red", value: 12 } },
                { coordinates: { lat: 30, lng: 40 }, value: { color: "blue", value: 15 } },
                { coordinates: { lat: 50, lng: 60 }, value: { color: "green", value: 18 } },
            ] as any;

            markers.forEach((m) => useMapStore.getState().addMarker(m));

            const stored = useMapStore.getState().markers;
            expect(stored[0].value.value).toBe(12);
            expect(stored[1].value.value).toBe(15);
            expect(stored[2].value.value).toBe(18);
        });

        it("should allow duplicate markers", () => {
            const marker: MapMarker = {
                coordinates: { lat: 10, lng: 20 },
                value: { color: "red", value: 12 },
            } as any;

            useMapStore.getState().addMarker(marker);
            useMapStore.getState().addMarker(marker);

            expect(useMapStore.getState().markers.length).toBe(2);
        });
    });

    describe("clearMarkers", () => {
        it("should clear all markers", () => {
            useMapStore.getState().addMarker({
                coordinates: { lat: 10, lng: 20 },
                value: { color: "red", value: 12 },
            } as any);
            useMapStore.getState().addMarker({
                coordinates: { lat: 30, lng: 40 },
                value: { color: "blue", value: 15 },
            } as any);

            useMapStore.getState().clearMarkers();

            expect(useMapStore.getState().markers).toEqual([]);
        });

        it("should handle clearing empty markers list", () => {
            useMapStore.getState().clearMarkers();
            expect(useMapStore.getState().markers).toEqual([]);
        });

        it("should only clear markers, not map", () => {
            useMapStore.getState().setMap(mockMap as Map);
            useMapStore.getState().addMarker({
                coordinates: { lat: 10, lng: 20 },
                value: { color: "red", value: 12 },
            } as any);

            useMapStore.getState().clearMarkers();

            expect(useMapStore.getState().map).toBe(mockMap);
            expect(useMapStore.getState().markers).toEqual([]);
        });

        it("should allow adding markers after clearing", () => {
            useMapStore.getState().addMarker({
                coordinates: { lat: 10, lng: 20 },
                value: { color: "red", value: 12 },
            } as any);
            useMapStore.getState().clearMarkers();

            const newMarker: MapMarker = {
                coordinates: { lat: 30, lng: 40 },
                value: { color: "blue", value: 15 },
            } as any;
            useMapStore.getState().addMarker(newMarker);

            expect(useMapStore.getState().markers).toContain(newMarker);
            expect(useMapStore.getState().markers.length).toBe(1);
        });
    });

    describe("State Independence", () => {
        it("should maintain map and markers independently", () => {
            useMapStore.getState().setMap(mockMap as Map);
            useMapStore.getState().addMarker({
                coordinates: { lat: 10, lng: 20 },
                value: { color: "red", value: 12 },
            } as any);

            const state = useMapStore.getState();
            expect(state.map).toBe(mockMap);
            expect(state.markers.length).toBe(1);
        });

        it("should not affect markers when changing map", () => {
            useMapStore.getState().addMarker({
                coordinates: { lat: 10, lng: 20 },
                value: { color: "red", value: 12 },
            } as any);

            const firstMapMarkers = useMapStore.getState().markers.length;
            useMapStore.getState().setMap(mockMap as Map);
            const secondMapMarkers = useMapStore.getState().markers.length;

            expect(firstMapMarkers).toBe(secondMapMarkers);
        });

        it("should not affect map when clearing markers", () => {
            useMapStore.getState().setMap(mockMap as Map);
            useMapStore.getState().addMarker({
                coordinates: { lat: 10, lng: 20 },
                value: { color: "red", value: 12 },
            } as any);

            useMapStore.getState().clearMarkers();

            expect(useMapStore.getState().map).toBe(mockMap);
        });
    });

    describe("Workflow Scenarios", () => {
        it("should handle map setup and marker addition", () => {
            useMapStore.getState().setMap(mockMap as Map);
            useMapStore.getState().addMarker({
                coordinates: { lat: 10, lng: 20 },
                value: { color: "red", value: 12 },
            } as any);
            useMapStore.getState().addMarker({
                coordinates: { lat: 30, lng: 40 },
                value: { color: "blue", value: 15 },
            } as any);

            const state = useMapStore.getState();
            expect(state.map).toBeDefined();
            expect(state.markers.length).toBe(2);
        });
    });
});
