import {TextField} from '../../interfaces/textFieldInterface';
import {
  SIGN_UP_ADRESS_PLACEHOLDER_KEY,
  SIGN_UP_ADRESS_TITLE_KEY,
  SIGN_UP_PHONE_PLACEHOLDER_KEY,
  SIGN_UP_PHONE_TITLE_KEY,
  SIGN_UP_SHOP_NAME_PLACEHOLDER_KEY,
  SIGN_UP_SHOP_NAME_TITLE_KEY,
  SIGN_UP_USERNAME_PLACEHOLDER_KEY,
  SIGN_UP_USERNAME_TITLE_KEY,
} from '../../translations/keys/SignUpTranslationKeys';

export const StoreTextFields: TextField[] = [
  {
    label: "",
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
    label: "",
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
    label: "",
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
  }
];
