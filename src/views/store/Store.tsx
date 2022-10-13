import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { TitleSyles } from "../../Styles/TitleStyles";
import { SETTINGS_STORE_TITLE_KEY } from "../../translations/keys/SettingsTranslationsKeys";
import { StoreStyles } from "./StoreStyles";

const Store = () => {

    const {t: translation} = useTranslation('translation');

    return (
       <View>
            <View style={TitleSyles.View}>
                <Text style={TitleSyles.Text}>{translation(SETTINGS_STORE_TITLE_KEY)}</Text>
            </View>
       </View>
    );
}

export default Store;