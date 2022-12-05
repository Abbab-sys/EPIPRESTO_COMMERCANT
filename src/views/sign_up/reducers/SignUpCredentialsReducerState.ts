/*
 * Name : Store Credentials Reducer State
 * Description: This file is used to manage and initialiaze the state of the store credentials page.
 * Author : Zouhair Derouich
 */

import {
  AccountInput,
  initialSignUpErrorMessage,
  SignUpErrorMessage,
} from '../../../interfaces/SignUpInterfaces';

export interface SignUpCredentialsReducerState {
  verifyPassword: string;
  accountInput: AccountInput;
  signUpErrorMessage: SignUpErrorMessage;
}

export const initialSignUpCredentialsState: SignUpCredentialsReducerState = {
  verifyPassword: '',
  accountInput: {
    shopName: '',
    email: '',
    address: '',
    phone: '',
    username: '',
    password: '',
    shopCategory: '',
  },
  signUpErrorMessage: {
    ...initialSignUpErrorMessage,
  },
};
