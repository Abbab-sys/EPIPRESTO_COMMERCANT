import {createContext} from 'react';

/*
 * Name: Vendor Context
 * Description: This file contains the id for the vendor in a context.
 * Author: Adam Naoui-Busson, Zouhair Derouich, Khalil Zriba
 */

type VendorAuth = {
  storeId: string;
  setStoreId: (storeId: string) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
};
const defaultContext: VendorAuth = {
  storeId: '',
  setStoreId: storeId => {},
  isAdmin: false,
  setIsAdmin: isAdmin => {},
};
export const VendorContext = createContext<VendorAuth>(defaultContext);
