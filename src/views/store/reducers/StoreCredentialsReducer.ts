import {StoreCredentialsReducerState} from "./StoreCredentialsReducerState";
import {StoreCredentialsReducerActions} from "./StoreCredentialsReducerActions";
import {ActivesHour, initialStoreErrorMessage} from "../../../interfaces/StoreInterfaces";
import {
  SIGN_UP_ADRESS_ERROR_MESSAGE_KEY,
  SIGN_UP_PHONE_ERROR_MESSAGE_KEY,
  SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY,
} from "../../../translations/keys/SignUpTranslationKeys";
import { DISPONIBILITY_ERROR_FORMAT_KEY, DISPONIBILITY_ERROR_ORDER_KEY } from "../../../translations/keys/DisponibilityTranslationKeys";

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
          isPaused: !previousState.storeInput.isPaused
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
      let newDisponibility:Map<string, Array<ActivesHour>> = new Map();
      action.data.disponibilities.forEach((value:any) => {
        let activesHours: Array<ActivesHour> = [];
        value.activesHours.forEach((activesHour:any) => {
          activesHours.push({
            openingHour: activesHour.openingHour,
            endingHour: activesHour.endingHour,
            errorOpeningHour: "",
            errorEndingHour: "",
          })
        })
        newDisponibility.set(value.day ,activesHours)
      })
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          shopName: action.data.name,
          address: action.data.address,
          phone: action.data.relatedVendor.phone,
          isPaused: action.data.isPaused,
          disponibilities: newDisponibility,
          idVendor: action.data.relatedVendor._id,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
        }
      }
    }
    case 'SET_OPENING_HOUR': {
      if (!action.newOpeningHour.includes(':')) return state
      const oldDisponibilities = state.storeInput.disponibilities
      const activesHours = oldDisponibilities.get(action.day) as Array<ActivesHour>
      let oldActiveHour=activesHours[action.activeHourIndex]
      oldActiveHour = checkErrorMessage(oldActiveHour, "opening",action.newOpeningHour)
      oldActiveHour.openingHour = action.newOpeningHour
      activesHours[action.activeHourIndex]=oldActiveHour
      oldDisponibilities.set(action.day,activesHours)
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          disponibilities: oldDisponibilities
        },
      }
    }
    case 'SET_CLOSING_HOUR': {
      if (!action.newClosingHour.includes(':')) return state
      const oldDisponibilities = state.storeInput.disponibilities
      const activesHours = oldDisponibilities.get(action.day) as Array<ActivesHour>
      let oldActiveHour = activesHours[action.activeHourIndex]
      oldActiveHour=checkErrorMessage(oldActiveHour,'closing', action.newClosingHour)
      oldActiveHour.endingHour= action.newClosingHour
      activesHours[action.activeHourIndex]=oldActiveHour
      oldDisponibilities.set(action.day,activesHours)
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          disponibilities: oldDisponibilities
        },
      }
    }
    case 'ADD_ACTIVE_HOUR': {
      const oldDisponibilities = state.storeInput.disponibilities
      const activesHours = oldDisponibilities.get(action.day) as Array<ActivesHour>
      activesHours.unshift({openingHour:'00:00',endingHour:'00:00',errorOpeningHour:'',errorEndingHour:''})
      oldDisponibilities.set(action.day,activesHours)
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          disponibilities: oldDisponibilities
        },
      }
    }
    case 'REMOVE_ACTIVE_HOUR': {
      const oldDisponibilities = state.storeInput.disponibilities
      const activesHours = oldDisponibilities.get(action.day) as Array<ActivesHour>
      activesHours.splice(action.activeHourIndex,1)
      oldDisponibilities.set(action.day,activesHours)
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          disponibilities: oldDisponibilities
        },
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

const checkErrorMessage = (oldActiveHour:ActivesHour, mode:string, newHour:string) => {
  const hourRegexResult = /^((0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]))$/.test(newHour);
  const isOrdered = (mode==='opening')?((oldActiveHour.endingHour > newHour)):((oldActiveHour.openingHour < newHour))
  if (mode==='opening') {
    oldActiveHour.errorOpeningHour=(hourRegexResult)?((isOrdered)?'':DISPONIBILITY_ERROR_ORDER_KEY):DISPONIBILITY_ERROR_FORMAT_KEY
    if((hourRegexResult && isOrdered && oldActiveHour.errorEndingHour === DISPONIBILITY_ERROR_ORDER_KEY)) oldActiveHour.errorEndingHour = '' ;
  } else {
    oldActiveHour.errorEndingHour=(hourRegexResult)?((isOrdered)?'':DISPONIBILITY_ERROR_ORDER_KEY):DISPONIBILITY_ERROR_FORMAT_KEY
    if((hourRegexResult && isOrdered && oldActiveHour.errorOpeningHour === DISPONIBILITY_ERROR_ORDER_KEY)) oldActiveHour.errorOpeningHour = '' ;
  }
  return oldActiveHour
}
