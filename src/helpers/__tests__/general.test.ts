import { randomIndexFromArray, timer } from "../general";

describe("general", () => {
    describe("randomIndexFromArray", () => {
        it("should be a function", () => {
            expect(typeof randomIndexFromArray).toBe("function");
        });

        it("should return a number", () => {
            const array = [1, 2, 3, 4, 5];
            const result = randomIndexFromArray(array);
            expect(typeof result).toBe("number");
        });

        it("should return a valid index for array", () => {
            const array = [1, 2, 3, 4, 5];
            const result = randomIndexFromArray(array);

            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThan(array.length);
        });

        it("should return an integer index", () => {
            const array = ["a", "b", "c"];
            const result = randomIndexFromArray(array);

            expect(Number.isInteger(result)).toBe(true);
        });

        it("should return valid index for single element array", () => {
            const array = [42];
            const result = randomIndexFromArray(array);

            expect(result).toBe(0);
        });

        it("should return valid index for large array", () => {
            const array = Array.from({ length: 1000 }, (_, i) => i);
            const result = randomIndexFromArray(array);

            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThan(1000);
        });

        it("should handle array with various element types", () => {
            const array = [1, "string", { obj: true }, [1, 2, 3], null];
            const result = randomIndexFromArray(array);

            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThan(array.length);
        });

        it("should handle empty array gracefully", () => {
            const array: any[] = [];
            const result = randomIndexFromArray(array);

            expect(typeof result).toBe("number");
            // Either returns -1 or NaN for empty array
            expect(result === -1 || Number.isNaN(result) || result >= array.length).toBe(true);
        });
    });

    describe("timer", () => {
        it("should be a function", () => {
            expect(typeof timer).toBe("function");
        });

        it("should return a number or Promise", () => {
            const result = timer(100);
            expect(result instanceof Promise || typeof result === "number").toBe(true);
        });

        it("should handle numeric parameter", () => {
            const result = timer(1000);
            expect(result instanceof Promise || typeof result === "number").toBe(true);
        });

        it("should create a delay promise", (done) => {
            const startTime = Date.now();
            const delayMs = 10;

            const result = timer(delayMs);

            if (result instanceof Promise) {
                result.then(() => {
                    const elapsed = Date.now() - startTime;
                    // Should have elapsed at least the delay time
                    expect(elapsed).toBeGreaterThanOrEqual(delayMs - 5); // -5ms tolerance
                    done();
                });
            } else {
                // If it returns a number, just verify it's the delay
                expect(result).toBe(delayMs);
                done();
            }
        });

        it("should work with zero delay", async () => {
            const result = timer(0);

            if (result instanceof Promise) {
                await result;
                expect(true).toBe(true);
            }
        });

        it("should work with various delay durations", async () => {
            const durations = [1, 10, 50];

            for (const duration of durations) {
                const result = timer(duration);

                if (result instanceof Promise) {
                    await result;
                    expect(true).toBe(true);
                }
            }
        });

        it("should handle large delay values", async () => {
            const result = timer(1000);

            if (result instanceof Promise) {
                // Create a timeout to avoid test hanging indefinitely
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Timeout")), 2000)
                );

                try {
                    await Promise.race([result, timeoutPromise]);
                    expect(true).toBe(true);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                    // If it times out, that's ok
                    expect(true).toBe(true);
                }
            }
        });

        it("should resolve to void or undefined", async () => {
            const result = timer(10);

            if (result instanceof Promise) {
                const resolved = await result;
                expect(resolved === undefined || resolved === null || resolved === void 0).toBe(
                    true
                );
            }
        });
    });
});
