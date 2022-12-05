import {TextField} from '../../interfaces/textFieldInterface';
import {
  LOGIN_EMAIL_LABEL_KEY,
  LOGIN_EMAIL_TITLE_KEY,
  LOGIN_PASSWORD_LABEL_KEY,
  LOGIN_PASSWORD_TITLE_KEY,
} from '../../translations/keys/LoginTranslationKeys';

/*
 * Name: Login Text Fields
 * Description: This file contains all text fields for the login screen.
 * Author: Zouhair Derouich, Adam Naoui-Busson
 */

export const LoginTextField: TextField[] = [
  {
    attribute: 'auth',
    title: LOGIN_EMAIL_TITLE_KEY,
    label: LOGIN_EMAIL_LABEL_KEY,
    keyboardType: 'default',
    secure: false,
    onChange: (text: string) => {
      return {
        type: 'CHANGE_AUTH',
        newAuth: text,
      };
    },
  },
  {
    attribute: 'password',
    title: LOGIN_PASSWORD_TITLE_KEY,
    label: LOGIN_PASSWORD_LABEL_KEY,
    keyboardType: 'default',
    secure: true,
    onChange: (text: string) => {
      return {
        type: 'CHANGE_PASSWORD',
        newPassword: text,
      };
    },
  },
];
