/*
 * Name: Login Interfaces
 * Description: This file contains the interfaces for the login page.
 * Author: Adam Naoui-Busson
 */

export interface Credentials {
  auth: string;
  password: string;
  showPassword: boolean;
  showSnackBar: boolean;
}

export interface LoginErrorMessage {
  authError: string;
  passwordError: string;
}

export const initialLoginErrorMessage: LoginErrorMessage = {
  authError: '',
  passwordError: '',
};
