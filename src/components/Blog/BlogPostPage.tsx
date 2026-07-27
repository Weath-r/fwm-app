import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types";
import { assetUrl } from "@/helpers/assetsHandling";
import {
    formatBlogDate,
    formatReadingTime,
    readingTime,
    sanitizeBlogContent,
} from "@/helpers/blog/blogHelpers";
import RelatedPosts from "@/components/Blog/RelatedPosts";
import BlogShareButtons from "@/components/Blog/BlogShareButtons";
import configuration from "@/app/appConfig";

type BlogPostPageProps = {
    post: BlogPost;
    relatedPosts: BlogPost[];
};

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
    return (
        <main className="container mx-auto px-4 py-10 md:py-14">
            <nav className="mx-auto flex max-w-3xl items-center gap-2 text-sm text-primary/50">
                <Link href="/blog" className="hover:text-primary">
                    Blog
                </Link>
                <span>/</span>
                <span className="text-primary/70">{post.category.label}</span>
            </nav>

            <div className="relative mx-auto mt-6 h-64 max-w-3xl overflow-hidden rounded-2xl md:h-96">
                <Image
                    src={assetUrl(post.cover_image)}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="mx-auto mt-8 max-w-3xl">
                <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                    {post.category.label}
                </span>
                <h1 className="mt-4 text-3xl font-bold leading-tight text-primary md:text-4xl">
                    {post.title}
                </h1>
                <div className="mt-5 flex items-center gap-3 text-sm text-primary/50">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-secondary">
                        MW
                    </span>
                    <span className="font-medium text-primary/70">{post.author_name}</span>
                    <span>·</span>
                    <span>{formatBlogDate(post.published_date)}</span>
                    <span>·</span>
                    <span>{formatReadingTime(readingTime(post.content))}</span>
                </div>
            </div>

            <article className="mx-auto mt-8 max-w-3xl">
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: sanitizeBlogContent(post.content) }}
                />

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray/20 pt-6">
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-primary/60 shadow-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <BlogShareButtons
                        url={`${configuration.metadata.site_url}/blog/${post.id}/${post.slug}`}
                        title={post.title}
                    />
                </div>
            </article>

            <RelatedPosts posts={relatedPosts} />
        </main>
    );
}
