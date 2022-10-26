import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TitleSyles } from "../../Styles/TitleStyles";
import { SETTINGS_LANGUAGE_TITLE_KEY} from "../../translations/keys/SettingsTranslationsKeys";
import { Languages } from "./Languages";
import { ChangeLanguageStyles } from "./ChangeLanguageStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangeLanguage = ({navigation}: any) => {

    const {t: translation, i18n} = useTranslation('translation');

    return (
       <SafeAreaView>
            <View style={[TitleSyles.View, ChangeLanguageStyles.titleView]}>
            <TouchableOpacity
                  style={ChangeLanguageStyles.back_button}
                  onPress={() => navigation.goBack()}>
                  <Image
                    style={ChangeLanguageStyles.back_button_icon}
                    source={require('../../assets/icons/back.png')}
                  />
                </TouchableOpacity>
                <Text style={TitleSyles.Text}>{translation(SETTINGS_LANGUAGE_TITLE_KEY)}</Text>
            </View>
            <View>
                {Languages.map((section, index) => (
                    <View style={ChangeLanguageStyles.buttonView} key={index}>
                        <TouchableOpacity
                                style={[ChangeLanguageStyles.button, {backgroundColor: i18n.language === section.code ? 'green' : '#D9D9D9'}]}
                                activeOpacity={0.5}
                                onPress={() => i18n.changeLanguage(section.code)}
                                >
                            <Image
                                source={section.imageSource}
                                style={ChangeLanguageStyles.buttonImageIconStyle}
                            />
                            <Text style={ChangeLanguageStyles.buttonTextStyle}>{translation(section.name)}</Text>
                        </TouchableOpacity> 
                    </View>
                ))}
            </View>
       </SafeAreaView>
    );
}

export default ChangeLanguage;