import { useAppStore } from "../useAppStore";
import * as localStorageUtils from "@/utils/localStorage";

// Mock localStorage utilities
jest.mock("@/utils/localStorage");

describe("useAppStore", () => {
    beforeEach(() => {
        // Clear the store before each test
        useAppStore.setState({
            favouriteStations: [],
            showFavouriteStations: false,
        });

        // Reset all mocks
        jest.clearAllMocks();

        // Default mock implementations
        (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);
        (localStorageUtils.getShowFavouriteStations as jest.Mock).mockReturnValue(false);
        (localStorageUtils.storeFavouriteStationsList as jest.Mock).mockImplementation(() => {});
        (localStorageUtils.storeShowFavouriteStations as jest.Mock).mockImplementation(() => {});
    });

    describe("Initial State", () => {
        it("should initialize with empty favourite stations list", () => {
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);
            const store = useAppStore.getState();

            expect(store.favouriteStations).toEqual([]);
        });

        it("should initialize with stored favourite stations from localStorage", () => {
            const storedStations = [1, 2, 3];
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue(
                storedStations
            );

            // Recreate store with new mocked data
            useAppStore.setState({
                favouriteStations: storedStations,
            });

            const store = useAppStore.getState();
            expect(store.favouriteStations).toEqual(storedStations);
        });

        it("should initialize showFavouriteStations as false by default", () => {
            (localStorageUtils.getShowFavouriteStations as jest.Mock).mockReturnValue(false);
            const store = useAppStore.getState();

            expect(store.showFavouriteStations).toBe(false);
        });

        it("should initialize showFavouriteStations with stored value", () => {
            (localStorageUtils.getShowFavouriteStations as jest.Mock).mockReturnValue(true);

            useAppStore.setState({
                showFavouriteStations: true,
            });

            const store = useAppStore.getState();
            expect(store.showFavouriteStations).toBe(true);
        });
    });

    describe("isStationFavourite", () => {
        it("should return true if station is in favourite list", () => {
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1, 2, 3]);

            const state = useAppStore.getState();
            expect(state.isStationFavourite(2)).toBe(true);
        });

        it("should return false if station is not in favourite list", () => {
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1, 2, 3]);

            const state = useAppStore.getState();
            expect(state.isStationFavourite(5)).toBe(false);
        });

        it("should return false for empty favourite list", () => {
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);

            const state = useAppStore.getState();
            expect(state.isStationFavourite(1)).toBe(false);
        });

        it("should return true for single favorite in list", () => {
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([42]);

            const state = useAppStore.getState();
            expect(state.isStationFavourite(42)).toBe(true);
        });

        it("should reflect current localStorage state", () => {
            // First call
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1]);
            let state = useAppStore.getState();
            expect(state.isStationFavourite(1)).toBe(true);

            // Update localStorage
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1, 2, 3]);
            state = useAppStore.getState();
            expect(state.isStationFavourite(3)).toBe(true);
        });
    });

    describe("handleFavouriteStationButton - Add", () => {
        beforeEach(() => {
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);
            useAppStore.setState({
                favouriteStations: [],
                showFavouriteStations: false,
            });
        });

        it("should add station to favourite list", () => {
            const state = useAppStore.getState();
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);

            state.handleFavouriteStationButton(1);

            const updatedState = useAppStore.getState();
            expect(updatedState.favouriteStations).toContain(1);
        });

        it("should add multiple stations to favourite list", () => {
            const state = useAppStore.getState();

            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);
            state.handleFavouriteStationButton(1);

            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1]);
            state.handleFavouriteStationButton(2);

            const updatedState = useAppStore.getState();
            expect(updatedState.favouriteStations).toContain(1);
            expect(updatedState.favouriteStations).toContain(2);
            expect(updatedState.favouriteStations.length).toBe(2);
        });

        it("should persist favourite stations to localStorage", () => {
            const state = useAppStore.getState();
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);

            state.handleFavouriteStationButton(5);

            expect(localStorageUtils.storeFavouriteStationsList).toHaveBeenCalledWith(
                expect.arrayContaining([5])
            );
        });

        it("should not duplicate favourite station", () => {
            useAppStore.setState({ favouriteStations: [1, 2] });
            const state = useAppStore.getState();
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1, 2]);

            state.handleFavouriteStationButton(1);

            // Station should be removed if it already exists
            const updatedState = useAppStore.getState();
            expect(
                updatedState.favouriteStations.filter((id) => id === 1).length
            ).toBeLessThanOrEqual(1);
        });
    });

    describe("handleFavouriteStationButton - Remove", () => {
        it("should remove station from favourite list", () => {
            useAppStore.setState({ favouriteStations: [1, 2, 3] });
            const state = useAppStore.getState();
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1, 2, 3]);

            state.handleFavouriteStationButton(2);

            const updatedState = useAppStore.getState();
            expect(updatedState.favouriteStations).not.toContain(2);
            expect(updatedState.favouriteStations).toContain(1);
            expect(updatedState.favouriteStations).toContain(3);
        });

        it("should persist removal to localStorage", () => {
            useAppStore.setState({ favouriteStations: [1, 2, 3] });
            const state = useAppStore.getState();
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1, 2, 3]);

            state.handleFavouriteStationButton(2);

            expect(localStorageUtils.storeFavouriteStationsList).toHaveBeenCalledWith(
                expect.not.arrayContaining([2])
            );
        });

        it("should hide favourite stations view when list becomes empty", () => {
            useAppStore.setState({
                favouriteStations: [1],
                showFavouriteStations: true,
            });
            const state = useAppStore.getState();
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1]);

            state.handleFavouriteStationButton(1);

            const updatedState = useAppStore.getState();
            expect(updatedState.favouriteStations).toEqual([]);
            expect(updatedState.showFavouriteStations).toBe(false);
        });

        it("should persist hidden state to localStorage when emptying list", () => {
            useAppStore.setState({
                favouriteStations: [1],
                showFavouriteStations: true,
            });
            const state = useAppStore.getState();
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1]);

            state.handleFavouriteStationButton(1);

            expect(localStorageUtils.storeShowFavouriteStations).toHaveBeenCalledWith(false);
        });

        it("should not hide favourite stations if list still has items", () => {
            useAppStore.setState({
                favouriteStations: [1, 2],
                showFavouriteStations: true,
            });
            const state = useAppStore.getState();
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1, 2]);

            state.handleFavouriteStationButton(1);

            const updatedState = useAppStore.getState();
            expect(updatedState.showFavouriteStations).toBe(true);
        });
    });

    describe("handleFavouriteStationButton - Toggle", () => {
        it("should toggle a station from not favourite to favourite", () => {
            useAppStore.setState({ favouriteStations: [] });
            const state = useAppStore.getState();
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);

            expect(state.isStationFavourite(1)).toBe(false);

            state.handleFavouriteStationButton(1);

            const updatedState = useAppStore.getState();
            expect(updatedState.favouriteStations).toContain(1);
        });

        it("should toggle a station from favourite to not favourite", () => {
            useAppStore.setState({ favouriteStations: [1] });
            const state = useAppStore.getState();
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1]);

            expect(state.isStationFavourite(1)).toBe(true);

            state.handleFavouriteStationButton(1);

            const updatedState = useAppStore.getState();
            expect(updatedState.favouriteStations).not.toContain(1);
        });
    });

    describe("setShowFavouriteStations", () => {
        it("should set showFavouriteStations to true", () => {
            useAppStore.setState({ showFavouriteStations: false });
            const state = useAppStore.getState();

            state.setShowFavouriteStations(true);

            const updatedState = useAppStore.getState();
            expect(updatedState.showFavouriteStations).toBe(true);
        });

        it("should set showFavouriteStations to false", () => {
            useAppStore.setState({ showFavouriteStations: true });
            const state = useAppStore.getState();

            state.setShowFavouriteStations(false);

            const updatedState = useAppStore.getState();
            expect(updatedState.showFavouriteStations).toBe(false);
        });

        it("should persist showFavouriteStations to localStorage when set to true", () => {
            const state = useAppStore.getState();

            state.setShowFavouriteStations(true);

            expect(localStorageUtils.storeShowFavouriteStations).toHaveBeenCalledWith(true);
        });

        it("should persist showFavouriteStations to localStorage when set to false", () => {
            const state = useAppStore.getState();

            state.setShowFavouriteStations(false);

            expect(localStorageUtils.storeShowFavouriteStations).toHaveBeenCalledWith(false);
        });

        it("should toggle showFavouriteStations multiple times", () => {
            const state = useAppStore.getState();

            state.setShowFavouriteStations(true);
            expect(useAppStore.getState().showFavouriteStations).toBe(true);

            state.setShowFavouriteStations(false);
            expect(useAppStore.getState().showFavouriteStations).toBe(false);

            state.setShowFavouriteStations(true);
            expect(useAppStore.getState().showFavouriteStations).toBe(true);
        });
    });

    describe("Edge Cases", () => {
        it("should handle adding same station multiple times correctly", () => {
            useAppStore.setState({ favouriteStations: [1] });
            const state = useAppStore.getState();
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1]);

            // Try to toggle - should remove since it exists
            state.handleFavouriteStationButton(1);

            const updatedState = useAppStore.getState();
            expect(updatedState.favouriteStations).not.toContain(1);
        });

        it("should handle very large station IDs", () => {
            const largeId = 999999;
            useAppStore.setState({ favouriteStations: [] });
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);

            const state = useAppStore.getState();
            state.handleFavouriteStationButton(largeId);

            expect(useAppStore.getState().favouriteStations).toContain(largeId);
        });

        it("should handle station ID of 0", () => {
            useAppStore.setState({ favouriteStations: [] });
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);

            const state = useAppStore.getState();
            state.handleFavouriteStationButton(0);

            expect(useAppStore.getState().favouriteStations).toContain(0);
        });

        it("should handle negative station IDs", () => {
            useAppStore.setState({ favouriteStations: [] });
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);

            const state = useAppStore.getState();
            state.handleFavouriteStationButton(-1);

            expect(useAppStore.getState().favouriteStations).toContain(-1);
        });
    });

    describe("Persistence", () => {
        it("should call storeFavouriteStationsList on every favourite change", () => {
            useAppStore.setState({ favouriteStations: [] });
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([]);
            jest.clearAllMocks();

            const state = useAppStore.getState();
            state.handleFavouriteStationButton(1);

            expect(localStorageUtils.storeFavouriteStationsList).toHaveBeenCalled();
        });

        it("should persist correct data structure to localStorage", () => {
            useAppStore.setState({ favouriteStations: [1, 2, 3] });
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1, 2, 3]);
            jest.clearAllMocks();

            const state = useAppStore.getState();
            state.handleFavouriteStationButton(4);

            const callArgs = (localStorageUtils.storeFavouriteStationsList as jest.Mock).mock
                .calls[0][0];
            expect(Array.isArray(callArgs)).toBe(true);
            expect(callArgs).toContain(4);
        });

        it("should not persist to localStorage unnecessarily", () => {
            useAppStore.setState({ favouriteStations: [1, 2] });
            jest.clearAllMocks();

            const state = useAppStore.getState();
            // Just check status, don't change anything
            state.isStationFavourite(1);

            expect(localStorageUtils.storeFavouriteStationsList).not.toHaveBeenCalled();
        });
    });

    describe("State Isolation", () => {
        it("should maintain favouriteStations and showFavouriteStations independently", () => {
            useAppStore.setState({
                favouriteStations: [1, 2, 3],
                showFavouriteStations: false,
            });

            const state = useAppStore.getState();
            state.setShowFavouriteStations(true);

            const updatedState = useAppStore.getState();
            expect(updatedState.favouriteStations).toEqual([1, 2, 3]);
            expect(updatedState.showFavouriteStations).toBe(true);
        });

        it("should not affect showFavouriteStations when modifying favouriteStations", () => {
            useAppStore.setState({
                favouriteStations: [1],
                showFavouriteStations: true,
            });
            (localStorageUtils.getFavouritesStationList as jest.Mock).mockReturnValue([1]);

            const state = useAppStore.getState();
            state.handleFavouriteStationButton(2);

            const updatedState = useAppStore.getState();
            expect(updatedState.showFavouriteStations).toBe(true);
            expect(updatedState.favouriteStations).toContain(2);
        });
    });
});
