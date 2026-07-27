import { z } from "zod";

export const BlogCategorySchema = z.object({
    id: z.number().min(1),
    label: z.string().min(1),
    slug: z.string().min(1),
});

export const BlogPostSchema = z.object({
    id: z.number().min(1),
    slug: z.string().min(1),
    title: z.string().min(1),
    published_date: z.string().min(1),
    featured: z.boolean(),
    tags: z.array(z.string()).nullable(),
    cover_image: z.string().min(1),
    content: z.string().min(1),
    author_name: z.string(),
    category: BlogCategorySchema,
});

export const BlogCategoriesResponsesSchema = z.array(BlogCategorySchema);
export const BlogPostsResponsesSchema = z.array(BlogPostSchema);
