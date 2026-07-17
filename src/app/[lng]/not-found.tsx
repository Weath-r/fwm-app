import { getT } from "@/i18n";
import NotFoundPage from "@/components/NotFound/NotFoundPage";

export default async function NotFound() {
    const { t, i18n } = await getT("notFound");
    return <NotFoundPage lng={i18n.language} t={t} />;
}
