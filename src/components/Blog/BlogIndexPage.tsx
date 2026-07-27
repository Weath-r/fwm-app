import FeaturedPost from "@/components/Blog/FeaturedPost";
import CategoryFilterPills from "@/components/Blog/CategoryFilterPills";
import BlogPostCard from "@/components/Blog/BlogPostCard";
import { BlogCategory, BlogPost } from "@/types";

type BlogIndexPageProps = {
    posts: BlogPost[];
    activeCategorySlug?: string;
};

function uniqueCategories(posts: BlogPost[]): BlogCategory[] {
    const seenCategoryIds = new Set<number>();
    const categories: BlogCategory[] = [];
    posts.forEach((post) => {
        if (!seenCategoryIds.has(post.category.id)) {
            seenCategoryIds.add(post.category.id);
            categories.push(post.category);
        }
    });
    return categories;
}

export default function BlogIndexPage({ posts, activeCategorySlug }: BlogIndexPageProps) {
    const categories = uniqueCategories(posts);
    const filteredPosts = activeCategorySlug
        ? posts.filter((post) => post.category.slug === activeCategorySlug)
        : posts;
    const featuredPost = activeCategorySlug
        ? null
        : (posts.find((post) => post.featured) ?? posts[0] ?? null);
    const gridPosts = featuredPost
        ? filteredPosts.filter((post) => post.id !== featuredPost.id)
        : filteredPosts;

    return (
        <main className="container mx-auto px-4 py-10 md:py-14">
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-3xl font-bold leading-tight text-primary md:text-4xl">
                    Καιρός, δεδομένα και οδηγοί για την Φθιώτιδα
                </h1>
                <p className="mt-3 text-base leading-relaxed text-primary/60">
                    Αναλύσεις, εποχιακές προβλέψεις και πρακτικοί οδηγοί βασισμένοι σε πραγματικούς
                    σταθμούς! Για να καταλαβαίνετε τον καιρό του τόπου μας, όχι μόνο να τον βλέπετε.
                </p>
            </div>

            {featuredPost && <FeaturedPost post={featuredPost} />}

            <CategoryFilterPills categories={categories} activeSlug={activeCategorySlug} />

            <h2 className="mt-8 text-xl font-bold text-primary">Πρόσφατα άρθρα</h2>
            {gridPosts.length > 0 ? (
                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gridPosts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="mt-5 rounded-xl bg-white p-8 text-center text-sm text-primary/60 shadow-sm">
                    {activeCategorySlug
                        ? "Δεν υπάρχουν ακόμη άρθρα σε αυτή την κατηγορία."
                        : "Δεν υπάρχουν ακόμη άλλα άρθρα."}
                </p>
            )}
        </main>
    );
}
