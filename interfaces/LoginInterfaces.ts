
export interface Credentials {
    auth: string,
    password: string,
    showPassword: boolean,
    showSnackBar:boolean
}

export interface LoginErrorMessage {
    authError: string;
    passwordError: string;
}
export const initialLoginErrorMessage: LoginErrorMessage = {
    authError: '',
    passwordError: '',
}
