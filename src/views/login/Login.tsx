import React, {useContext, useEffect, useReducer} from 'react';
import {Text, Button, Snackbar} from 'react-native-paper';
import {View, Image, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import {LOGIN_BY_EMAIL, LOGIN_BY_USERNAME} from '../../graphql/queries';
import {useLazyQuery} from '@apollo/client/react';
import {LoginStyles} from './LoginStyles';
import {
  initialLoginCredentialsStateReducer,
  LoginCredentialsReducerState,
} from './reducers/LoginCredentialsReducerState';
import {loginCredentialsReducer} from './reducers/LoginCredentialsReducer';
import {VendorContext} from '../../context/Vendor';
import {Credentials, LoginErrorMessage} from '../../interfaces/LoginInterfaces';
import {LoginTextField} from './LoginTextFieldsFields';
import {useTranslation} from 'react-i18next';
import {
  LOGIN_CREATE_ACCOUNT,
  LOGIN_CREDENTIALS_ERROR,
  LOGIN_LOGIN_KEY,
  LOGIN_NEW_TO_APP_KEY,
} from '../../translations/keys/LoginTranslationKeys';
import CredentialInput from '../../components/credential-input/CredentialInput';
import LanguageSelector from '../../components/language-selection/LanguageSelector';
import { ApolloError } from '@apollo/client';
import { EMPTY_KEY } from '../../translations/keys/EmptyTranslationKey';

const Login = ({navigation}: any) => {
  const [{credentials, errorMessage}, dispatchCredentialsState] = useReducer(
    loginCredentialsReducer,
    initialLoginCredentialsStateReducer,
  );
  const {t: translation} = useTranslation('translation');

  const alert = (message: string) => {
    Alert.alert(
      "Alert",
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  const {storeId, setStoreId} = useContext(VendorContext);
  useEffect(() => {
    if (storeId.length > 0) {
      console.log('store id is set ', storeId);
      navigation.navigate('Navigation');
    }
  }, [storeId]);
  
  const onLoginByEmailCompleted = (emailAuthData: any) => {
    console.log(emailAuthData)
    const serverResponse = emailAuthData.loginVendorByEmail
    const loggedWithSuccess = serverResponse.code === 200
    const vendorNotVerified = serverResponse.code === 401
    const invalidCredentials = serverResponse.code === 404
    if (loggedWithSuccess) {
      setStoreId(serverResponse.vendorAccount.store._id)
      return;
    }
    if (vendorNotVerified) {
      alert("Please verify your account")
      return;
    }
    if (invalidCredentials) {
      alert("Your username or password is incorrect")
      return;
    }
  }
  const onLoginByUsernameCompleted = (usernameAuthData: any) => {
    console.log(usernameAuthData)
    const serverResponse = usernameAuthData.loginVendorByUsername
    const loggedWithSuccess = serverResponse.code === 200
    const vendorNotVerified = serverResponse.code === 401
    const invalidCredentials = serverResponse.code === 404
    if (loggedWithSuccess) {
      setStoreId(serverResponse.vendorAccount.store._id)
    }
    if (vendorNotVerified) {
      alert("Please verify your account")
      return;
    }
    if (invalidCredentials) {
      alert("Your username or password is incorrect")
      return;
    }
  }
  const onLoginError = (error: ApolloError) => {
    console.log(error)
    alert("Oops something went wrong")
  }

  const [loginByEmail, {
    loading: emailAuthLoading,
  }] = useLazyQuery(LOGIN_BY_EMAIL, {onCompleted: onLoginByEmailCompleted, onError: onLoginError,fetchPolicy:'no-cache'});

  const [loginByUsername, {
    loading: usernameAuthLoading,
  }] = useLazyQuery(LOGIN_BY_USERNAME, {onCompleted: onLoginByUsernameCompleted, onError: onLoginError,fetchPolicy:'no-cache'});

  const areAllCredentialsFieldsValid = (
    credsState: LoginCredentialsReducerState,
  ): boolean => {
    return (
      credsState.credentials.auth.length > 0 &&
      credsState.credentials.password.length > 0
    );
  };

  const handleLogin = () => {
    dispatchCredentialsState({type: 'CHECK_LOGIN_CREDENTIALS'});
    const areCredentialsValid = areAllCredentialsFieldsValid({
      credentials,
      errorMessage,
    });

    if (areCredentialsValid) {
      const isAuthEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        credentials.auth,
      );
      isAuthEmail
        ? loginByEmail({
            variables: {
              email: credentials.auth,
              password: credentials.password,
            },
          })
        : loginByUsername({
            variables: {
              username: credentials.auth,
              password: credentials.password,
            },
          });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={LoginStyles.root}>
      <View style={LoginStyles.imageView}>
        <Image
          style={LoginStyles.image}
          source={require('../../assets/logo.png')}
        />
      </View>
      <View style={LoginStyles.card}>
        <View style={LoginStyles.loginTitleWrapper}>
          <LanguageSelector />
        </View>
        <View style={LoginStyles.fieldsView}>
          {LoginTextField.map((field, index) => (
            <CredentialInput
              key={field.attribute}
              field={field}
              credential={
                credentials[field.attribute as keyof Credentials] as string
              }
              errorMessage={
                errorMessage[
                  (field.attribute + 'Error') as keyof LoginErrorMessage
                ].length > 0
                  ? errorMessage[
                      (field.attribute + 'Error') as keyof LoginErrorMessage
                    ]
                  : (EMPTY_KEY as string)
              }
              dispatch={dispatchCredentialsState}
            />
          ))}
        </View>
        <View style={LoginStyles.loginButtonWrapper}>
          <Button
            style={LoginStyles.button}
            mode="contained"
            onPress={handleLogin}>
            {translation(LOGIN_LOGIN_KEY)}
          </Button>
          <View style={LoginStyles.signUpView}>
            <Text style={LoginStyles.newTo}>
              {translation(LOGIN_NEW_TO_APP_KEY)}
            </Text>
            <Text
              onPress={() => {
                navigation.navigate('SignUp');
              }}
              style={LoginStyles.signUp}>
              {' ' + translation(LOGIN_CREATE_ACCOUNT)}
            </Text>
          </View>
        </View>
      </View>
      <Snackbar
        visible={credentials.showSnackBar}
        onDismiss={() => {}}
        action={{
          label: 'Dismiss',
          onPress: () => {
            dispatchCredentialsState({
              type: 'CHANGE_SNACKBAR_VISIBILITY',
              showSnackBar: false,
            });
          },
        }}>
        {translation(LOGIN_CREDENTIALS_ERROR)}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

export default Login;
