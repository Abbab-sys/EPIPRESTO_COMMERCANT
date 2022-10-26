import {gql} from '@apollo/client';

export const MESSAGE_SENT = gql`
  subscription Subscription($storeId: ID) {
    messageSent(storeId: $storeId) {
      message
      date
      role
      status
      relatedChat {
        _id
      }
      _id
    }
  }
`