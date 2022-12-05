import {SignUpCredentialsReducerState} from './SignUpCredentialsReducerState';
import {SignUpCredentialsReducerActions} from './SignUpCredentialsReducerActions';
import {initialSignUpErrorMessage} from '../../../interfaces/SignUpInterfaces';
import {
  SIGN_UP_ADRESS_ERROR_FORMAT_KEY,
  SIGN_UP_ADRESS_ERROR_MESSAGE_KEY,
  SIGN_UP_CATEGORY_ERROR_EMPTY_KEY,
  SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY,
  SIGN_UP_EMAIL_ERROR_EMPTY_KEY,
  SIGN_UP_EMAIL_ERROR_FORMAT_ERROR_KEY,
  SIGN_UP_EMAIL_ERROR_USED_KEY,
  SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY,
  SIGN_UP_PHONE_ERROR_MESSAGE_KEY,
  SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY,
  SIGN_UP_USERNAME_ERROR_EMPTY_KEY,
  SIGN_UP_USERNAME_ERROR_USED_KEY,
} from '../../../translations/keys/SignUpTranslationKeys';
/*
 * Name : Store Credentials Reducer
 * Description: This file is used to manage the state of the store credentials page.
 * Author : Adam Naoui-Busson, Zouhair Derouich, Khalil Zriba
 */
export function signUpCredentialsReducer(
  state: SignUpCredentialsReducerState,
  action: SignUpCredentialsReducerActions,
): SignUpCredentialsReducerState {
  switch (action.type) {
    // Change shop name
    case 'CHANGE_SHOP_NAME': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.shopNameError,
        SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY,
        action.newShopName === '',
      );
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          shopName: action.newShopName,
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          shopNameError: errorMessage.shopNameError,
        },
      };
    }
    // Change email
    case 'CHANGE_EMAIL': {
      const errorMessage = {...initialSignUpErrorMessage};
      const emailFormatIsInvalid =
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(action.newEmail);
      manageError(
        errorMessage.emailError,
        SIGN_UP_EMAIL_ERROR_FORMAT_ERROR_KEY,
        emailFormatIsInvalid,
      );
      manageError(
        errorMessage.emailError,
        SIGN_UP_EMAIL_ERROR_EMPTY_KEY,
        action.newEmail === '',
      );
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          email: action.newEmail.toLowerCase(),
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          emailError: errorMessage.emailError,
        },
      };
    }
    // Change address
    case 'CHANGE_ADDRESS': {
      const errorMessage = {...initialSignUpErrorMessage};
      
      const adressFormatIsInvalid =
        !/[0-9]+\s*[A-Z][a-z]+\s*[A-Z][a-z]+,\s*[A-Z][a-z]+,\s*[A-Z]{2},\s*[A-Z][1-9][A-Z]\s[1-9][A-Z][1-9]/i.test(action.newAddress);

        manageError(
          errorMessage.addressError,
          SIGN_UP_ADRESS_ERROR_FORMAT_KEY,
          adressFormatIsInvalid,
        );
      
      manageError(
        errorMessage.addressError,
        SIGN_UP_ADRESS_ERROR_MESSAGE_KEY,
        action.newAddress === '',
      );
      
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          address: action.newAddress,
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          addressError: errorMessage.addressError,
        },
      };
    }
    // Change phone
    case 'CHANGE_PHONE': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.phoneError,
        SIGN_UP_PHONE_ERROR_MESSAGE_KEY,
        action.newPhone === '',
      );
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          phone: action.newPhone,
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          phoneError: errorMessage.phoneError,
        },
      };
    }
    // Change username
    case 'CHANGE_USERNAME': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.usernameError,
        SIGN_UP_USERNAME_ERROR_EMPTY_KEY,
        action.newUsername === '',
      );
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          username: action.newUsername,
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          usernameError: errorMessage.usernameError,
        },
      };
    }
    // Change password
    case 'CHANGE_PASSWORD': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.passwordError,
        SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY,
        action.newPassword === '',
      );
      manageError(
        errorMessage.verifyPasswordError,
        SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY,
        state.verifyPassword !== action.newPassword,
      );
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          password: action.newPassword,
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          passwordError: errorMessage.passwordError,
        },
      };
    }
    // Change verify password
    case 'CHANGE_CONFIRM_PASSWORD': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.verifyPasswordError,
        SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY,
        action.newConfirmPassword === '',
      );
      manageError(
        errorMessage.verifyPasswordError,
        SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY,
        state.accountInput.password !== action.newConfirmPassword,
      );
      return {
        ...state,
        verifyPassword: action.newConfirmPassword,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          verifyPasswordError: errorMessage.verifyPasswordError,
        },
      };
    }
    // Change the store category
    case 'CHANGE_CATEGORY': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.shopCategoryError,
        SIGN_UP_CATEGORY_ERROR_EMPTY_KEY,
        action.newCategory === '',
      );
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          shopCategory: action.newCategory,
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          shopCategoryError: errorMessage.shopCategoryError,
        },
      };
    }
    // Check if the sign up credentials are valid
    case 'CHECK_SIGN_UP_CREDENTIALS': {
      const errorMessage = {...initialSignUpErrorMessage};
      const emailFormatIsInvalid =
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          state.accountInput.email,
        );
      manageError(
        errorMessage.emailError,
        SIGN_UP_EMAIL_ERROR_FORMAT_ERROR_KEY,
        emailFormatIsInvalid,
      );
      manageError(
        errorMessage.emailError,
        SIGN_UP_EMAIL_ERROR_EMPTY_KEY,
        state.accountInput.email === '',
      );
      manageError(
        errorMessage.usernameError,
        SIGN_UP_USERNAME_ERROR_EMPTY_KEY,
        state.accountInput.username === '',
      );
      manageError(
        errorMessage.passwordError,
        SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY,
        state.accountInput.password === '',
      );
      manageError(
        errorMessage.verifyPasswordError,
        SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY,
        state.verifyPassword === '',
      );
      manageError(
        errorMessage.verifyPasswordError,
        SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY,
        state.accountInput.password !== state.verifyPassword,
      );
      manageError(
        errorMessage.shopNameError,
        SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY,
        state.accountInput.shopName === '',
      );
      manageError(
        errorMessage.addressError,
        SIGN_UP_ADRESS_ERROR_MESSAGE_KEY,
        state.accountInput.address === '',
      );
      manageError(
        errorMessage.phoneError,
        SIGN_UP_PHONE_ERROR_MESSAGE_KEY,
        state.accountInput.phone === '',
      );
      manageError(
        errorMessage.shopCategoryError,
        SIGN_UP_CATEGORY_ERROR_EMPTY_KEY,
        state.accountInput.shopCategory === '',
      );
      return {
        ...state,
        signUpErrorMessage: errorMessage,
      };
    }
    // Check if the address is valid
    case 'CHECK_ADDRESS': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.addressError,
        SIGN_UP_ADRESS_ERROR_MESSAGE_KEY,
        state.accountInput.address === '',
      );
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          addressError: errorMessage.addressError,
        },
      };
    }
    // Check if the phone number is valid
    case 'CHECK_PHONE': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.phoneError,
        SIGN_UP_PHONE_ERROR_MESSAGE_KEY,
        state.accountInput.phone === '',
      );
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          phoneError: errorMessage.phoneError,
        },
      };
    }
    // Check if the store name is valid
    case 'CHECK_SHOP_NAME': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.shopNameError,
        SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY,
        state.accountInput.shopName === '',
      );
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          shopNameError: errorMessage.shopNameError,
        },
      };
    }
    // Check if the email is valid
    case 'CHECK_EMAIL': {
      const errorMessage = {...initialSignUpErrorMessage};
      const emailFormatIsInvalid =
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          state.accountInput.email,
        );
      manageError(
        errorMessage.emailError,
        SIGN_UP_EMAIL_ERROR_FORMAT_ERROR_KEY,
        emailFormatIsInvalid,
      );
      manageError(
        errorMessage.emailError,
        SIGN_UP_EMAIL_ERROR_EMPTY_KEY,
        state.accountInput.email === '',
      );
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          emailError: errorMessage.emailError,
        },
      };
    }
    // Check if the username is valid
    case 'CHECK_USERNAME': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.usernameError,
        SIGN_UP_USERNAME_ERROR_EMPTY_KEY,
        state.accountInput.username === '',
      );
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          usernameError: errorMessage.usernameError,
        },
      };
    }
    // Check if the password is valid
    case 'CHECK_PASSWORD': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.passwordError,
        SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY,
        state.accountInput.password === '',
      );
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          passwordError: errorMessage.passwordError,
        },
      };
    }
    // Check if the verify password is valid
    case 'CHECK_CONFIRM_PASSWORD': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.verifyPasswordError,
        SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY,
        state.verifyPassword === '',
      );
      manageError(
        errorMessage.verifyPasswordError,
        SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY,
        state.accountInput.password !== state.verifyPassword,
      );
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          verifyPasswordError: errorMessage.verifyPasswordError,
        },
      };
    }
    // Check if the store category is valid
    case 'CHECK_CATEGORY': {
      const errorMessage = {...initialSignUpErrorMessage};
      manageError(
        errorMessage.shopCategoryError,
        SIGN_UP_CATEGORY_ERROR_EMPTY_KEY,
        state.accountInput.shopCategory === '',
      );
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          shopCategoryError: errorMessage.shopCategoryError,
        },
      };
    }
    // Set the error message for the username already used
    case 'SET_USERNAME_AS_ALREADY_USED':
      state.signUpErrorMessage.usernameError.add(
        SIGN_UP_USERNAME_ERROR_USED_KEY,
      );
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          usernameError: state.signUpErrorMessage.usernameError,
        },
      };
    // Remove the error message for the username already used
    case 'SET_USERNAME_AS_UNUSED':
      state.signUpErrorMessage.usernameError.delete(
        SIGN_UP_USERNAME_ERROR_USED_KEY,
      );

      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          usernameError: state.signUpErrorMessage.usernameError,
        },
      };
    // Set the error message for the email already used
    case 'SET_EMAIL_AS_ALREADY_USED':
      state.signUpErrorMessage.emailError.add(SIGN_UP_EMAIL_ERROR_USED_KEY);
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          emailError: state.signUpErrorMessage.emailError,
        },
      };
    // Remove the error message for the email already used
    case 'SET_EMAIL_AS_UNUSED':
      state.signUpErrorMessage.emailError.delete(SIGN_UP_EMAIL_ERROR_USED_KEY);
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          emailError: state.signUpErrorMessage.emailError,
        },
      };
    default:
      return state;
  }
}
// Check if the error message is needed
const manageError = (
  errorSet: Set<string>,
  errorKey: string,
  errorCondition: boolean,
) => {
  if (!errorCondition && errorSet.has(errorKey)) {
    errorSet.delete(errorKey);
  }
  if (errorCondition && !errorSet.has(errorKey)) {
    errorSet.add(errorKey);
  }
  return errorSet;
};
