import {gql} from '@apollo/client';

export const ADD_PRODUCT = gql`
  mutation Mutation($storeId: ID!, $newProduct: ProductInput!) {
    addNewProductToStore(storeId: $storeId, newProduct: $newProduct) {
      code
      message
    }
  }
`;
export const SIGN_UP = gql`
  mutation Mutation($accountInput: VendorAccountInput) {
    vendorSignUp(accountInput: $accountInput) {
      code
      message
    }
  }
`;

export const SYNC_SHOPIFY = gql`
  mutation Mutation($shopifyCreds: ShopifyCredentials!) {
    synchronizeShopifyStore(shopifyCreds: $shopifyCreds) {
      code
      message
    }
  }
`;

export const SYNC_WOOCOMMERCE = gql`
  mutation Mutation($woocommerceCreds: WoocommerceCredentials!) {
    synchronizeWoocommerceStore(woocommerceCreds: $woocommerceCreds) {
      code
      message
    }
  }
`;

export const MODIFY_STORE = gql`
mutation UpdateStore($fieldsToUpdate: UpdateStore!, $storeId: ID!) {
  updateStore(fieldsToUpdate: $fieldsToUpdate, storeId: $storeId) {
    code
    message
  }
}
`;

export const MODIFY_VENDORS = gql`
mutation UpdateVendorAccount($fieldsToUpdate: UpdateVendorAccount!, $vendorId: ID!) {
  updateVendorAccount(fieldsToUpdate: $fieldsToUpdate, vendorId: $vendorId) {
    code
    message
  }
}

`;
//todo: add the rest of the mutations
export const CHANGE_ORDER_STATUS = gql`
  mutation Mutation($orderId: ID!, $newStatus: OrderStatus!) {
    updateOrderStatus(orderId: $orderId, newStatus: $newStatus) {
      code
      message
    }
  }
`;
export const SEND_MESSAGE = gql`
  mutation Mutation($message: MessageInput!) {
    sendMessageToChat(message: $message) {
      code
      message
    }
  }
`;
