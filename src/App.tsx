import React, {useContext} from 'react';
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
import {VendorContext} from './context/Vendor';
import AddProduct from './views/add_product/AddProduct';
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

const Stack = createNativeStackNavigator();


export default function App() {
  const [storeId, setStoreId] = React.useState<string>('');
  const storeIdContext = {storeId, setStoreId};

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'wss://epipresto.pagekite.me/graphql',
    }),
  );

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
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

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return (
    <VendorContext.Provider value={storeIdContext}>
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
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Navigation" component={Navigation} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="AllChats" component={AllChats} />
          <Stack.Screen name="ChatPage" component={Chat} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="OrderPage" component={OrderPage} />
          <Stack.Screen name="Inventory" component={Inventory} />
          <Stack.Screen name="Store" component={Store} />
          <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
          <Stack.Screen name="Analytics" component={Analytics} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChatContext.Provider>
  );
}
