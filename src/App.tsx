import React, {useContext, useState} from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import SignUp from './views/sign_up/SignUp';
import '../i18n';
import Login from './views/login/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigation from './views/navigation/Navigation';
import Inventory from './views/inventory/Inventory';
import { VendorContext } from './context/Vendor';
import OrderPage from './views/orders/OrderPage';
import Settings from './views/settings/Settings';
import Chat from './views/chat/Chat';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {getMainDefinition} from '@apollo/client/utilities';
import AllChats from './views/chat/AllChats';
import {useChatManager} from './hooks/ChatManagerHook';
import {ChatContext} from './context/ChatContext';
import Orders from './views/orders/Orders';
import Store from './views/store/Store';
import ChangeLanguage from './views/change_language/ChangeLanguage';
import Analytics from './views/analytics/Analytics';
import AddProduct from './views/Product/AddProduct';
import UpdateProduct from './views/Product/UpdateProduct';
import Stock from './views/stock/Stock';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();


export default function App() {
  const [storeId, setStoreId] = React.useState<string>('');
  const storeIdContext = {storeId, setStoreId};

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'ws://52.90.77.253:4000/graphql',
    }),
  );

  const httpLink = new HttpLink({
    uri: 'http://52.90.77.253:4000/graphql',
  });

  const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: false,
            merge(existing = [], incoming) {
              console.log("Existing: ", existing)
              console.log("Incoming: ", incoming)
              return [...existing, ...incoming];
            },
          }
        }
      }
    }
  })

  const client = new ApolloClient({
    link: splitLink,
    cache: cache,
  });

  AsyncStorage.getItem('@storeId').then((value) => {
      if (value) setStoreId(value);
    }
  );

  return (
    <VendorContext.Provider value={{storeId, setStoreId}}>
      <ApolloProvider client={client}>
        <NavigationStack />
      </ApolloProvider>
    </VendorContext.Provider>
  );
}

function NavigationStack() {
  const {storeId} = useContext(VendorContext);
  const chatManager = useChatManager(storeId);
  const chatContext = {chatManager};
  return (

    <ChatContext.Provider value={chatContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"} screenOptions={{headerShown: false}}>
          {!storeId ? (
            <>
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
            ) : (
            <>
              <Stack.Screen name="Navigation" component={Navigation} />
              <Stack.Screen name="AddProduct" component={AddProduct} />
              <Stack.Screen name="AllChats" component={AllChats} />
              <Stack.Screen name="ChatPage" component={Chat} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Orders" component={Orders} />
              <Stack.Screen name="OrderPage" component={OrderPage} />
              <Stack.Screen name="Inventory" component={Inventory} />
              <Stack.Screen name="Stock" component={Stock} />
              <Stack.Screen name="Store" component={Store} />
              <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
              <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
              <Stack.Screen name="Analytics" component={Analytics} />


            </>
          )}
      </Stack.Navigator>
    
      </NavigationContainer>
    </ChatContext.Provider>
  );
}
