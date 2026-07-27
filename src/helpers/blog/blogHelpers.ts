import dayjs from "@/utils/dateTimeUtils";
import "dayjs/locale/el";
import sanitizeHtml from "sanitize-html";

const ALLOWED_CONTENT_TAGS = [
    "p",
    "h2",
    "h3",
    "h4",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "strong",
    "em",
    "b",
    "i",
    "img",
    "br",
    "span",
    "hr",
    "table",
    "col",
    "colgroup",
    "tbody",
    "tr",
    "td",
];

export const sanitizeBlogContent = (html: string): string =>
    sanitizeHtml(html, {
        allowedTags: ALLOWED_CONTENT_TAGS,
        allowedAttributes: {
            a: ["href", "target", "rel"],
            img: ["src", "alt", "width", "height"],
        },
    });

export const formatBlogDate = (date: string): string =>
    dayjs(date).locale("el").format("D MMM YYYY");

export const formatReadingTime = (minutes: number): string =>
    minutes === 1 ? "1 λεπτό ανάγνωσης" : `${minutes} λεπτά ανάγνωσης`;

const stripHtml = (html: string): string =>
    html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();

const WORDS_PER_MINUTE = 230;

export const readingTime = (content: string): number => {
    const wordCount = stripHtml(content).split(" ").filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
};

const EXCERPT_LENGTH = 160;

export const postExcerpt = (content: string): string => {
    const text = stripHtml(content);
    if (text.length <= EXCERPT_LENGTH) return text;
    const truncated = text.slice(0, EXCERPT_LENGTH);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return `${truncated.slice(0, lastSpaceIndex)}…`;
};
