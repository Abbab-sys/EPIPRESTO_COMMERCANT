import {ImageSourcePropType} from 'react-native';

/*
 * Name: Language Interface
 * Description: This file contains the interface for the language component.
 * Author: Alessandro van Reusel
 */

export interface Language {
  name: string;
  imageSource: ImageSourcePropType;
  code: string;
}
