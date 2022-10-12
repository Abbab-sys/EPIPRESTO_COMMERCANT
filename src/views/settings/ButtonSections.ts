import { ButtonSection } from "../../interfaces/SettingsInterfaces";
import { SETTINGS_LANGUAGE_TITLE_KEY, SETTINGS_STORE_TITLE_KEY } from "../../translations/keys/SettingsTranslationsKeys";

export const ButtonSections: ButtonSection[] = [
    {
        disabled: false,
        title: SETTINGS_STORE_TITLE_KEY,
        iconName: "home",
        onPress:  async () => console.log("Hello World")
    },
    {
        disabled: false,
        title: SETTINGS_LANGUAGE_TITLE_KEY,
        iconName: "language",
        onPress:  async () => console.log("Hello World")
    }

];