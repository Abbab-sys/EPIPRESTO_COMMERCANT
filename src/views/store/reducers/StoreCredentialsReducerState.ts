import {StoreInput, initialStoreErrorMessage, StoreErrorMessage} from "../../../interfaces/StoreInterfaces";

export interface StoreCredentialsReducerState {
  storeInput: StoreInput;
  storeErrorMessage: StoreErrorMessage
}

export const initialStoreCredentialsState: StoreCredentialsReducerState = {
  storeInput: {
    idVendor: '',
    shopName: '',
    address: '',
    phone: '',
    isOpen: false,
    disponibilities: new Map(
      [["MONDAY", [{openingHour: "00:00", closingHour: "00:00", errorOpeningHour: '', errorClosingHour: ''}]]
      ,["TUESDAY", [{openingHour: "00:00", closingHour: "00:00", errorOpeningHour: '', errorClosingHour: ''}]]
      ,["WEDNESDAY", [{openingHour: "00:00", closingHour: "00:00", errorOpeningHour: '', errorClosingHour: ''}]]
      ,["THURSDAY", [{openingHour: "00:00", closingHour: "00:00", errorOpeningHour: '', errorClosingHour: ''}]]
      ,["FRIDAY", [{openingHour: "00:00", closingHour: "00:00", errorOpeningHour: '', errorClosingHour: ''}]]
      ,["SATURDAY", [{openingHour: "00:00", closingHour: "00:00", errorOpeningHour: '', errorClosingHour: ''}]]
      ,["SUNDAY", [{openingHour: "00:00", closingHour: "00:00", errorOpeningHour: '', errorClosingHour: ''}]]
    ]
    )
  },
  storeErrorMessage: {
    ...initialStoreErrorMessage
  }
}
