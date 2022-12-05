import {KeyboardTypeOptions} from 'react-native';

/*
 * Name: Text Field Interface
 * Description: This file contains the interface for the text field component.
 * Author: Adam Naoui-Busson
 */

export interface TextField {
  label: string;
  title: string;
  attribute: string;
  keyboardType: KeyboardTypeOptions;
  secure: boolean;
  onChange: (text: string) => {};
}
