
export interface Credentials {
    auth: string,
    password: string,
    showPassword: boolean,
    showSnackBar:boolean
}

export interface LoginErrorMessage {
    authErrorTranslationKey: string;
    passwordErrorTranslationKey: string;
}
export const initialLoginErrorMessage: LoginErrorMessage = {
    authErrorTranslationKey: '',
    passwordErrorTranslationKey: '',
}
