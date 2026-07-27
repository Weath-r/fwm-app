import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import { CACHE_TAGS } from "@/services/cacheTags";
import type { BlogCategory } from "@/types";

export const BLOG_CATEGORIES_CACHE_TAG = CACHE_TAGS.blogCategories;

const BLOG_CATEGORIES_REVALIDATE_SECONDS = 86_400;

export const getBlogCategories = cache(
    (): Promise<BlogCategory[]> =>
        new DataService().fetchBlogCategories({
            revalidate: BLOG_CATEGORIES_REVALIDATE_SECONDS,
            tags: [BLOG_CATEGORIES_CACHE_TAG],
        })
);
