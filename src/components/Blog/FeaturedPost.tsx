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

type FeaturedPostProps = {
    post: BlogPost;
};

export default function FeaturedPost({ post }: FeaturedPostProps) {
    const href = `/blog/${post.id}/${post.slug}`;

    return (
        <article className="group relative mt-10 overflow-hidden rounded-2xl bg-primary shadow-xl md:mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <Link href={href} className="relative block h-64 overflow-hidden md:h-full">
                    <Image
                        src={assetUrl(post.cover_image)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-primary/50"></div>
                </Link>
                <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
                    <span className="w-fit rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary">
                        {post.category.label}
                    </span>
                    <h2 className="text-2xl font-bold leading-tight text-secondary md:text-3xl">
                        <Link href={href} className="transition-colors hover:text-accent">
                            {post.title}
                        </Link>
                    </h2>
                    <p className="leading-relaxed text-secondary/70">{postExcerpt(post.content)}</p>
                    <div className="flex items-center gap-2 text-sm text-secondary/50">
                        <span>{formatBlogDate(post.published_date)}</span>
                        <span>·</span>
                        <span>{formatReadingTime(readingTime(post.content))}</span>
                    </div>
                    <Link
                        href={href}
                        className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-accent/90"
                    >
                        Διαβάστε το άρθρο
                    </Link>
                </div>
            </div>
        </article>
    );
}
