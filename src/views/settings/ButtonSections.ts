import { ButtonSection } from "../../interfaces/SettingsInterfaces";
import { LANGUAGE_LANGUAGE_KEY } from "../../translations/keys/LanguageTranslationKeys";
import { SETTINGS_LANGUAGE_TITLE_KEY, SETTINGS_LOG_OUT_KEY, SETTINGS_STORE_TITLE_KEY } from "../../translations/keys/SettingsTranslationsKeys";

export const ButtonSections: ButtonSection[] = [
    {
        disabled: false,
        title: SETTINGS_STORE_TITLE_KEY,
        iconName: "home",
        navigationName: "Store"
    },
    {
        disabled: false,
        title: LANGUAGE_LANGUAGE_KEY,
        iconName: "language",
        navigationName: "ChangeLanguage"
    },
    {
        disabled: false,
        title: SETTINGS_LOG_OUT_KEY,
        iconName: "logout",
        navigationName: "Login"
    }
];