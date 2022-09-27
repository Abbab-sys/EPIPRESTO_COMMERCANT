import React, { useContext, useReducer } from "react";
import { TextInput, Text, Button, HelperText, Snackbar } from "react-native-paper";
import { SafeAreaView, StyleSheet, View, Image, Keyboard} from "react-native";
import { LOGIN_BY_EMAIL, LOGIN_BY_USERNAME } from "../../queries";
import { useLazyQuery } from "@apollo/client/react";
import { initialLoginCredentialsStateReducer, LoginCredentialsReducerState } from "./reducers/LoginCredentialsReducerState";
import { loginCredentialsReducer } from "./reducers/LoginCredentialsReducer";
import { VendorContext } from "../../context/Vendor";

const Login = () => {
  const [{credentials, errorMessage}, dispatchCredentialsState]
        = useReducer(loginCredentialsReducer, initialLoginCredentialsStateReducer);

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

    return (
      <View style={styles.container}>
          <Image style={styles.image} source={require('../../../assets/logo.png')}/>
            <TextInput
            label='Email'
            value={credentials.auth}
            onChangeText={(text) => dispatchCredentialsState({
              type: "CHANGE_AUTH",
              newAuth: text
          })}
            error={errorMessage.authErrorTranslationKey.length > 0}
            />
            <HelperText type='error'>
              {errorMessage.authErrorTranslationKey}
            </HelperText>
            <TextInput
            label='Password'
            secureTextEntry={true}
            value={credentials.password}
            onChangeText={(text) => dispatchCredentialsState({
              type: "CHANGE_PASSWORD",
              newPassword: text
          })}
            error={errorMessage.passwordErrorTranslationKey.length > 0}
            />
            <HelperText type='error'>
              {errorMessage.passwordErrorTranslationKey}
            </HelperText>
          <Button mode="text" onPress={() => handleLogin()}>Login</Button>
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
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // alignItems: "center",
      // justifyContent: "center",
    },


   
    image: {
      resizeMode:'contain',
      alignSelf:'center',
      aspectRatio : 1.5
      },
   
    inputView: {
      backgroundColor: "#FFC0CB",
      borderRadius: 20,
      width: "70%",
      height: 30,
      marginBottom: 20,
      alignItems: "center",
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 5,
      marginLeft: 20,
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
   
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#FF1493",
    },
  });

  export default Login;