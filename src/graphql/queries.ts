import {gql} from '@apollo/client';

export const LOGIN_BY_EMAIL = gql`
  query Query($email: String!, $password: String!) {
    loginVendorByEmail(email: $email, password: $password) {
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

export const LOGIN_BY_USERNAME = gql`
  query Query($username: String!, $password: String!) {
    loginVendorByUsername(username: $username, password: $password) {
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

export const IS_VENDOR_USERNAME_USED = gql`
  query Query($username: String!) {
    isVendorUsernameUsed(username: $username)
  }
`;

export const IS_VENDOR_EMAIL_USED = gql`
  query Query($email: String!) {
    isVendorEmailUsed(email: $email)
  }
`;

export const GET_STORE_PRODUCTS_BY_ID = gql`
  query GetStoreById($idStore: ID!, $offset: Int!, $first: Int) {
    getStoreById(idStore: $idStore) {
      code
      message
      store {
        products(offset: $offset, first: $first) {
          _id
          title
          imgSrc
        }
      }
    }
  }
`;
export const GET_INITIAL_CHATS = gql`
  query Query($idStore: ID!) {
    getStoreById(idStore: $idStore) {
      code
      message
      store {
        _id
        chats {
          _id
          relatedOrder {
            _id
            orderNumber
          }
          messages {
            _id
            message
            date
            role
            status
          }
          relatedClient {
            _id
            username
          }
        }
      }
    }
  }
`;

export const GET_STORE_CREDENTIALS_BY_ID = gql`
query getStoreCredentialsById($idStore: ID!) {
  getStoreById(idStore: $idStore) {
    code
    message
    store {
      name
      address
      isOpen
      disponibilities {
        day
        activesHours {
          openingHour
          endingHour
        }
      }
      relatedVendor {
        phone
        _id
      }
      
    }
  }
}
`

// export const GET_PRODUCTS = gql`
//   query GetStoreById($idStore: ID!) {
//     getStoreById(idStore: $idStore) {
//       code
//       message
//       store {
//         _id
//         products(first:2) {
//           _id
//           title
//           imgSrc
//         }
//       }
//     }
//   }
// `

export const GET_ALL_ORDERS_BY_STORE_ID = gql`
  query GetStoreById($idStore: ID!) {
    getStoreById(idStore: $idStore) {
      code
      message
      store {
        orders {
          _id
          orderNumber
          productsVariantsOrdered {
            relatedProductVariant {
              displayName
              price
              imgSrc
              _id
              relatedProduct {
                relatedStore {
                  name
                }
              }
            }
            quantity
          }
          relatedVendors {
            name
          }
          relatedClient {
            lastName
            firstName
            email
            phone
            address
          }
          logs {
            status
            time
          }
          subTotal
          taxs
          deliveryFee
          paymentMethod
        }
      }
    }
  }
`;
export const GET_ORDER_BY_ID = gql`
  query GetOrderById($idOrder: ID!) {
    getOrderById(idOrder: $idOrder) {
      code
      message
      order {
        _id
        orderNumber
        productsVariantsOrdered {
          relatedProductVariant {
            _id
            displayName
            price
            imgSrc
            relatedProduct {
              relatedStore {
                name
              }
            }
          }
          quantity
        }
        relatedVendors {
          name
        }
        relatedClient {
          lastName
          firstName
          email
          address
          phone
        }
        logs {
          status
          time
        }
        subTotal
        deliveryFee
        taxs
        paymentMethod
      }
    }
  }
`;
