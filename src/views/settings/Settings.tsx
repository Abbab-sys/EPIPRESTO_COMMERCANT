
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from "react-native-paper";
import { ButtonSections } from "./ButtonSections";
import { SettingsStyles } from "./SettingsStyles";
import { SETTINGS_TITLE_KEY } from "../../translations/keys/SettingsTranslationsKeys";



const Settings = () => {

    const {t: translation} = useTranslation('translation');

    return (
        <View>
            <View style={SettingsStyles.titleView}>
                <Text style={SettingsStyles.title}>{translation(SETTINGS_TITLE_KEY)}</Text>
            </View>
            <View>
                {ButtonSections.map((section, index) => (
                    <View style={SettingsStyles.buttonView} key={index}>
                        <Icon.Button name={section.iconName} color='#000000' onPress={section.onPress} size={50} borderRadius={10} style={SettingsStyles.button}>
                            <Text style={SettingsStyles.buttonText}>{translation(section.title)}</Text>
                        </Icon.Button>
                    </View>
                ))}
            </View>
        </View>
    );
}

export default Settings;