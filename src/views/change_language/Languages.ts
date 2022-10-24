import { Language } from "../../interfaces/LanguageInterface";
import { ENGLISH_LANGUAGE_KEY, FRENCH_LANGUAGE_KEY } from "../../translations/keys/LanguageTranslationKeys";

export const Languages: Language[] = [
    {
        name: ENGLISH_LANGUAGE_KEY,
        imageSource: require("../../assets/images/english.png"),
        code: "en",
    },
    {
        name: FRENCH_LANGUAGE_KEY,
        imageSource: require("../../assets/images/french.png"),
        code: "fr",
    }

];