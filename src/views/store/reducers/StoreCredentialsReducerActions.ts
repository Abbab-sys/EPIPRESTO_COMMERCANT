export type StoreCredentialsReducerActions =
    | { type: 'CHANGE_SHOP_NAME', newShopName: string }
    | { type: 'CHANGE_ADDRESS', newAddress: string }
    | { type: 'CHANGE_PHONE', newPhone: string }
    | { type: 'CHANGE_STATUS'}
    | { type: 'CHECK_STORE_CREDENTIALS'}
    | { type: 'CHECK_SHOP_NAME'}
    | { type: 'CHECK_ADDRESS'}
    | { type: 'CHECK_PHONE'}
    | { type: 'SET_STORE_CREDENTIALS', data: any}
    