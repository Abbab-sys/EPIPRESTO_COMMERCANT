import React, { createContext } from "react";

type VendorAuth = {
  storeId: string;
  setStoreId: (storeId: string) => void;
}
const defaultContext: VendorAuth = {
  storeId: '',
  setStoreId: (storeId) => {
    console.log('Stub for setStoreId with : ', storeId);
  },
};
export const VendorContext = createContext<VendorAuth>(defaultContext);
