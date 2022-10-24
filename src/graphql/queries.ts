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
`

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
`

export const GET_STORE_VARIANTS_BY_ID = gql`
  query GetStoreById($idStore: ID!, $offset: Int!, $first: Int) {
    getStoreById(idStore: $idStore) {
      code
      message
      store {
        products(offset: $offset, first: $first) {
          title
          imgSrc
          variants {
            _id
            variantTitle
            imgSrc
            stock
          }
        }
      }
    }
  }
`

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

`

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($idProduct: ID!) {
    getProductById(idProduct: $idProduct) {
      code
      message
      product {
        _id
        title
        brand
        published
        tags
        imgSrc
        variants {
          _id
          variantTitle
          availableForSale
          price
          sku
          taxable
          imgSrc
          byWeight
          stock
        }
      }
    }
  }
`
