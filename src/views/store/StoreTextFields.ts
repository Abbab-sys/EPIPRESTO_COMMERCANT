import {TextField} from '../../interfaces/textFieldInterface';
import {EMPTY_KEY} from '../../translations/keys/EmptyTranslationKey';
import {
  SIGN_UP_ADRESS_TITLE_KEY,
  SIGN_UP_PHONE_TITLE_KEY,
  SIGN_UP_SHOP_NAME_TITLE_KEY,
} from '../../translations/keys/SignUpTranslationKeys';

/*
 * Name : Store Text Fields
 * Description: This file is used to initialize the text fields used in the store page.
 * Author : Alessandro van Reusel
 */

export const StoreTextFields: TextField[] = [
  {
    label: EMPTY_KEY,
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
    label: EMPTY_KEY,
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
    label: EMPTY_KEY,
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
];
