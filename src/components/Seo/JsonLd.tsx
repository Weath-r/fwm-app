type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

type JsonLdProps = {
    data: JsonLdData;
};

/**
 * Renders a schema.org JSON-LD script tag in the server-rendered HTML.
 * The `<` characters are escaped to prevent breaking out of the script tag (XSS).
 */
export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, "\\u003c"),
            }}
        />
    );
}
