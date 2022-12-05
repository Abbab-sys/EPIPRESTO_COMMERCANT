import {StoreCredentialsReducerState} from './StoreCredentialsReducerState';
import {StoreCredentialsReducerActions} from './StoreCredentialsReducerActions';
import {
  ActivesHour,
  initialStoreErrorMessage,
} from '../../../interfaces/StoreInterfaces';
import {
  SIGN_UP_ADRESS_ERROR_FORMAT_KEY,
  SIGN_UP_ADRESS_ERROR_MESSAGE_KEY,
  SIGN_UP_PHONE_ERROR_MESSAGE_KEY,
  SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY,
} from '../../../translations/keys/SignUpTranslationKeys';
import {
  DISPONIBILITY_ERROR_FORMAT_KEY,
  DISPONIBILITY_ERROR_ORDER_KEY,
} from '../../../translations/keys/DisponibilityTranslationKeys';

/*
 * Name : Store Credentials Reducer
 * Description: This file is used to manage the state of the store credentials page.
 * Author : Alessandro van Reusel, Zouhair Derouich
 */

export function storeCredentialsReducer(
  state: StoreCredentialsReducerState,
  action: StoreCredentialsReducerActions,
): StoreCredentialsReducerState {
  switch (action.type) {
    // Change the shop name
    case 'CHANGE_SHOP_NAME': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.shopNameError,
        SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY,
        action.newShopName === '',
      );
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          shopName: action.newShopName,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          shopNameError: errorMessage.shopNameError,
        },
      };
    }
    // Change the address
    case 'CHANGE_ADDRESS': {
      const errorMessage = {...initialStoreErrorMessage};

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
        storeInput: {
          ...state.storeInput,
          address: action.newAddress,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          addressError: errorMessage.addressError,
        },
      };
    }
    // Change the phone number
    case 'CHANGE_PHONE': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.phoneError,
        SIGN_UP_PHONE_ERROR_MESSAGE_KEY,
        action.newPhone === '',
      );
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          phone: action.newPhone,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          phoneError: errorMessage.phoneError,
        },
      };
    }
    // Change the store status
    case 'CHANGE_STATUS': {
      const previousState = {...state};
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          isPaused: !previousState.storeInput.isPaused,
        },
      };
    }
    // Check if the store credentials are valid
    case 'CHECK_STORE_CREDENTIALS': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.shopNameError,
        SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY,
        state.storeInput.shopName === '',
      );
      manageError(
        errorMessage.addressError,
        SIGN_UP_ADRESS_ERROR_MESSAGE_KEY,
        state.storeInput.address === '',
      );
      manageError(
        errorMessage.phoneError,
        SIGN_UP_PHONE_ERROR_MESSAGE_KEY,
        state.storeInput.phone === '',
      );
      return {
        ...state,
        storeErrorMessage: errorMessage,
      };
    }
    // Check if the address is valid
    case 'CHECK_ADDRESS': {
      const errorMessage = {...initialStoreErrorMessage};

      const adressFormatIsInvalid =
        !/[0-9]+\s*[A-Z][a-z]+\s*[A-Z][a-z]+,\s*[A-Z][a-z]+,\s*[A-Z]{2},\s*[A-Z][1-9][A-Z]\s[1-9][A-Z][1-9]/i.test(state.storeInput.address);

        manageError(
          errorMessage.addressError,
          SIGN_UP_ADRESS_ERROR_FORMAT_KEY,
          adressFormatIsInvalid,
        );

      manageError(
        errorMessage.addressError,
        SIGN_UP_ADRESS_ERROR_MESSAGE_KEY,
        state.storeInput.address === '',
      );

      return {
        ...state,
        storeErrorMessage: {
          ...state.storeErrorMessage,
          addressError: errorMessage.addressError,
        },
      };
    }
    // Check if the phone number is valid
    case 'CHECK_PHONE': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.phoneError,
        SIGN_UP_PHONE_ERROR_MESSAGE_KEY,
        state.storeInput.phone === '',
      );
      return {
        ...state,
        storeErrorMessage: {
          ...state.storeErrorMessage,
          phoneError: errorMessage.phoneError,
        },
      };
    }
    // Check if the shop name is valid
    case 'CHECK_SHOP_NAME': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.shopNameError,
        SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY,
        state.storeInput.shopName === '',
      );
      return {
        ...state,
        storeErrorMessage: {
          ...state.storeErrorMessage,
          shopNameError: errorMessage.shopNameError,
        },
      };
    }
    // Set the store credentials from the query
    case 'SET_STORE_CREDENTIALS': {
      let newDisponibility: Map<string, Array<ActivesHour>> = new Map();
      action.data.disponibilities.forEach((value: any) => {
        let activesHours: Array<ActivesHour> = [];
        value.activesHours.forEach((activesHour: any) => {
          activesHours.push({
            openingHour: activesHour.openingHour,
            endingHour: activesHour.endingHour,
            errorOpeningHour: '',
            errorEndingHour: '',
          });
        });
        newDisponibility.set(value.day, activesHours);
      });
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
        },
      };
    }
    // Change the opening hour of a specific day and index
    case 'SET_OPENING_HOUR': {
      if (!action.newOpeningHour.includes(':')) return state;
      const oldDisponibilities = state.storeInput.disponibilities;
      const activesHours = oldDisponibilities.get(
        action.day,
      ) as Array<ActivesHour>;
      let oldActiveHour = activesHours[action.activeHourIndex];
      oldActiveHour = checkErrorMessage(
        oldActiveHour,
        'opening',
        action.newOpeningHour,
      );
      oldActiveHour.openingHour = action.newOpeningHour;
      activesHours[action.activeHourIndex] = oldActiveHour;
      oldDisponibilities.set(action.day, activesHours);
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          disponibilities: oldDisponibilities,
        },
      };
    }
    // Change the ending hour of a specific day and index
    case 'SET_CLOSING_HOUR': {
      if (!action.newClosingHour.includes(':')) return state;
      const oldDisponibilities = state.storeInput.disponibilities;
      const activesHours = oldDisponibilities.get(
        action.day,
      ) as Array<ActivesHour>;
      let oldActiveHour = activesHours[action.activeHourIndex];
      oldActiveHour = checkErrorMessage(
        oldActiveHour,
        'closing',
        action.newClosingHour,
      );
      oldActiveHour.endingHour = action.newClosingHour;
      activesHours[action.activeHourIndex] = oldActiveHour;
      oldDisponibilities.set(action.day, activesHours);
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          disponibilities: oldDisponibilities,
        },
      };
    }
    // Add a new active hour to a specific day
    case 'ADD_ACTIVE_HOUR': {
      const oldDisponibilities = state.storeInput.disponibilities;
      const activesHours = oldDisponibilities.get(
        action.day,
      ) as Array<ActivesHour>;
      activesHours.unshift({
        openingHour: '00:00',
        endingHour: '00:00',
        errorOpeningHour: '',
        errorEndingHour: '',
      });
      oldDisponibilities.set(action.day, activesHours);
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          disponibilities: oldDisponibilities,
        },
      };
    }
    // Remove an active hour from a specific day
    case 'REMOVE_ACTIVE_HOUR': {
      const oldDisponibilities = state.storeInput.disponibilities;
      const activesHours = oldDisponibilities.get(
        action.day,
      ) as Array<ActivesHour>;
      activesHours.splice(action.activeHourIndex, 1);
      oldDisponibilities.set(action.day, activesHours);
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          disponibilities: oldDisponibilities,
        },
      };
    }
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

// Check if the new hour format is valid
const checkErrorMessage = (
  oldActiveHour: ActivesHour,
  mode: string,
  newHour: string,
) => {
  const hourRegexResult = /^((0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]))$/.test(
    newHour,
  );
  const isOrdered =
    mode === 'opening'
      ? oldActiveHour.endingHour > newHour
      : oldActiveHour.openingHour < newHour;
  if (mode === 'opening') {
    oldActiveHour.errorOpeningHour = hourRegexResult
      ? isOrdered
        ? ''
        : DISPONIBILITY_ERROR_ORDER_KEY
      : DISPONIBILITY_ERROR_FORMAT_KEY;
    if (
      hourRegexResult &&
      isOrdered &&
      oldActiveHour.errorEndingHour === DISPONIBILITY_ERROR_ORDER_KEY
    )
      oldActiveHour.errorEndingHour = '';
  } else {
    oldActiveHour.errorEndingHour = hourRegexResult
      ? isOrdered
        ? ''
        : DISPONIBILITY_ERROR_ORDER_KEY
      : DISPONIBILITY_ERROR_FORMAT_KEY;
    if (
      hourRegexResult &&
      isOrdered &&
      oldActiveHour.errorOpeningHour === DISPONIBILITY_ERROR_ORDER_KEY
    )
      oldActiveHour.errorOpeningHour = '';
  }
  return oldActiveHour;
};
