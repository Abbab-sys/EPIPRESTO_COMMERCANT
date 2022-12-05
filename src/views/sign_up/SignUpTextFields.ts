import {TextField} from '../../interfaces/textFieldInterface';
import {
  SIGN_UP_ADRESS_PLACEHOLDER_KEY,
  SIGN_UP_ADRESS_TITLE_KEY,
  SIGN_UP_CATEGORY_PLACEHOLDER_KEY,
  SIGN_UP_CATEGORY_TITLE_KEY,
  SIGN_UP_CONFIRM_PASSWORD_PLACEHOLDER_KEY,
  SIGN_UP_CONFIRM_PASSWORD_TITLE_KEY,
  SIGN_UP_EMAIL_PLACEHOLDER_KEY,
  SIGN_UP_EMAIL_TITLE_KEY,
  SIGN_UP_PASSWORD_PLACEHOLDER_KEY,
  SIGN_UP_PASSWORD_TITLE_KEY,
  SIGN_UP_PHONE_PLACEHOLDER_KEY,
  SIGN_UP_PHONE_TITLE_KEY,
  SIGN_UP_SHOP_NAME_PLACEHOLDER_KEY,
  SIGN_UP_SHOP_NAME_TITLE_KEY,
  SIGN_UP_USERNAME_PLACEHOLDER_KEY,
  SIGN_UP_USERNAME_TITLE_KEY,
} from '../../translations/keys/SignUpTranslationKeys';

/*
 * Name : Sign Up Text Fields
 * Description: This file is used to manage and initialiaze the state of the sign up page.
 * Author : Zouhair Derouich, Adam Naoui-Busson, Alessandro van Reusel
 */

export const SignUpTextFields: TextField[] = [
  {
    label: SIGN_UP_SHOP_NAME_PLACEHOLDER_KEY,
    title: SIGN_UP_SHOP_NAME_TITLE_KEY,
    attribute: 'shopName',
    keyboardType: 'default',
    secure: false,
    onChange: (text: string) => {
      return {
        type: 'CHANGE_SHOP_NAME',
        newShopName: text,
      };
    },
  },
  {
    label: SIGN_UP_USERNAME_PLACEHOLDER_KEY,
    title: SIGN_UP_USERNAME_TITLE_KEY,
    attribute: 'username',
    keyboardType: 'default',
    secure: false,
    onChange: (text: string) => {
      return {
        type: 'CHANGE_USERNAME',
        newUsername: text,
      };
    },
  },
  {
    label: SIGN_UP_EMAIL_PLACEHOLDER_KEY,
    title: SIGN_UP_EMAIL_TITLE_KEY,
    attribute: 'email',
    keyboardType: 'email-address',
    secure: false,
    onChange: (text: string) => {
      return {
        type: 'CHANGE_EMAIL',
        newEmail: text,
      };
    },
  },
  {
    label: SIGN_UP_CATEGORY_PLACEHOLDER_KEY,
    title: SIGN_UP_CATEGORY_TITLE_KEY,
    attribute: 'shopCategory',
    keyboardType: 'default',
    secure: false,
    onChange: (text: string) => {
      return {
        type: 'CHANGE_CATEGORY',
        newCategory: text,
      };
    },
  },
  {
    label: SIGN_UP_ADRESS_PLACEHOLDER_KEY,
    title: SIGN_UP_ADRESS_TITLE_KEY,
    attribute: 'address',
    keyboardType: 'default',
    secure: false,
    onChange: (text: string) => {
      return {
        type: 'CHANGE_ADDRESS',
        newAddress: text,
      };
    },
  },
  {
    label: SIGN_UP_PHONE_PLACEHOLDER_KEY,
    title: SIGN_UP_PHONE_TITLE_KEY,
    attribute: 'phone',
    keyboardType: 'phone-pad',
    secure: false,
    onChange: (text: string) => {
      return {
        type: 'CHANGE_PHONE',
        newPhone: text,
      };
    },
  },
  {
    label: SIGN_UP_PASSWORD_PLACEHOLDER_KEY,
    title: SIGN_UP_PASSWORD_TITLE_KEY,
    attribute: 'password',
    keyboardType: 'default',
    secure: true,
    onChange: (text: string) => {
      return {
        type: 'CHANGE_PASSWORD',
        newPassword: text,
      };
    },
  },
  {
    label: SIGN_UP_CONFIRM_PASSWORD_PLACEHOLDER_KEY,
    title: SIGN_UP_CONFIRM_PASSWORD_TITLE_KEY,
    attribute: 'verifyPassword',
    keyboardType: 'default',
    secure: true,
    onChange: (text: string) => {
      return {
        type: 'CHANGE_CONFIRM_PASSWORD',
        newConfirmPassword: text,
      };
    },
  },
];
