import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ButtonSections} from './ButtonSections';
import {SettingsStyles} from './SettingsStyles';
import {SETTINGS_TITLE_KEY} from '../../translations/keys/SettingsTranslationsKeys';
import {TitleSyles} from '../../Styles/TitleStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {VendorContext} from '../../context/Vendor';
import {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
 * Name: Settings
 * Description: This file contains the settings page to change the language, log out and modify the store.
 * Author: Alessandro van Reusel, Zouhair Derouich, Khalil Zriba
 */

const Settings = ({navigation}: any) => {
  const {t: translation} = useTranslation('translation');

  const {storeId} = useContext(VendorContext);
  // Use Effect to check if the user is logged in
  useEffect(() => {
    if (!storeId) {
      navigation.replace('Login');
    }
  }, [storeId]);

  // Handle the log out
  const handleLogout = () => {
    AsyncStorage.setItem('@storeId', '').then(r =>
      {}
    );
    AsyncStorage.setItem('@isAdmin', '').then(r =>
      {}
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EAEAEA'}}>
      <View style={TitleSyles.view}>
        <Text style={TitleSyles.headline}>
          {translation(SETTINGS_TITLE_KEY)}
        </Text>
      </View>
      <View>
        {ButtonSections.map((section, index) => (
          <View style={SettingsStyles.buttonView} key={index}>
            <Icon.Button
              name={section.iconName}
              color="#FFA500"
              onPress={
                section.navigationName === 'Login'
                  ? () => handleLogout()
                  : () => navigation.navigate(section.navigationName)
              }
              size={50}
              borderRadius={10}
              style={SettingsStyles.button}>
              <Text style={SettingsStyles.buttonText}>
                {translation(section.title)}
              </Text>
            </Icon.Button>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Settings;
