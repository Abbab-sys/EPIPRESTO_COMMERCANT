import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SegmentedButtons} from 'react-native-paper';
import {
  ENGLISH_LANGUAGE_KEY,
  FRENCH_LANGUAGE_KEY,
} from '../../translations/keys/LanguageTranslationKeys';
import {LanguageSelectorStyles} from './LanguageSelectorStyles';

/*
 * Name: Language Selector
 * Description: This component is used to select the language of the app.
 * Author: Adam Naoui-Busson
 */

const LanguageSelector = () => {
  const {t: translation, i18n} = useTranslation('translation');
  const [value, setValue] = React.useState<string>('fr');

  // Use effect to change the language in the application when the value changes
  useEffect(() => {
    i18n.changeLanguage(value);
  }, [i18n, value]);
  return (
    <SegmentedButtons
      style={LanguageSelectorStyles.languageSelector}
      value={value}
      onValueChange={setValue}
      buttons={[
        {
          value: 'fr',
          label: translation(FRENCH_LANGUAGE_KEY),
          icon: require('../../assets/images/french.png'),
        },
        {
          value: 'en',
          label: translation(ENGLISH_LANGUAGE_KEY),
          icon: require('../../assets/images/english.png'),
        },
      ]}
    />
  );
};

export default LanguageSelector;
