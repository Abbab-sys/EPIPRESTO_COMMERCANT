export interface StoreInput {
    shopName: string;
    address: string;
    phone: string;
    isStoreActive: boolean;
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
  