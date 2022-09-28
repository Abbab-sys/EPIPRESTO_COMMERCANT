import {Credentials, LoginErrorMessage} from "../../../interfaces/LoginInterfaces";

export interface LoginCredentialsReducerState {
    credentials: Credentials;
    errorMessage: LoginErrorMessage;
}

export const initialLoginCredentialsStateReducer: LoginCredentialsReducerState = {
    credentials: {
        auth: '',
        password: '',
        showPassword: false,
        showSnackBar: false
    },
    errorMessage: {
        authError: '',
        passwordError: '',
    }

}
