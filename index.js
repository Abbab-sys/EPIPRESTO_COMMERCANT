/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {
    en,
    fr,  
    registerTranslation,
  } from 'react-native-paper-dates'

AppRegistry.registerComponent(appName, () => App);
registerTranslation('fr', fr)
registerTranslation('en', en)
