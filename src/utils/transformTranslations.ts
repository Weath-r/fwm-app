type GeneralType = {
    id?: number;
    label: string;
    asset?: string;
    color?: string;
    value?: string;
    translations: {
        languages_code: string;
        name: string;
    }[];
};

type TranslatedContentType = {
    data: GeneralType[];
    selectedLanguage: string;
};

export const translatedContent = ({ data, selectedLanguage }: TranslatedContentType) => {
    return data.map(elem => {
        const translatedLabel = elem.translations.find(t => t.languages_code === selectedLanguage);
        return {
            ...elem,
            label: translatedLabel?.name || elem.label,
        };
    });
};