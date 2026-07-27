import Link from "next/link";
import { BlogCategory } from "@/types";

type CategoryFilterPillsProps = {
    categories: BlogCategory[];
    activeSlug?: string;
};

const PILL_BASE_CLASS = "shrink-0 snap-start rounded-full px-4 py-2 text-sm transition-colors";
const ACTIVE_PILL_CLASS = "bg-primary font-semibold text-secondary";
const INACTIVE_PILL_CLASS = "bg-white font-medium text-primary/70 shadow-sm hover:bg-secondary";

export default function CategoryFilterPills({ categories, activeSlug }: CategoryFilterPillsProps) {
    return (
        <div className="mt-12 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-16 md:flex-wrap md:overflow-visible md:snap-none">
            <Link
                href="/blog"
                className={`${PILL_BASE_CLASS} ${!activeSlug ? ACTIVE_PILL_CLASS : INACTIVE_PILL_CLASS}`}
            >
                Όλα
            </Link>
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/blog?category=${category.slug}`}
                    className={`${PILL_BASE_CLASS} ${
                        activeSlug === category.slug ? ACTIVE_PILL_CLASS : INACTIVE_PILL_CLASS
                    }`}
                >
                    {category.label}
                </Link>
            ))}
        </div>
    );
}
