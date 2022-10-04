import {KeyboardTypeOptions} from 'react-native';

export interface TextField {
  label: string;
  title: string;
  attribute: string;
  keyboardType: KeyboardTypeOptions;
  secure: boolean;
  onChange: (text: string) => {};
}
