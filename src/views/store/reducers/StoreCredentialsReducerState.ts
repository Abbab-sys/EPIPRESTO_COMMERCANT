import {StoreInput, initialStoreErrorMessage, StoreErrorMessage} from "../../../interfaces/StoreInterfaces";

export interface StoreCredentialsReducerState {
  storeInput: StoreInput;
  storeErrorMessage: StoreErrorMessage
}

export const initialStoreCredentialsState: StoreCredentialsReducerState = {
  storeInput: {
    shopName: '',
    address: '',
    phone: '',
    isStoreActive: false
  },
  storeErrorMessage: {
    ...initialStoreErrorMessage
  }
}
