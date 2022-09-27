import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from './views/login/Login';
import { VendorContext } from './context/Vendor';
import SignUp from './views/sign_up/SignUp';

export default function App() {
  const [storeId, setStoreId] = React.useState<string>("");
  const storeIdContext = {storeId, setStoreId};
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization:`{"storeId":"` + storeId + `"}`
      }
    }
  });
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  return (
    <VendorContext.Provider value={storeIdContext}>
      <ApolloProvider client={client}>
        <SignUp/>
      </ApolloProvider>
    </VendorContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFA500',
  },
});
