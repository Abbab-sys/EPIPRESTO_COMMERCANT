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
    | { type: 'SET_OPENING_HOUR', day: string, activeHourIndex:number, newOpeningHour: string}
    | { type: 'SET_CLOSING_HOUR', day: string, activeHourIndex:number, newClosingHour: string}
    | { type: 'ADD_ACTIVE_HOUR', day: string}
    | { type: 'REMOVE_ACTIVE_HOUR', day: string, activeHourIndex:number}
