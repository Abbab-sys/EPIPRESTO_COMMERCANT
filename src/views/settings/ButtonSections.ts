import { ButtonSection } from "../../interfaces/SettingsInterfaces";
import { LANGUAGE_LANGUAGE_KEY } from "../../translations/keys/LanguageTranslationKeys";
import { SETTINGS_LOG_OUT_KEY, SETTINGS_STORE_TITLE_KEY } from "../../translations/keys/SettingsTranslationsKeys";

/*
* Name : Button Sections
* Description : This file contains the button sections for the settings page
* Author : Alessandro van Reusel, Zouhair Derouich, Khalil Zriba
*/

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