import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import { CACHE_TAGS } from "@/services/cacheTags";
import type { BlogPost } from "@/types";

export const BLOG_POST_CACHE_TAG = CACHE_TAGS.blogPosts;

const BLOG_POST_REVALIDATE_SECONDS = 3_600;

export const getBlogPostById = cache(
    (id: number): Promise<BlogPost | null> =>
        new DataService().fetchBlogPostById(id, {
            revalidate: BLOG_POST_REVALIDATE_SECONDS,
            tags: [BLOG_POST_CACHE_TAG],
        })
);
