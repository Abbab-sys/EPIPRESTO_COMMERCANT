import { LOGIN_EMAIL_PLACEHOLDER_KEY, LOGIN_EMAIL_TITLE_KEY, LOGIN_PASSWORD_PLACEHOLDER_KEY, LOGIN_PASSWORD_TITLE_KEY } from "../../translations/keys/LoginTranslationKeys";

export const fieldsArray = [
    {
      attribute: "auth",
      title: LOGIN_EMAIL_TITLE_KEY,
      label: LOGIN_EMAIL_PLACEHOLDER_KEY,
      keyboardType: "default",
      secure: false,
      onChange: (text: string) => {
        return {
          type: "CHANGE_AUTH",
          payload: text
        }
      }
    },
    {
      attribute: "password",
      title: LOGIN_PASSWORD_TITLE_KEY,
      label: LOGIN_PASSWORD_PLACEHOLDER_KEY,
      keyboardType: "default",
      secure: true,
      onChange: (text: string) => {
        return {
          type: "CHANGE_PASSWORD",
          payload: text
        }
      }
    }
  ];