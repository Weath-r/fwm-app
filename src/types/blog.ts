export type BlogCategory = {
    id: number;
    label: string;
    slug: string;
};

export type BlogPost = {
    id: number;
    slug: string;
    title: string;
    published_date: string;
    featured: boolean;
    tags: string[] | null;
    cover_image: string;
    content: string;
    author_name: string;
    category: BlogCategory;
};
