import React, { useContext, useEffect, useReducer } from "react";
import { TextInput, Text, Button, HelperText, Snackbar, Card } from "react-native-paper";
import { SafeAreaView, StyleSheet, View, Image, Keyboard, KeyboardTypeOptions} from "react-native";
import { LOGIN_BY_EMAIL, LOGIN_BY_USERNAME } from "../../graphql/queries";
import { useLazyQuery } from "@apollo/client/react";
import { LoginStyles } from './LoginStyles';
import { initialLoginCredentialsStateReducer, LoginCredentialsReducerState } from "./reducers/LoginCredentialsReducerState";
import { loginCredentialsReducer } from "./reducers/LoginCredentialsReducer";
import { VendorContext } from "../../context/Vendor";
import { Credentials, LoginErrorMessage } from "../../interfaces/LoginInterfaces";
import { LoginCredentialsStateReducerAction } from "./reducers/LoginCredentialsReducerActions";
import { SignUpErrorMessage } from "../../interfaces/SignUpInterfaces";
import { LoginTextField } from "./LoginTextFieldsFields";
import { useTranslation } from "react-i18next";
import { LOGIN_CREATE_ACCOUNT, LOGIN_CREDENTIALS_ERROR, LOGIN_LOGIN_KEY, LOGIN_NEW_TO_APP_KEY } from "../../translations/keys/LoginTranslationKeys";
import CredentialInput from "../../components/credential-input/CredentialInput";



const Login = ({navigation} : any) => {
  const [{credentials, errorMessage}, dispatchCredentialsState]
        = useReducer(loginCredentialsReducer, initialLoginCredentialsStateReducer);
  const {t: translation} = useTranslation('translation');
  
  const [loginByEmail, {loading: emailAuthLoading, error: emailAuthError, data: emailAuthData}] = useLazyQuery(LOGIN_BY_EMAIL);
  
  const [loginByUsername, {loading: usernameAuthLoading, error: usernameAuthError, data: usernameAuthData}] = useLazyQuery(LOGIN_BY_USERNAME);

  const {storeId, setStoreId} = useContext(VendorContext);
  
  useEffect(() => {
    if (emailAuthLoading || emailAuthError || !emailAuthData || !emailAuthData.loginVendorByEmail) return
    const serverResponse = emailAuthData.loginVendorByEmail
    const loggedWithSuccess = serverResponse.code === 200
    if (loggedWithSuccess) {
      console.log("SUCCESS EMAIL")
      setStoreId(serverResponse.vendorAccount.store._id)
      // TODO: Add navigation to Home page
    } else {
        dispatchCredentialsState({type:'SHOW_SNACKBAR'})
    }
  }, [emailAuthLoading, emailAuthError, emailAuthData])

  useEffect(() => {
    if (usernameAuthLoading || usernameAuthError || !usernameAuthData || !usernameAuthData.loginVendorByUsername) return
    const serverResponse = usernameAuthData.loginVendorByUsername
    const loggedWithSuccess = serverResponse.code === 200
    
    if (loggedWithSuccess) {
      console.log("SUCCESS USERNAME")
      setStoreId(serverResponse.vendorAccount.store._id)
       // TODO: Add navigation to Home page
    } else {
      dispatchCredentialsState({type:'SHOW_SNACKBAR'})
    }
  }, [usernameAuthLoading, usernameAuthError, usernameAuthData])
  
  const handleLogin = () => {
    Keyboard.dismiss()
    dispatchCredentialsState({type: 'CHECK_LOGIN_CREDENTIALS'})
    if (errorMessage.authError === '' || errorMessage.passwordError === '') {
      const isAuthEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.auth)
      const loginResponse = isAuthEmail
        ? loginByEmail({variables: {email: credentials.auth, password: credentials.password}})
        : loginByUsername({variables: {username: credentials.auth, password: credentials.password}})
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
        <Text style={LoginStyles.loginTitle}>{translation(LOGIN_LOGIN_KEY)}</Text>
        {LoginTextField.map((field, index) => (
          <CredentialInput 
          key={field.attribute}
          field={field} 
          credential={credentials[field.attribute as keyof Credentials] as string} 
          errorMessage={translation(errorMessage[(field.attribute + "Error") as keyof LoginErrorMessage]).length > 0 ? translation(errorMessage[(field.attribute + "Error") as keyof LoginErrorMessage]) : ''} 
          dispatch={dispatchCredentialsState}           
          ></CredentialInput>
          // <View key={field.attribute} style={LoginStyles.fieldView}>
          //   <Text>{translation(field.title)}</Text>
          //   <TextInput
          //     style={LoginStyles.textInput}
          //     label={translation(field.label)}
          //     value={credentials[field.attribute as keyof Credentials] as string}
          //     onChangeText={text => dispatchCredentialsState(field.onChange(text) as LoginCredentialsStateReducerAction)}
          //     keyboardType={field.keyboardType as KeyboardTypeOptions}
          //     secureTextEntry={field.secure} 
          //     mode="outlined"
          //     />
          //   <HelperText type="error" style={{
          //         height: errorExists(field.attribute) ? 'auto' : 0,
          //       }}>
          //     {translation(errorMessage[(field.attribute + "Error") as keyof LoginErrorMessage]).length > 0 ? translation(errorMessage[(field.attribute + "Error") as keyof LoginErrorMessage]) : ''}
          //   </HelperText>
          // </View>
        ))}
        </View>
        <View style={LoginStyles.buttonView}>
        <Button style={LoginStyles.button} mode="contained" onPress={handleLogin}>{translation(LOGIN_LOGIN_KEY)}</Button>
        </View>
        <View style={LoginStyles.signUpView}>
          <Text>{translation(LOGIN_NEW_TO_APP_KEY)}</Text>
          <Text onPress={()=>{
            navigation.navigate('SignUp')
          }} style={LoginStyles.signUp}>{" " + translation(LOGIN_CREATE_ACCOUNT)}</Text>
        </View>
        <Snackbar
          visible={credentials.showSnackBar}
          onDismiss={() => {}}
          action={{
            label: 'Dismiss',
            onPress: () => {
              dispatchCredentialsState({type:'DISMISS_SNACKBAR'})
            },
          }}>
          {translation(LOGIN_CREDENTIALS_ERROR)}
        </Snackbar>
      </Card>
    </View>
  );
};


export default Login;