import {LoginCredentialsStateReducerAction} from './LoginCredentialsReducerActions';
import {
  initialLoginCredentialsStateReducer,
  LoginCredentialsReducerState,
} from './LoginCredentialsReducerState';
import {initialLoginErrorMessage} from '../../../interfaces/LoginInterfaces';
import {
  LOGIN_EMAIL_ERROR_KEY,
  LOGIN_PASSWORD_ERROR_KEY,
} from '../../../translations/keys/LoginTranslationKeys';

/*
 * Name: Login Credentials Reducer
 * Description: This file contains the reducer for the login credentials.
 * Author: Zouhair Derouich, Adam Naoui-Busson
 */

export function loginCredentialsReducer(
  state: LoginCredentialsReducerState,
  action: LoginCredentialsStateReducerAction,
): LoginCredentialsReducerState {
  switch (action.type) {
    // Change the auth value in the state
    case 'CHANGE_AUTH':
      return {
        ...state,
        credentials: {
          ...state.credentials,
          auth: action.newAuth,
        },
        errorMessage: {
          ...state.errorMessage,
          authError: '',
        },
      };
    // Change the password value in the state
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        credentials: {
          ...state.credentials,
          password: action.newPassword,
        },
        errorMessage: {
          ...state.errorMessage,
          passwordError: '',
        },
      };
    // Change the visibility of the password field
    case 'CHANGE_PASSWORD_VISIBILITY':
      return {
        ...state,
        credentials: {
          ...state.credentials,
          showPassword: action.showPassword,
        },
      };
    // Check if the login credentials are valid
    case 'CHECK_LOGIN_CREDENTIALS':
      const errorMessage = {...initialLoginErrorMessage};
      if (state.credentials.auth === '') {
        errorMessage.authError = LOGIN_EMAIL_ERROR_KEY;
      }
      if (state.credentials.password === '') {
        errorMessage.passwordError = LOGIN_PASSWORD_ERROR_KEY;
      }
      return {
        ...state,
        errorMessage: errorMessage,
      };
    // Change the visibility of the snackbar
    case 'CHANGE_SNACKBAR_VISIBILITY':
      return {
        ...state,
        credentials: {
          ...state.credentials,
          showSnackBar: action.showSnackBar,
        },
      };
    // Reset the login credentials
    case 'RESET_CREDENTIALS':
      return {
        ...initialLoginCredentialsStateReducer,
      };
    default:
      return state;
  }
}
