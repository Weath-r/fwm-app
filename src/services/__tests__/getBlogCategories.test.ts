const mockFetchBlogCategories = jest.fn();

jest.mock("@/services/DataService", () => ({
    DataService: jest.fn().mockImplementation(() => ({
        fetchBlogCategories: mockFetchBlogCategories,
    })),
}));

describe("getBlogCategories", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Fresh module registry per test so React `cache()` memoization from a
        // previous test cannot mask a call to the underlying DataService.
        jest.resetModules();
    });

    it("returns the validated blog categories from DataService", async () => {
        const categories = [{ id: 1, label: "Guides", slug: "guides" }];
        mockFetchBlogCategories.mockResolvedValue(categories);

        const { getBlogCategories } = await import("../getBlogCategories");

        await expect(getBlogCategories()).resolves.toEqual(categories);
    });

    it("requests them with a 24h revalidate window and the blog categories cache tag", async () => {
        mockFetchBlogCategories.mockResolvedValue([]);

        const { getBlogCategories, BLOG_CATEGORIES_CACHE_TAG } =
            await import("../getBlogCategories");
        await getBlogCategories();

        expect(mockFetchBlogCategories).toHaveBeenCalledWith({
            revalidate: 86_400,
            tags: [BLOG_CATEGORIES_CACHE_TAG],
        });
    });
});
