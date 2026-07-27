import { notFound } from "next/navigation";
import BlogPostPage from "@/components/Blog/BlogPostPage";
import { getBlogPostById } from "@/services/getBlogPostById";
import { getBlogPosts } from "@/services/getBlogPosts";
import { postExcerpt } from "@/helpers/blog/blogHelpers";
import { assetUrl } from "@/helpers/assetsHandling";
import configuration from "@/app/appConfig";

type BlogPostRouteProps = {
    params: Promise<{ id: string; slug: string }>;
};

export async function generateMetadata({ params }: BlogPostRouteProps) {
    const { id } = await params;
    const post = await getBlogPostById(+id);

    if (!post) {
        return {};
    }

    const description = postExcerpt(post.content);

    return {
        title: post.title,
        description,
        openGraph: {
            title: post.title,
            description,
            url: `${configuration.metadata.site_url}/blog/${post.id}/${post.slug}`,
            siteName: configuration.metadata.site_name,
            images: [{ url: assetUrl(post.cover_image) }],
            locale: "el",
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description,
            images: [assetUrl(post.cover_image)],
        },
    };
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
    const { id } = await params;
    const [post, allPosts] = await Promise.all([getBlogPostById(+id), getBlogPosts()]);

    if (!post) {
        notFound();
    }

    const relatedPosts = allPosts
        .filter(
            (candidate) => candidate.id !== post.id && candidate.category.id === post.category.id
        )
        .slice(0, 3);

    return <BlogPostPage post={post} relatedPosts={relatedPosts} />;
}
