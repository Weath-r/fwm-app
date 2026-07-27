import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import { CACHE_TAGS } from "@/services/cacheTags";
import type { BlogPost } from "@/types";

export const BLOG_POSTS_CACHE_TAG = CACHE_TAGS.blogPosts;

const BLOG_POSTS_REVALIDATE_SECONDS = 3_600;

export const getBlogPosts = cache(
    (): Promise<BlogPost[]> =>
        new DataService().fetchBlogPosts({
            revalidate: BLOG_POSTS_REVALIDATE_SECONDS,
            tags: [BLOG_POSTS_CACHE_TAG],
        })
);
