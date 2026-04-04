import { translatedContent } from "../transformTranslations";

describe("transformTranslations", () => {
    describe("translatedContent", () => {
        it("should return translated content for selected language", () => {
            const data = [
                {
                    id: 1,
                    label: "Default Label",
                    translations: [
                        { languages_code: "en", name: "English Name" },
                        { languages_code: "el", name: "Greek Name" },
                    ],
                },
            ];

            const result = translatedContent({ data, selectedLanguage: "en" });

            expect(result[0].label).toBe("English Name");
        });

        it("should handle multiple items with different translations", () => {
            const data = [
                {
                    id: 1,
                    label: "Default 1",
                    translations: [
                        { languages_code: "en", name: "English 1" },
                        { languages_code: "el", name: "Greek 1" },
                    ],
                },
                {
                    id: 2,
                    label: "Default 2",
                    translations: [
                        { languages_code: "en", name: "English 2" },
                        { languages_code: "el", name: "Greek 2" },
                    ],
                },
            ];

            const result = translatedContent({ data, selectedLanguage: "el" });

            expect(result.length).toBe(2);
            expect(result[0].label).toBe("Greek 1");
            expect(result[1].label).toBe("Greek 2");
        });

        it("should use default label if translation not found", () => {
            const data = [
                {
                    id: 1,
                    label: "Default Label",
                    translations: [
                        { languages_code: "en", name: "English Name" },
                        { languages_code: "el", name: "Greek Name" },
                    ],
                },
            ];

            const result = translatedContent({ data, selectedLanguage: "fr" });

            expect(result[0].label).toBe("Default Label");
        });

        it("should preserve other properties of data", () => {
            const data = [
                {
                    id: 1,
                    label: "Default",
                    asset: "icon.png",
                    color: "#FF0000",
                    value: "test-value",
                    translations: [{ languages_code: "en", name: "English" }],
                },
            ];

            const result = translatedContent({ data, selectedLanguage: "en" });

            expect(result[0].id).toBe(1);
            expect(result[0].asset).toBe("icon.png");
            expect(result[0].color).toBe("#FF0000");
            expect(result[0].value).toBe("test-value");
        });

        it("should handle empty translations array", () => {
            const data = [
                {
                    id: 1,
                    label: "Default Label",
                    translations: [],
                },
            ];

            const result = translatedContent({ data, selectedLanguage: "en" });

            expect(result[0].label).toBe("Default Label");
        });

        it("should handle optional properties in data", () => {
            const data = [
                {
                    label: "Label without ID",
                    translations: [{ languages_code: "en", name: "English" }],
                },
                {
                    id: 2,
                    label: "Label with ID",
                    translations: [{ languages_code: "en", name: "English 2" }],
                },
            ];

            const result = translatedContent({ data, selectedLanguage: "en" });

            expect(result.length).toBe(2);
            expect(result[0].label).toBe("English");
            expect(result[1].label).toBe("English 2");
        });

        it("should handle multiple languages in same data item", () => {
            const data = [
                {
                    id: 1,
                    label: "Default",
                    translations: [
                        { languages_code: "en", name: "English" },
                        { languages_code: "el", name: "Ελληνικά" },
                        { languages_code: "fr", name: "Français" },
                        { languages_code: "de", name: "Deutsch" },
                    ],
                },
            ];

            const resultEn = translatedContent({ data, selectedLanguage: "en" });
            const resultEl = translatedContent({ data, selectedLanguage: "el" });
            const resultFr = translatedContent({ data, selectedLanguage: "fr" });
            const resultDe = translatedContent({ data, selectedLanguage: "de" });

            expect(resultEn[0].label).toBe("English");
            expect(resultEl[0].label).toBe("Ελληνικά");
            expect(resultFr[0].label).toBe("Français");
            expect(resultDe[0].label).toBe("Deutsch");
        });

        it("should not mutate original data", () => {
            const originalData = [
                {
                    id: 1,
                    label: "Original Label",
                    translations: [{ languages_code: "en", name: "English" }],
                },
            ];

            const dataCopy = JSON.parse(JSON.stringify(originalData));

            translatedContent({ data: originalData, selectedLanguage: "en" });

            expect(originalData).toEqual(dataCopy);
        });

        it("should return array of same length as input", () => {
            const data = Array.from({ length: 5 }, (_, i) => ({
                id: i,
                label: `Label ${i}`,
                translations: [{ languages_code: "en", name: `Name ${i}` }],
            }));

            const result = translatedContent({ data, selectedLanguage: "en" });

            expect(result.length).toEqual(data.length);
        });
    });
});
