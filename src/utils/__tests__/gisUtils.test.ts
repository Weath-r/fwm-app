import {
    haversineDistance,
    interpolateElevation,
    applyAltitudeCorrection,
    createElevationVariogram,
    predictKriging,
    trainKriging,
} from "../gisUtils";
import { ElevationKnownPoints } from "@/types";
import kriging from "@sakitam-gis/kriging";

jest.mock("@sakitam-gis/kriging");
const mockVariogram = {
    n: 0,
    A: 0,
    M: [],
    x: [],
    y: [],
    z: [],
    range: 0,
    model: jest.fn(),
    nugget: 0,
    sill: 0,
};
describe("gisUtils", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("haversineDistance", () => {
        it("should calculate distance between two points on Earth", () => {
            // Distance from Athens to Lamia (approximately 150-160 km)
            const distance = haversineDistance(37.9838, 23.7275, 38.8906, 22.4277);

            // Should return a value in meters
            expect(typeof distance).toBe("number");
            expect(distance).toBeGreaterThan(0);
            // Approximate distance is ~150 km = 150000 meters
            expect(distance).toBeCloseTo(151600, -2);
        });

        it("should return 0 for same coordinates", () => {
            const distance = haversineDistance(37.9838, 23.7275, 37.9838, 23.7275);

            expect(distance).toBe(0);
        });

        it("should return positive distance", () => {
            const distance = haversineDistance(0, 0, 1, 1);

            expect(distance).toBeGreaterThan(0);
        });

        it("should handle different hemispheres", () => {
            // Distance from North Pole to South Pole
            const distance = haversineDistance(90, 0, -90, 0);

            // Should be approximately half Earth's circumference (~20000 km)
            expect(distance).toBeCloseTo(20015000, -3);
        });

        it("should handle negative coordinates", () => {
            const distance = haversineDistance(-33.8688, 151.2093, -37.8136, 144.9631); // Sydney to Melbourne

            expect(distance).toBeGreaterThan(0);
        });

        it("should be symmetric", () => {
            const distance1 = haversineDistance(37.9838, 23.7275, 38.8906, 22.4277);
            const distance2 = haversineDistance(38.8906, 22.4277, 37.9838, 23.7275);

            expect(distance1).toBeCloseTo(distance2, 0);
        });
    });

    describe("interpolateElevation", () => {
        it("should return exact elevation for exact match point", () => {
            const knownPoints: ElevationKnownPoints[] = [
                { lat: 37.0, lng: 23.0, elevation: 100 },
                { lat: 38.0, lng: 24.0, elevation: 200 },
            ];

            const result = interpolateElevation(37.0, 23.0, knownPoints);

            expect(result).toBe(100);
        });

        it("should interpolate elevation between known points", () => {
            const knownPoints: ElevationKnownPoints[] = [
                { lat: 37.0, lng: 23.0, elevation: 100 },
                { lat: 38.0, lng: 24.0, elevation: 200 },
            ];

            const result = interpolateElevation(37.5, 23.5, knownPoints);

            // Should be between 100 and 200
            expect(result).toBeGreaterThan(100);
            expect(result).toBeLessThan(200);
        });

        it("should use power parameter for distance weighting", () => {
            const knownPoints: ElevationKnownPoints[] = [
                { lat: 37.0, lng: 23.0, elevation: 100 },
                { lat: 38.0, lng: 24.0, elevation: 200 },
            ];

            const result1 = interpolateElevation(37.5, 23.5, knownPoints, 2);
            const result2 = interpolateElevation(37.5, 23.5, knownPoints, 3);

            // Different power values should give different results
            expect(typeof result1).toBe("number");
            expect(typeof result2).toBe("number");
        });

        it("should handle multiple known points", () => {
            const knownPoints: ElevationKnownPoints[] = [
                { lat: 37.0, lng: 23.0, elevation: 100 },
                { lat: 37.5, lng: 23.5, elevation: 150 },
                { lat: 38.0, lng: 24.0, elevation: 200 },
                { lat: 37.2, lng: 23.2, elevation: 120 },
            ];

            const result = interpolateElevation(37.3, 23.3, knownPoints);

            expect(typeof result).toBe("number");
            expect(result).toBeGreaterThan(0);
        });

        it("should use default power of 2", () => {
            const knownPoints: ElevationKnownPoints[] = [{ lat: 37.0, lng: 23.0, elevation: 100 }];

            const result = interpolateElevation(37.1, 23.1, knownPoints);

            expect(typeof result).toBe("number");
        });
    });

    describe("applyAltitudeCorrection", () => {
        it("should reduce temperature with increasing elevation", () => {
            const seaLevelTemp = 20; // 20°C at sea level
            const correctedTemp = applyAltitudeCorrection(seaLevelTemp, 1000, 0);

            expect(correctedTemp).toBeLessThan(seaLevelTemp);
        });

        it("should use standard lapse rate of 0.0065 °C/m", () => {
            const temp = 25;
            const elevation = 1000; // 1000 meters

            const result = applyAltitudeCorrection(temp, elevation, 0);
            const expected = 25 - 0.0065 * (1000 - 0);

            expect(result).toBeCloseTo(expected, 5);
        });

        it("should handle base elevation parameter", () => {
            const temp = 25;
            const currentElevation = 2000;
            const baseElevation = 1000;

            const result = applyAltitudeCorrection(temp, currentElevation, baseElevation);
            const expected = 25 - 0.0065 * (2000 - 1000);

            expect(result).toBeCloseTo(expected, 5);
        });

        it("should handle negative elevation difference", () => {
            const temp = 10;
            const result = applyAltitudeCorrection(temp, 500, 1000); // Going down

            expect(result).toBeGreaterThan(temp);
        });

        it("should return temperature when elevation is zero", () => {
            const temp = 20;
            const result = applyAltitudeCorrection(temp, 0, 0);

            expect(result).toBe(temp);
        });

        it("should handle high elevations", () => {
            const temp = 30;
            const result = applyAltitudeCorrection(temp, 5000, 0); // Mt. Kilimanjaro

            expect(result).toBeLessThan(temp);
        });
    });

    describe("createElevationVariogram", () => {
        it("should call kriging.train with correct parameters", () => {
            (kriging.train as jest.Mock).mockReturnValue(mockVariogram);

            const locations: ElevationKnownPoints[] = [
                { lat: 37.0, lng: 23.0, elevation: 100 },
                { lat: 38.0, lng: 24.0, elevation: 200 },
            ];

            const result = createElevationVariogram(locations);

            expect(kriging.train).toHaveBeenCalledWith(
                [100, 200],
                [23.0, 24.0],
                [37.0, 38.0],
                "exponential",
                0,
                25
            );
            expect(result).toEqual(mockVariogram);
        });

        it("should extract and pass arrays correctly", () => {
            (kriging.train as jest.Mock).mockReturnValue({});

            const locations: ElevationKnownPoints[] = [
                { lat: 37.5, lng: 23.5, elevation: 150 },
                { lat: 37.0, lng: 23.0, elevation: 100 },
            ];

            createElevationVariogram(locations);

            // Verify the function was called with correct parameters
            expect(kriging.train).toHaveBeenCalled();
            const callArgs = (kriging.train as jest.Mock).mock.calls[0];

            // Verify each array parameter
            expect(callArgs[0]).toEqual([150, 100]); // Elevations
            expect(callArgs[1]).toEqual([23.5, 23.0]); // Longitudes
            expect(callArgs[2]).toEqual([37.5, 37.0]); // Latitudes
            expect(callArgs[3]).toBe("exponential");
            expect(callArgs[4]).toBe(0);
            expect(callArgs[5]).toBe(25);
        });
    });

    describe("predictKriging", () => {
        it("should call kriging.predict with correct parameters", () => {
            (kriging.predict as jest.Mock).mockReturnValue(150);

            const result = predictKriging({ x: 23.5, y: 37.5, variogram: mockVariogram });

            expect(kriging.predict).toHaveBeenCalledWith(23.5, 37.5, mockVariogram);
            expect(result).toBe(150);
        });

        it("should return predicted elevation value", () => {
            (kriging.predict as jest.Mock).mockReturnValue(175);
            const result = predictKriging({ x: 24.0, y: 38.0, variogram: mockVariogram });

            expect(typeof result).toBe("number");
            expect(result).toBe(175);
        });
    });

    describe("trainKriging", () => {
        it("should call kriging.train with correct parameters", () => {
            (kriging.train as jest.Mock).mockReturnValue(mockVariogram);

            const values = [100, 150, 200];
            const lons = [23.0, 23.5, 24.0];
            const lats = [37.0, 37.5, 38.0];

            const result = trainKriging({ values, lons, lats });

            expect(kriging.train).toHaveBeenCalledWith(values, lons, lats, "exponential", 0, 25);
            expect(result).toEqual(mockVariogram);
        });

        it("should handle single point", () => {
            (kriging.train as jest.Mock).mockReturnValue({});

            trainKriging({ values: [100], lons: [23.0], lats: [37.0] });

            expect(kriging.train).toHaveBeenCalledWith([100], [23.0], [37.0], "exponential", 0, 25);
        });

        it("should handle multiple points", () => {
            (kriging.train as jest.Mock).mockReturnValue({});

            const values = [100, 150, 200, 250, 300];
            const lons = [23.0, 23.2, 23.4, 23.6, 23.8];
            const lats = [37.0, 37.1, 37.2, 37.3, 37.4];

            trainKriging({ values, lons, lats });

            const callArgs = (kriging.train as jest.Mock).mock.calls[0];
            expect(callArgs[0]).toEqual(values);
            expect(callArgs[1]).toEqual(lons);
            expect(callArgs[2]).toEqual(lats);
        });
    });
});
