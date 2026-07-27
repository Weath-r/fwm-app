import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types";
import { assetUrl } from "@/helpers/assetsHandling";
import { formatReadingTime, readingTime } from "@/helpers/blog/blogHelpers";

type RelatedPostsProps = {
    posts: BlogPost[];
};

export default function RelatedPosts({ posts }: RelatedPostsProps) {
    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto mt-16 max-w-5xl">
            <h2 className="mb-6 text-2xl font-bold text-primary">Σχετικά άρθρα</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {posts.map((post) => {
                    const href = `/blog/${post.id}/${post.slug}`;
                    return (
                        <article
                            key={post.id}
                            className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                        >
                            <Link href={href} className="relative block h-36 overflow-hidden">
                                <Image
                                    src={assetUrl(post.cover_image)}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                            </Link>
                            <div className="flex flex-1 flex-col gap-2 p-4">
                                <h3 className="text-sm font-bold leading-snug text-primary">
                                    <Link
                                        href={href}
                                        className="transition-colors group-hover:text-accent"
                                    >
                                        {post.title}
                                    </Link>
                                </h3>
                                <span className="text-xs text-primary/50">
                                    {formatReadingTime(readingTime(post.content))}
                                </span>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
