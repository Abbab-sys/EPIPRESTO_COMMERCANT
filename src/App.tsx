import React from "react";
import { StyleSheet } from "react-native";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import SignUp from "./views/sign_up/SignUp";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18next from "i18next";
import '../i18n';
import Login from "./views/login/Login";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./views/home/Home";
import Navigation from "./views/navigation/Navigation";
import Inventory from "./views/inventory/Inventory";
import { VendorContext } from "./context/Vendor";
import AddProduct from "./views/add_product/AddProduct";
import Orders from "./views/orders/orders";

const Stack = createNativeStackNavigator();

export default function App() {
  const { t, i18n } = useTranslation("translation");
  const [language, setLanguage] = React.useState(i18n.language);
  const [storeId, setStoreId] = React.useState<string>("");
  const storeIdContext = { storeId, setStoreId };
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `{"storeId":"` + storeId + `"}`,
      },
    };
  });
  const httpLink = createHttpLink({
    uri: 'https://epipresto.pagekite.me/',
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  const handleChange = (event: any) => {
    setLanguage(event.target.value as string);
    i18n.changeLanguage(event.target.value).then(() => {
      console.log('Language changed to ' + event.target.value);
    });
  };
  return (
    <VendorContext.Provider value={storeIdContext}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Orders">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Navigation" component={Navigation} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="Orders" component={Orders} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </VendorContext.Provider>
    );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFA500',
  },
});
