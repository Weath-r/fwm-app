// Deterministic Greek -> Latin transliteration (ELOT 743 / road-sign style), used to let
// users search Greek station names while typing in Latin characters ("Greeklish").
// It's intentionally a straightforward per-letter mapping rather than a full phonetic
// model — Fuse.js's fuzzy matching absorbs the remaining gap between this and how people
// actually type (e.g. someone typing "Stilida" against a transliterated "Stylida").

// These merge into a single voiced consonant only at the start of a word — "μπανάνα"
// becomes "banana", but mid-word (e.g. "Αταλάντη") they stay literal ("Atalanti", not
// "Atalandi"), matching how these place names are actually transliterated.
const WORD_INITIAL_DIGRAPHS: [string, string][] = [
    ["μπ", "b"],
    ["ντ", "d"],
    ["γκ", "g"],
    ["γγ", "g"],
];

// These merge the same way regardless of position in the word.
const POSITION_INDEPENDENT_DIGRAPHS: [string, string][] = [
    ["τσ", "ts"],
    ["τζ", "tz"],
    ["αυ", "av"],
    ["ευ", "ev"],
    ["ου", "ou"],
    ["ει", "ei"],
    ["οι", "oi"],
];

const SINGLE_LETTERS: Record<string, string> = {
    α: "a",
    β: "v",
    γ: "g",
    δ: "d",
    ε: "e",
    ζ: "z",
    η: "i",
    θ: "th",
    ι: "i",
    κ: "k",
    λ: "l",
    μ: "m",
    ν: "n",
    ξ: "x",
    ο: "o",
    π: "p",
    ρ: "r",
    σ: "s",
    ς: "s",
    τ: "t",
    υ: "y",
    φ: "f",
    χ: "ch",
    ψ: "ps",
    ω: "o",
};

const COMBINING_DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

export const stripDiacritics = (value: string): string =>
    value.normalize("NFD").replace(COMBINING_DIACRITICS, "");

const applyWordInitialDigraph = (word: string): string => {
    const match = WORD_INITIAL_DIGRAPHS.find(([greek]) => word.startsWith(greek));
    return match ? match[1] + word.slice(match[0].length) : word;
};

const applyPositionIndependentDigraphs = (word: string): string =>
    POSITION_INDEPENDENT_DIGRAPHS.reduce(
        (result, [greek, latin]) => result.split(greek).join(latin),
        word
    );

const transliterateWord = (word: string): string => {
    const withLeadingConsonant = applyWordInitialDigraph(word);
    const withDigraphs = applyPositionIndependentDigraphs(withLeadingConsonant);
    return withDigraphs
        .split("")
        .map((character) => SINGLE_LETTERS[character] ?? character)
        .join("");
};

export const toGreeklish = (value: string): string =>
    stripDiacritics(value).toLowerCase().split(" ").map(transliterateWord).join(" ");
