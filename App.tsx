import React from "react";
import { StyleSheet } from "react-native";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { VendorContext } from "./context/Vendor";
import SignUp from "./views/sign_up/SignUp";
import { useTranslation } from "react-i18next";

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
    uri: "http://localhost:4000/graphql",
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  const handleChange = (event: any) => {
    setLanguage(event.target.value as string);
    i18n.changeLanguage(event.target.value).then(() => {
      console.log("Language changed to " + event.target.value);
    });
  };
  return (
    <VendorContext.Provider value={storeIdContext}>
      <ApolloProvider client={client}>
        <SignUp />
      </ApolloProvider>
    </VendorContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFA500",
  },
});
