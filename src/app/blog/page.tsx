import BlogIndexPage from "@/components/Blog/BlogIndexPage";
import { getBlogPosts } from "@/services/getBlogPosts";

type BlogPageProps = {
    searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const [{ category }, posts] = await Promise.all([searchParams, getBlogPosts()]);

    return <BlogIndexPage posts={posts} activeCategorySlug={category} />;
}
