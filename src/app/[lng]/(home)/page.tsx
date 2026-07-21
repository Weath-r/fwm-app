import Homepage from "./page.homepage";

export const dynamic = "force-dynamic";

export default async function Home({ params }: { params: Promise<{ lng: string }> }) {
    const { lng } = await params;
    return <Homepage lng={lng} />;
}
