import {Language} from '../../interfaces/LanguageInterface';
import {
  ENGLISH_LANGUAGE_KEY,
  FRENCH_LANGUAGE_KEY,
} from '../../translations/keys/LanguageTranslationKeys';

/*
 * Name: Languages
 * Description: This file contains the list of languages that are supported by the app.
 * Author: Alessandro van Reusel
 */

export const Languages: Language[] = [
  {
    name: ENGLISH_LANGUAGE_KEY,
    imageSource: require('../../assets/images/english.png'),
    code: 'en',
  },
  {
    name: FRENCH_LANGUAGE_KEY,
    imageSource: require('../../assets/images/french.png'),
    code: 'fr',
  },
];
