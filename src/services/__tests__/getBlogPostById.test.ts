const mockFetchBlogPostById = jest.fn();

jest.mock("@/services/DataService", () => ({
    DataService: jest.fn().mockImplementation(() => ({
        fetchBlogPostById: mockFetchBlogPostById,
    })),
}));

describe("getBlogPostById", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Fresh module registry per test so React `cache()` memoization from a
        // previous test cannot mask a call to the underlying DataService.
        jest.resetModules();
    });

    it("returns the validated blog post from DataService", async () => {
        const post = { id: 1, title: "Post" };
        mockFetchBlogPostById.mockResolvedValue(post);

        const { getBlogPostById } = await import("../getBlogPostById");

        await expect(getBlogPostById(1)).resolves.toEqual(post);
    });

    it("requests it with a 1h revalidate window and the blog post cache tag", async () => {
        mockFetchBlogPostById.mockResolvedValue(null);

        const { getBlogPostById, BLOG_POST_CACHE_TAG } = await import("../getBlogPostById");
        await getBlogPostById(1);

        expect(mockFetchBlogPostById).toHaveBeenCalledWith(1, {
            revalidate: 3_600,
            tags: [BLOG_POST_CACHE_TAG],
        });
    });
});
