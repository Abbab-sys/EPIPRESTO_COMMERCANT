import {gql} from '@apollo/client';

export const ADD_PRODUCT = gql`
mutation Mutation($storeId: ID!, $newProduct: ProductInput!) {
    addNewProductToStore(storeId: $storeId, newProduct: $newProduct) {
      code
      message
    }
  }
`
export const SIGN_UP = gql`
  mutation Mutation($accountInput: VendorAccountInput) {
    vendorSignUp(accountInput: $accountInput) {
      code
      message
      vendorAccount {
        _id
        store {
          _id
        }
      }
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

//todo: add the rest of the mutations
export const CHANGE_ORDER_STATUS = gql`
  mutation Mutation($orderId: ID!, $newStatus: String!) {
    changeOrderStatus(orderId: $orderId, newStatus: $newStatus) {
      code
      message
    }
  }
`;
