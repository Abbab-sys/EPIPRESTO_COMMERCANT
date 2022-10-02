import {LoginCredentialsStateReducerAction} from "./LoginCredentialsReducerActions"
import {LoginCredentialsReducerState} from "./LoginCredentialsReducerState";
import {initialLoginErrorMessage} from "../../../interfaces/LoginInterfaces";
import {LOGIN_EMAIL_ERROR_KEY, LOGIN_PASSWORD_ERROR_KEY} from "../../../translations/keys/LoginTranslationKeys";

export function loginCredentialsReducer(state: LoginCredentialsReducerState, action: LoginCredentialsStateReducerAction): LoginCredentialsReducerState {
    switch (action.type) {
        case 'CHANGE_AUTH':
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    auth: action.newAuth
                },
                errorMessage: {
                    ...state.errorMessage,
                    authError: ''
                }
            }
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    password: action.newPassword
                },
                errorMessage: {
                    ...state.errorMessage,
                    passwordError: ''
                }
            }
        case 'CHANGE_PASSWORD_VISIBILITY':
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    showPassword: action.showPassword
                }
            }
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
                errorMessage: errorMessage
            }
        case 'CHANGE_SNACKBAR_VISIBILITY':
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    showSnackBar: action.showSnackBar
                }
            }
        default:
            return state;
    }
}



