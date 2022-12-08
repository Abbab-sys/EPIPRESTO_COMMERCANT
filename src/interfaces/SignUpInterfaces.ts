/*
 * Name: Sign Up Interfaces
 * Description: This file contains all the interfaces used in the SignUp page.
 * Author: Adam Naoui-Busson, Zouhair Derouich
 */

export interface AccountInput {
  shopName: string;
  email: string;
  address: string;
  phone: string;
  username: string;
  password: string;
  shopCategory: string;
}

export interface SignUpErrorMessage {
  shopNameError: Set<string>;
  emailError: Set<string>;
  addressError: Set<string>;
  phoneError: Set<string>;
  usernameError: Set<string>;
  passwordError: Set<string>;
  verifyPasswordError: Set<string>;
  shopCategoryError: Set<string>;
}

export const initialSignUpErrorMessage: SignUpErrorMessage = {
  shopNameError: new Set(),
  emailError: new Set(),
  addressError: new Set(),
  phoneError: new Set(),
  usernameError: new Set(),
  passwordError: new Set(),
  verifyPasswordError: new Set(),
  shopCategoryError: new Set(),
};
