import useRedirectToHomeOnBack from "../useRedirectToHomeOnBack";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("react", () => {
    const originalReact = jest.requireActual("react");
    return {
        ...originalReact,
        useEffect: (fn: () => void) => {
            fn();
            return () => {};
        },
    };
});

describe("useRedirectToHomeOnBack", () => {
    let mockRouter: { push: jest.Mock };
    let addEventListenerSpy: jest.SpyInstance;
    let removeEventListenerSpy: jest.SpyInstance;

    beforeEach(() => {
        mockRouter = { push: jest.fn() };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        addEventListenerSpy = jest.spyOn(window, "addEventListener");
        removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    });

    afterEach(() => {
        jest.clearAllMocks();
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });

    describe("Event Listener Setup", () => {
        it("should attach popstate event listener on mount", () => {
            useRedirectToHomeOnBack();

            expect(addEventListenerSpy).toHaveBeenCalledWith("popstate", expect.any(Function));
        });
    });

    describe("Back Button Navigation", () => {
        it("should redirect to home on popstate", () => {
            useRedirectToHomeOnBack();

            const popstateEvent = new PopStateEvent("popstate");
            window.dispatchEvent(popstateEvent);

            expect(mockRouter.push).toHaveBeenCalledWith("/");
        });

        it("should handle multiple back button clicks", () => {
            useRedirectToHomeOnBack();

            const popstateEvent = new PopStateEvent("popstate");
            window.dispatchEvent(popstateEvent);
            window.dispatchEvent(popstateEvent);

            expect(mockRouter.push).toHaveBeenCalledTimes(2);
            expect(mockRouter.push).toHaveBeenCalledWith("/");
        });

        it("should always redirect to root path", () => {
            useRedirectToHomeOnBack();

            const popstateEvent = new PopStateEvent("popstate");
            window.dispatchEvent(popstateEvent);

            expect(mockRouter.push).toHaveBeenCalledWith("/");
        });
    });

    describe("Router Dependency", () => {
        it("should use router from useRouter hook", () => {
            useRedirectToHomeOnBack();

            expect(useRouter).toHaveBeenCalled();
        });
    });

    describe("Browser Back Button", () => {
        it("should handle browser back button gracefully", () => {
            useRedirectToHomeOnBack();

            const popstateEvent = new PopStateEvent("popstate", {
                state: { foo: "bar" },
            });
            window.dispatchEvent(popstateEvent);

            expect(mockRouter.push).toHaveBeenCalledWith("/");
        });

        it("should handle state in popstate event", () => {
            useRedirectToHomeOnBack();

            const popstateEvent = new PopStateEvent("popstate", {
                state: { userId: 123, timestamp: Date.now() },
            });
            window.dispatchEvent(popstateEvent);

            expect(mockRouter.push).toHaveBeenCalledWith("/");
        });
    });

    describe("Edge Cases", () => {
        it("should not respond to non-popstate events", () => {
            useRedirectToHomeOnBack();

            const clickEvent = new MouseEvent("click");
            window.dispatchEvent(clickEvent);

            const keydownEvent = new KeyboardEvent("keydown");
            window.dispatchEvent(keydownEvent);

            expect(mockRouter.push).not.toHaveBeenCalled();
        });

        it("should not respond to custom events", () => {
            useRedirectToHomeOnBack();

            const customEvent = new CustomEvent("custom");
            window.dispatchEvent(customEvent);

            expect(mockRouter.push).not.toHaveBeenCalled();
        });
    });
});
