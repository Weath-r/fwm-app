import axios from "axios";
import { createAxiosInstance } from "../httpClientUtils";

jest.mock("axios");
jest.mock("@/app/appConfig");

describe("httpClientUtils", () => {
    const mockAxiosCreate = axios.create as jest.MockedFunction<typeof axios.create>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createAxiosInstance", () => {
        it("should create axios instance with headers", () => {
            const mockInstance = { get: jest.fn(), post: jest.fn() };
            mockAxiosCreate.mockReturnValue(mockInstance as any);

            createAxiosInstance();

            expect(mockAxiosCreate).toHaveBeenCalled();
            const callConfig = mockAxiosCreate.mock.calls[0][0];

            // Check that headers are set correctly with default values
            expect(callConfig?.headers).toEqual({
                Accept: "application/json",
                "Content-Type": "application/json",
            });
        });

        it("should merge custom headers with default headers", () => {
            const mockInstance = { get: jest.fn(), post: jest.fn() };
            mockAxiosCreate.mockReturnValue(mockInstance as any);

            const customHeaders = {
                Authorization: "Bearer token123",
                "X-Custom-Header": "customValue",
            };

            createAxiosInstance(customHeaders);

            const callConfig = mockAxiosCreate.mock.calls[0][0];

            // Check that all headers are merged
            expect(callConfig?.headers).toEqual({
                Authorization: "Bearer token123",
                "X-Custom-Header": "customValue",
                Accept: "application/json",
                "Content-Type": "application/json",
            });
        });

        it("should pass config object to axios.create", () => {
            const mockInstance = { get: jest.fn(), post: jest.fn() };
            mockAxiosCreate.mockReturnValue(mockInstance as any);

            createAxiosInstance();

            expect(mockAxiosCreate).toHaveBeenCalledWith(
                expect.objectContaining({
                    headers: expect.any(Object),
                })
            );
        });

        it("should handle empty custom headers object", () => {
            const mockInstance = { get: jest.fn(), post: jest.fn() };
            mockAxiosCreate.mockReturnValue(mockInstance as any);

            createAxiosInstance({});

            const callConfig = mockAxiosCreate.mock.calls[0][0];

            expect(callConfig?.headers).toEqual({
                Accept: "application/json",
                "Content-Type": "application/json",
            });
        });

        it("should return the created axios instance", () => {
            const mockInstance = { get: jest.fn(), post: jest.fn() };
            mockAxiosCreate.mockReturnValue(mockInstance as any);

            const result = createAxiosInstance();

            expect(result).toEqual(mockInstance);
        });
    });
});
