const mockFetchBlogPosts = jest.fn();

jest.mock("@/services/DataService", () => ({
    DataService: jest.fn().mockImplementation(() => ({
        fetchBlogPosts: mockFetchBlogPosts,
    })),
}));

describe("getBlogPosts", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Fresh module registry per test so React `cache()` memoization from a
        // previous test cannot mask a call to the underlying DataService.
        jest.resetModules();
    });

    it("returns the validated blog posts from DataService", async () => {
        const posts = [{ id: 1, title: "Post" }];
        mockFetchBlogPosts.mockResolvedValue(posts);

        const { getBlogPosts } = await import("../getBlogPosts");

        await expect(getBlogPosts()).resolves.toEqual(posts);
    });

    it("requests them with a 1h revalidate window and the blog posts cache tag", async () => {
        mockFetchBlogPosts.mockResolvedValue([]);

        const { getBlogPosts, BLOG_POSTS_CACHE_TAG } = await import("../getBlogPosts");
        await getBlogPosts();

        expect(mockFetchBlogPosts).toHaveBeenCalledWith({
            revalidate: 3_600,
            tags: [BLOG_POSTS_CACHE_TAG],
        });
    });
});
