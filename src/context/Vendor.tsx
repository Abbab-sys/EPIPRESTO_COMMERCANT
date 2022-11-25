import React, { createContext } from "react";

type VendorAuth = {
  storeId: string;
  setStoreId: (storeId: string) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}
const defaultContext: VendorAuth = {
  storeId: '',
  setStoreId: (storeId) => {
    console.log('Stub for setStoreId with : ', storeId);
  },
  isAdmin: false,
  setIsAdmin: (isAdmin) => {
    console.log('Stub for setIsAdmin with : ', isAdmin);
  }
};
export const VendorContext = createContext<VendorAuth>(defaultContext);
