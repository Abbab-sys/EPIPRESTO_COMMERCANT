import {StoreCredentialsReducerState} from "./StoreCredentialsReducerState";
import {StoreCredentialsReducerActions} from "./StoreCredentialsReducerActions";
import {initialStoreErrorMessage} from "../../../interfaces/StoreInterfaces";
import {
  SIGN_UP_ADRESS_ERROR_MESSAGE_KEY,
  SIGN_UP_PHONE_ERROR_MESSAGE_KEY,
  SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY,
  SIGN_UP_USERNAME_ERROR_EMPTY_KEY, SIGN_UP_USERNAME_ERROR_USED_KEY
} from "../../../translations/keys/SignUpTranslationKeys";

export function storeCredentialsReducer(state: StoreCredentialsReducerState, action: StoreCredentialsReducerActions): StoreCredentialsReducerState {
  switch (action.type) {
    case 'CHANGE_SHOP_NAME': {
      const errorMessage = {...initialStoreErrorMessage}
      manageError(errorMessage.shopNameError, SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY, action.newShopName === '')
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          shopName: action.newShopName
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          shopNameError: errorMessage.shopNameError
        }
      }
    }
    case 'CHANGE_ADDRESS': {
      const errorMessage = {...initialStoreErrorMessage}
      manageError(errorMessage.addressError, SIGN_UP_ADRESS_ERROR_MESSAGE_KEY, action.newAddress === '')
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          address: action.newAddress
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          addressError: errorMessage.addressError
        }
      }
    }
    case 'CHANGE_PHONE': {
      const errorMessage = {...initialStoreErrorMessage}
      manageError(errorMessage.phoneError, SIGN_UP_PHONE_ERROR_MESSAGE_KEY, action.newPhone === '')
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          phone: action.newPhone
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          phoneError: errorMessage.phoneError
        }
      }
    }
    case 'CHANGE_STATUS': {
      const previousState = {...state}
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          isStoreActive: !previousState.storeInput.isStoreActive
        }
      }
    }
    case 'CHECK_STORE_CREDENTIALS': {
      const errorMessage = {...initialStoreErrorMessage}
      manageError(errorMessage.shopNameError, SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY, state.storeInput.shopName === '')
      manageError(errorMessage.addressError, SIGN_UP_ADRESS_ERROR_MESSAGE_KEY, state.storeInput.address === '')
      manageError(errorMessage.phoneError, SIGN_UP_PHONE_ERROR_MESSAGE_KEY, state.storeInput.phone === '')
      return {
        ...state,
        storeErrorMessage: errorMessage
      }
    }
    case 'CHECK_ADDRESS': {
      const errorMessage = {...initialStoreErrorMessage}
      manageError(errorMessage.addressError, SIGN_UP_ADRESS_ERROR_MESSAGE_KEY, state.storeInput.address === '')
      return {
        ...state,
        storeErrorMessage: {
          ...state.storeErrorMessage,
          addressError: errorMessage.addressError
        }
      }
    }
    case 'CHECK_PHONE': {
      const errorMessage = {...initialStoreErrorMessage}
      manageError(errorMessage.phoneError, SIGN_UP_PHONE_ERROR_MESSAGE_KEY, state.storeInput.phone === '')
      return {
        ...state,
        storeErrorMessage: {
          ...state.storeErrorMessage,
          phoneError: errorMessage.phoneError
        }
      }
    }
    case 'CHECK_SHOP_NAME': {
      const errorMessage = {...initialStoreErrorMessage}
      manageError(errorMessage.shopNameError, SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY, state.storeInput.shopName === '')
      return {
        ...state,
        storeErrorMessage: {
          ...state.storeErrorMessage,
          shopNameError: errorMessage.shopNameError
        }
      }
    }
    case 'SET_STORE_CREDENTIALS': {
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          shopName: action.data.name,
          address: action.data.address,
          phone: action.data.phone,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
        }
      }
    }
    default:
      return state;
  }

}

const manageError = (errorSet: Set<string>, errorKey: string, errorCondition: boolean) => {
  if (!errorCondition && errorSet.has(errorKey)) {
    errorSet.delete(errorKey)
  }
  if (errorCondition && !errorSet.has(errorKey)) {
    errorSet.add(errorKey)
  }
  return errorSet
}


