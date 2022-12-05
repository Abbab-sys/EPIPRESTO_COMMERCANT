/*
 * Name: Store Interfaces
 * Description: This file contains the interfaces for the store page.
 * Author: Alessandro van Reusel, Zouhair Derouich
 */

export interface StoreInput {
  idVendor: string;
  shopName: string;
  address: string;
  phone: string;
  isPaused: boolean;
  disponibilities: Map<string, Array<ActivesHour>>;
}

export interface StoreErrorMessage {
  shopNameError: Set<string>;
  addressError: Set<string>;
  phoneError: Set<string>;
}

export const initialStoreErrorMessage: StoreErrorMessage = {
  shopNameError: new Set(),
  addressError: new Set(),
  phoneError: new Set(),
};

export interface ActivesHour {
  openingHour: string;
  endingHour: string;
  errorOpeningHour: string;
  errorEndingHour: string;
}
