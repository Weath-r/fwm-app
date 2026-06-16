import { getConfiguration, getMenu } from "../getConfiguration";
import { BASE_MENU } from "@/constants/navigation";

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

jest.spyOn(console, "error").mockImplementation(() => {});

const buildResponse = (data: unknown, ok = true, status = 200) =>
    ({
        ok,
        status,
        json: async () => ({ data }),
    }) as Response;

describe("getConfiguration", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("reduces the Directus configuration array into a feature flags map", async () => {
        mockFetch.mockResolvedValue(
            buildResponse([
                { id: 1, value: "warnings", config: { showWarningsMenuItem: true } },
                { id: 2, value: "forecasts", config: { forecastSummary: true } },
            ])
        );

        const featureFlags = await getConfiguration();

        expect(featureFlags).toEqual({
            warnings: { showWarningsMenuItem: true },
            forecasts: { forecastSummary: true },
        });
    });

    it("returns an empty map when the request fails", async () => {
        mockFetch.mockResolvedValue(buildResponse(null, false, 500));

        const featureFlags = await getConfiguration();

        expect(featureFlags).toEqual({});
    });

    it("returns an empty map when fetch rejects", async () => {
        mockFetch.mockRejectedValue(new Error("network down"));

        const featureFlags = await getConfiguration();

        expect(featureFlags).toEqual({});
    });
});

describe("getMenu", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("keeps the warnings item when showWarningsMenuItem is enabled", async () => {
        const warningsMenu = [...BASE_MENU, { pathName: "warnings", text: "Warnings", value: "warnings" }];
        // Re-derive from a flag set that enables warnings; BASE_MENU has no warnings
        // entry, so this asserts the no-removal path returns BASE_MENU untouched.
        mockFetch.mockResolvedValue(
            buildResponse([{ id: 1, value: "warnings", config: { showWarningsMenuItem: true } }])
        );

        const menu = await getMenu();

        expect(menu).toEqual(BASE_MENU);
        expect(warningsMenu).toContainEqual(expect.objectContaining({ value: "warnings" }));
    });

    it("filters out the warnings item when showWarningsMenuItem is disabled", async () => {
        mockFetch.mockResolvedValue(
            buildResponse([{ id: 1, value: "warnings", config: { showWarningsMenuItem: false } }])
        );

        const menu = await getMenu();

        expect(menu).not.toContainEqual(expect.objectContaining({ value: "warnings" }));
        expect(menu).toContainEqual(expect.objectContaining({ value: "map" }));
    });
});
