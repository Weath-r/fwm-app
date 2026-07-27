import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types";
import { assetUrl } from "@/helpers/assetsHandling";
import {
    formatBlogDate,
    formatReadingTime,
    postExcerpt,
    readingTime,
} from "@/helpers/blog/blogHelpers";

type BlogPostCardProps = {
    post: BlogPost;
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
    const href = `/blog/${post.id}/${post.slug}`;

    return (
        <article className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
            <Link href={href} className="relative block h-44 overflow-hidden">
                <Image
                    src={assetUrl(post.cover_image)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary">
                    {post.category.label}
                </span>
            </Link>
            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center gap-2 text-xs text-primary/50">
                    <span>{formatBlogDate(post.published_date)}</span>
                    <span>·</span>
                    <span>{formatReadingTime(readingTime(post.content))}</span>
                </div>
                <h3 className="text-lg font-bold leading-snug text-primary">
                    <Link href={href} className="transition-colors group-hover:text-accent">
                        {post.title}
                    </Link>
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-primary/60">
                    {postExcerpt(post.content)}
                </p>
                <Link href={href} className="mt-auto text-sm font-semibold text-accent">
                    Διαβάστε περισσότερα
                </Link>
            </div>
        </article>
    );
}
