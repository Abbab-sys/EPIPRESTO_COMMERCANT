import {
  StoreInput,
  initialStoreErrorMessage,
  StoreErrorMessage,
  ActivesHour,
} from '../../../interfaces/StoreInterfaces';

/*
 * Name : Store Credentials Reducer State
 * Description: This file is used to manage and initialiaze the state of the store credentials page.
 * Author : Alessandro van Reusel, Zouhair Derouich
 */
export interface StoreCredentialsReducerState {
  storeInput: StoreInput;
  storeErrorMessage: StoreErrorMessage;
}

export const initialStoreCredentialsState: StoreCredentialsReducerState = {
  storeInput: {
    idVendor: '',
    shopName: '',
    address: '',
    phone: '',
    isPaused: false,
    disponibilities: new Map<string, Array<ActivesHour>>([
      [
        'MONDAY',
        [
          {
            openingHour: '00:00',
            endingHour: '00:00',
            errorOpeningHour: '',
            errorEndingHour: '',
          },
        ],
      ],
      [
        'TUESDAY',
        [
          {
            openingHour: '00:00',
            endingHour: '00:00',
            errorOpeningHour: '',
            errorEndingHour: '',
          },
        ],
      ],
      [
        'WEDNESDAY',
        [
          {
            openingHour: '00:00',
            endingHour: '00:00',
            errorOpeningHour: '',
            errorEndingHour: '',
          },
        ],
      ],
      [
        'THURSDAY',
        [
          {
            openingHour: '00:00',
            endingHour: '00:00',
            errorOpeningHour: '',
            errorEndingHour: '',
          },
        ],
      ],
      [
        'FRIDAY',
        [
          {
            openingHour: '00:00',
            endingHour: '00:00',
            errorOpeningHour: '',
            errorEndingHour: '',
          },
        ],
      ],
      [
        'SATURDAY',
        [
          {
            openingHour: '00:00',
            endingHour: '00:00',
            errorOpeningHour: '',
            errorEndingHour: '',
          },
        ],
      ],
      [
        'SUNDAY',
        [
          {
            openingHour: '00:00',
            endingHour: '00:00',
            errorOpeningHour: '',
            errorEndingHour: '',
          },
        ],
      ],
    ]),
  },
  storeErrorMessage: {
    ...initialStoreErrorMessage,
  },
};
