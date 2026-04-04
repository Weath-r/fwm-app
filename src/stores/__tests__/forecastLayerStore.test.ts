import { useForecastLayerStore } from "../forecastLayerStore";
import { ForecastGFSData } from "@/types";

describe("useForecastLayerStore", () => {
    beforeEach(() => {
        useForecastLayerStore.setState({
            forecastData: {},
            activeForecastHour: "",
        });
    });

    describe("Initial State", () => {
        it("should initialize with empty forecast data", () => {
            const state = useForecastLayerStore.getState();
            expect(state.forecastData).toEqual({});
        });

        it("should initialize with empty active forecast hour", () => {
            const state = useForecastLayerStore.getState();
            expect(state.activeForecastHour).toBe("");
        });
    });

    describe("setForecastData", () => {
        it("should set forecast data", () => {
            const mockData: ForecastGFSData = {
                "2024-01-01-00": { temperature: 20, humidity: 65 },
                "2024-01-01-06": { temperature: 18, humidity: 70 },
            } as any;

            useForecastLayerStore.getState().setForecastData(mockData);

            expect(useForecastLayerStore.getState().forecastData).toEqual(mockData);
        });

        it("should replace existing forecast data", () => {
            const first: ForecastGFSData = {
                "2024-01-01-00": { temperature: 20 },
            } as any;
            const second: ForecastGFSData = {
                "2024-01-02-00": { temperature: 22 },
            } as any;

            useForecastLayerStore.getState().setForecastData(first);
            expect(useForecastLayerStore.getState().forecastData).toEqual(first);

            useForecastLayerStore.getState().setForecastData(second);
            expect(useForecastLayerStore.getState().forecastData).toEqual(second);
        });

        it("should handle empty forecast data", () => {
            useForecastLayerStore.getState().setForecastData({});
            expect(useForecastLayerStore.getState().forecastData).toEqual({});
        });

        it("should handle large forecast datasets", () => {
            const largeData: ForecastGFSData = {};
            for (let i = 0; i < 100; i++) {
                const date = new Date();
                date.setHours(date.getHours() + i);
                const key = date.toISOString();
                (largeData as any)[key] = {
                    temperature: 20 + Math.random() * 10,
                    humidity: 50 + Math.random() * 40,
                };
            }

            useForecastLayerStore.getState().setForecastData(largeData);
            expect(Object.keys(useForecastLayerStore.getState().forecastData).length).toBe(100);
        });

        it("should maintain forecast data structure", () => {
            const mockData: ForecastGFSData = {
                "2024-01-01-00": {
                    temperature: 20,
                    humidity: 65,
                    windSpeed: 10,
                    windDirection: 180,
                } as any,
            };

            useForecastLayerStore.getState().setForecastData(mockData);

            const stored = useForecastLayerStore.getState().forecastData;
            expect(stored["2024-01-01-00"]).toBeDefined();
        });
    });

    describe("setActiveForecastHour", () => {
        it("should set active forecast hour", () => {
            const hour = "2024-01-01-06";

            useForecastLayerStore.getState().setActiveForecastHour(hour);

            expect(useForecastLayerStore.getState().activeForecastHour).toBe(hour);
        });

        it("should replace existing active hour", () => {
            const first = "2024-01-01-00";
            const second = "2024-01-01-06";

            useForecastLayerStore.getState().setActiveForecastHour(first);
            expect(useForecastLayerStore.getState().activeForecastHour).toBe(first);

            useForecastLayerStore.getState().setActiveForecastHour(second);
            expect(useForecastLayerStore.getState().activeForecastHour).toBe(second);
        });

        it("should handle empty string", () => {
            useForecastLayerStore.getState().setActiveForecastHour("");
            expect(useForecastLayerStore.getState().activeForecastHour).toBe("");
        });

        it("should store exact hour string", () => {
            const hour = "2024-12-31T23:00:00Z";

            useForecastLayerStore.getState().setActiveForecastHour(hour);

            expect(useForecastLayerStore.getState().activeForecastHour).toBe(hour);
        });
    });

    describe("State Independence", () => {
        it("should maintain forecast data and active hour independently", () => {
            const mockData: ForecastGFSData = {
                "2024-01-01-00": { temperature: 20 },
            } as any;
            const hour = "2024-01-01-06";

            useForecastLayerStore.getState().setForecastData(mockData);
            useForecastLayerStore.getState().setActiveForecastHour(hour);

            const state = useForecastLayerStore.getState();
            expect(Object.keys(state.forecastData).length).toBe(1);
            expect(state.activeForecastHour).toBe(hour);
        });

        it("should not affect forecast data when changing active hour", () => {
            const mockData: ForecastGFSData = {
                "2024-01-01-00": { temperature: 20 },
            } as any;

            useForecastLayerStore.getState().setForecastData(mockData);
            const originalData = { ...useForecastLayerStore.getState().forecastData };

            useForecastLayerStore.getState().setActiveForecastHour("2024-01-01-06");

            expect(useForecastLayerStore.getState().forecastData).toEqual(originalData);
        });

        it("should not affect active hour when changing forecast data", () => {
            useForecastLayerStore.getState().setActiveForecastHour("2024-01-01-00");

            const newData: ForecastGFSData = {
                "2024-01-02-00": { temperature: 22 },
            } as any;
            useForecastLayerStore.getState().setForecastData(newData);

            expect(useForecastLayerStore.getState().activeForecastHour).toBe("2024-01-01-00");
        });
    });

    describe("Workflow Scenarios", () => {
        it("should handle loading and selecting forecast data", () => {
            const mockData: ForecastGFSData = {
                "2024-01-01-00": { temperature: 20, humidity: 65 },
                "2024-01-01-06": { temperature: 18, humidity: 70 },
                "2024-01-01-12": { temperature: 22, humidity: 60 },
            } as any;

            useForecastLayerStore.getState().setForecastData(mockData);
            useForecastLayerStore.getState().setActiveForecastHour("2024-01-01-06");

            const state = useForecastLayerStore.getState();
            expect(Object.keys(state.forecastData).length).toBe(3);
            expect(state.activeForecastHour).toBe("2024-01-01-06");
        });

        it("should handle updating forecast with new data", () => {
            const initialData: ForecastGFSData = {
                "2024-01-01-00": { temperature: 20 },
            } as any;

            useForecastLayerStore.getState().setForecastData(initialData);
            useForecastLayerStore.getState().setActiveForecastHour("2024-01-01-00");

            const updatedData: ForecastGFSData = {
                "2024-01-02-00": { temperature: 21 },
                "2024-01-02-06": { temperature: 19 },
            } as any;

            useForecastLayerStore.getState().setForecastData(updatedData);

            expect(useForecastLayerStore.getState().forecastData).toEqual(updatedData);
            expect(useForecastLayerStore.getState().activeForecastHour).toBe("2024-01-01-00");
        });

        it("should handle clearing forecast and returning to default", () => {
            const mockData: ForecastGFSData = {
                "2024-01-01-00": { temp: 20 },
            } as any;

            useForecastLayerStore.getState().setForecastData(mockData);
            useForecastLayerStore.getState().setActiveForecastHour("2024-01-01-00");

            useForecastLayerStore.getState().setForecastData({});
            useForecastLayerStore.getState().setActiveForecastHour("");

            const state = useForecastLayerStore.getState();
            expect(state.forecastData).toEqual({});
            expect(state.activeForecastHour).toBe("");
        });

        it("should handle switching active hour within same dataset", () => {
            const mockData: ForecastGFSData = {
                "2024-01-01-00": { temperature: 20 },
                "2024-01-01-06": { temperature: 18 },
                "2024-01-01-12": { temperature: 22 },
            } as any;

            useForecastLayerStore.getState().setForecastData(mockData);

            useForecastLayerStore.getState().setActiveForecastHour("2024-01-01-00");
            expect(useForecastLayerStore.getState().activeForecastHour).toBe("2024-01-01-00");

            useForecastLayerStore.getState().setActiveForecastHour("2024-01-01-06");
            expect(useForecastLayerStore.getState().activeForecastHour).toBe("2024-01-01-06");

            useForecastLayerStore.getState().setActiveForecastHour("2024-01-01-12");
            expect(useForecastLayerStore.getState().activeForecastHour).toBe("2024-01-01-12");
        });

        it("should handle active hour not in forecast data", () => {
            const mockData: ForecastGFSData = {
                "2024-01-01-00": { temperature: 20 },
            } as any;

            useForecastLayerStore.getState().setForecastData(mockData);
            useForecastLayerStore.getState().setActiveForecastHour("2024-01-02-00");

            const state = useForecastLayerStore.getState();
            expect(state.forecastData["2024-01-02-00"]).toBeUndefined();
            expect(state.activeForecastHour).toBe("2024-01-02-00");
        });
    });
});
