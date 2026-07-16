import { CACHE_TAGS, isValidCacheTag } from "../cacheTags";

describe("isValidCacheTag", () => {
    it("accepts every registered tag", () => {
        Object.values(CACHE_TAGS).forEach((tag) => {
            expect(isValidCacheTag(tag)).toBe(true);
        });
    });

    it("rejects an unknown tag", () => {
        expect(isValidCacheTag("not-a-real-tag")).toBe(false);
    });

    it("rejects an empty string", () => {
        expect(isValidCacheTag("")).toBe(false);
    });
});
