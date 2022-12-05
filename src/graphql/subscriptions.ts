import {gql} from '@apollo/client';

/*
 * Name: GraphQL Subscription
 * Description: This file contains all the GraphQL subscriptions used in the application.
 * Author: Adam Naoui-Busson
 */

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
`;
