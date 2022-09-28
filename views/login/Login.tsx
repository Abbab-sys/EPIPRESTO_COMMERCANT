import React, { useContext, useReducer } from "react";
import { TextInput, Text, Button, HelperText, Snackbar, Card } from "react-native-paper";
import { SafeAreaView, StyleSheet, View, Image, Keyboard, KeyboardTypeOptions} from "react-native";
import { LOGIN_BY_EMAIL, LOGIN_BY_USERNAME } from "../../queries";
import { useLazyQuery } from "@apollo/client/react";
import { LoginStyles } from './LoginStyles';
import { initialLoginCredentialsStateReducer, LoginCredentialsReducerState } from "./reducers/LoginCredentialsReducerState";
import { loginCredentialsReducer } from "./reducers/LoginCredentialsReducer";
import { VendorContext } from "../../context/Vendor";
import { Credentials, LoginErrorMessage } from "../../interfaces/LoginInterfaces";
import { LoginCredentialsStateReducerAction } from "./reducers/LoginCredentialsReducerActions";
import { SignUpErrorMessage } from "../../interfaces/SignUpInterfaces";
import { fieldsArray } from "./LoginFields";
import { useTranslation } from "react-i18next";
import { LOGIN_LOGIN_KEY } from "../../translations/keys/LoginTranslationKeys";

const Login = () => {
  const [{credentials, errorMessage}, dispatchCredentialsState]
        = useReducer(loginCredentialsReducer, initialLoginCredentialsStateReducer);
  const {t: translation} = useTranslation('translation');
  
  const [loginByEmail] = useLazyQuery(LOGIN_BY_EMAIL);
  
  const [loginByUsername] = useLazyQuery(LOGIN_BY_USERNAME);
  
  
  function areAllCredentialsFieldsValid(credsState: LoginCredentialsReducerState): boolean {
  
    return credsState.credentials.auth.length > 0 && credsState.credentials.password.length > 0
  }

  const {storeId, setStoreId} = useContext(VendorContext);
  
  const handleLogin = async () => {
    Keyboard.dismiss()
    dispatchCredentialsState({type: 'CHECK_LOGIN_CREDENTIALS'})
    const areCredentialsValid = areAllCredentialsFieldsValid({credentials, errorMessage})
    if (areCredentialsValid) {
        const isAuthEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.auth)
        const loginResponse = isAuthEmail
            ? await loginByEmail({variables: {email: credentials.auth, password: credentials.password}})
            : await loginByUsername({variables: {username: credentials.auth, password: credentials.password}})

        const serverResponse= (isAuthEmail)? loginResponse.data.loginVendorByEmail : loginResponse.data.loginVendorByUsername
        const loggedWithSuccess =serverResponse.code

        if (loggedWithSuccess !== 404) {
            setStoreId(serverResponse.vendorAccount.store._id)
        } else {
            dispatchCredentialsState({type:'SHOW_SNACKBAR'})
        }
    }
}

const errorExists = (attribute: string) => {
  return errorMessage[
    (attribute + 'Error') as keyof LoginErrorMessage
  ] === undefined
    ? false
    : errorMessage[(attribute + 'Error') as keyof LoginErrorMessage]
        .length > 0;
};

    return (
      <View style={LoginStyles.root}>
        <View style={LoginStyles.imageView}>
          <Image style={LoginStyles.image} source={require('../../assets/logo.png')}/>
        </View>
        <Card style={LoginStyles.card}>
          <View style={LoginStyles.fieldsView}>
          {fieldsArray.map((field, index) => (
            <View key={field.attribute} style={LoginStyles.fieldView}>
              <Text>{translation(field.title)}</Text>
              <TextInput
                style={{height: 40}}
                label={translation(field.label)}
                value={credentials[field.attribute as keyof Credentials] as string}
                onChangeText={text => dispatchCredentialsState(field.onChange(text) as LoginCredentialsStateReducerAction)}
                keyboardType={field.keyboardType as KeyboardTypeOptions}
                secureTextEntry={field.secure} 
                mode="outlined"
                />
              <HelperText type="error" style={{
                    height: errorExists(field.attribute) ? 'auto' : 0,
                  }}>
                {translation(errorMessage[(field.attribute + "Error") as keyof LoginErrorMessage])}
              </HelperText>
            </View>
          ))}
          </View>
          <View style={LoginStyles.buttonView}>
          <Button style={LoginStyles.button} mode="contained" onPress={() => handleLogin()}>{translation(LOGIN_LOGIN_KEY)}</Button>
          </View>
          <Text>{credentials.auth}</Text>
          <Snackbar
            visible={credentials.showSnackBar}
            onDismiss={() => {}}
            action={{
              label: 'Dismiss',
              onPress: () => {
                dispatchCredentialsState({type:'DISMISS_SNACKBAR'})
              },
            }}>
            Credentials not valid
          </Snackbar>
        </Card>
      </View>
    );
  };


  export default Login;