import {
  Credentials,
  LoginErrorMessage,
} from '../../../interfaces/LoginInterfaces';

/*
* Name: Login Credentials Reducer State
* Description: This file contains the state and the initial state for the login credentials reducer.
* Author: Zouhair Derouich, Adam Naoui-Busson
*/
export interface LoginCredentialsReducerState {
  credentials: Credentials;
  errorMessage: LoginErrorMessage;
}

export const initialLoginCredentialsStateReducer: LoginCredentialsReducerState =
  {
    credentials: {
      auth: '',
      password: '',
      showPassword: false,
      showSnackBar: false,
    },
    errorMessage: {
      authError: '',
      passwordError: '',
    },
  };
  