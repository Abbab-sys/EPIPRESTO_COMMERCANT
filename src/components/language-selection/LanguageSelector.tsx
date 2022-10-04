import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {TextField} from '../../interfaces/textFieldInterface';
import {SegmentedButtons} from 'react-native-paper';
import {
  ENGLISH_LANGUAGE_KEY,
  FRENCH_LANGUAGE_KEY,
} from '../../translations/keys/LanguageTranslationKeys';
import {LanguageSelectorStyles} from './LanguageSelectorStyles';

const LanguageSelector = () => {
  const {t: translation, i18n} = useTranslation('translation');
  const [value, setValue] = React.useState<string>('fr');

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
