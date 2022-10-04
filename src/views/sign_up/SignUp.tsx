import React, {Fragment, useContext, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  Button,
  Card,
  HelperText,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';
import {signUpStyles} from './SignUpStyles';
import {SignUpTextFields} from './SignUpTextFields';
import {initialSignUpCredentialsState} from './reducers/SignUpCredentialsReducerState';
import {signUpCredentialsReducer} from './reducers/SignUpCredentialsReducer';
import {SignUpCredentialsReducerActions} from './reducers/SignUpCredentialsReducerActions';
import {
  AccountInput,
  SignUpErrorMessage,
} from '../../interfaces/SignUpInterfaces';
import {useTranslation} from 'react-i18next';
import { SIGN_UP_CREATE_ACCOUNT_KEY, SIGN_UP_ERROR_ACCOUNT_CREATION_KEY, SIGN_UP_TITLE_KEY } from '../../translations/keys/SignUpTranslationKeys';
import { LoginTextField } from '../login/LoginTextFieldsFields';
import CredentialInput from '../../components/credential-input/CredentialInput';
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { IS_VENDOR_EMAIL_USED, IS_VENDOR_USERNAME_USED } from "../../graphql/queries";
import { SIGN_UP } from "../../graphql/mutations";
import { VendorContext } from '../../context/Vendor';

const SignUp = ({navigation}: any) => {
  const {t: translation} = useTranslation('translation');
  const [
    {verifyPassword, accountInput, signUpErrorMessage},
    dispatchCredentialsState,
  ] = React.useReducer(signUpCredentialsReducer, initialSignUpCredentialsState);
  const errorExists = (attribute: string) => {
    return signUpErrorMessage[
      (attribute + 'Error') as keyof SignUpErrorMessage
    ] === undefined
      ? false
      : signUpErrorMessage[(attribute + 'Error') as keyof SignUpErrorMessage]
          .length > 0;
  };
  const {storeId, setStoreId} = useContext(VendorContext);

  const [
    isEmailUsed,
    {loading: emailUsedLoading, error: emailUsedError, data: emailUsedData},
  ] = useLazyQuery(IS_VENDOR_EMAIL_USED);

  const [
    isUsernameUsed,
    {
      loading: usernameUsedLoading,
      error: usernameUsedError,
      data: usernameUsedData,
    },
  ] = useLazyQuery(IS_VENDOR_USERNAME_USED);

  const [
    signUp,
    {loading: signUpLoading, error: signUpError, data: signUpData},
  ] = useMutation(SIGN_UP);

  const [errorOpen, setErrorOpen] = useState(false);

  // const [emailCheckingTimeout, setEmailCheckingTimeout] = useState(setTimeout(() => isEmailUsed({variables: {email: accountInput.email}}), 500))
  // useEffect(() => {
  //   isEmailUsed({variables: {email: accountInput.email}})
  //   clearTimeout(emailCheckingTimeout)
  //   setEmailCheckingTimeout(setTimeout(() => {
  //     isEmailUsed({variables: {email: accountInput.email}})
  //   }, 500))
  // }, [accountInput.email])

  // const [usernameCheckingTimeout, setUsernameCheckingTimeout] = useState(setTimeout(() => isUsernameUsed({variables: {username: accountInput.username}}), 500))
  // useEffect(() => {
  //   clearTimeout(usernameCheckingTimeout)
  //   setUsernameCheckingTimeout(setTimeout(() => {
  //     isUsernameUsed({variables: {username: accountInput.username}})
  //   }, 500))
    
  // }, [accountInput.username])

  // useEffect(() => {
  //   if (emailUsedData && emailUsedData.isVendorEmailUsed) {
  //     setDisabled(true)
  //     dispatchCredentialsState({
  //       type: "SET_EMAIL_AS_ALREADY_USED",
  //     })
  //   } else {
  //     setDisabled(
  //       signUpErrorMessage.emailError.length > 0 ||
  //       signUpErrorMessage.usernameError.length > 0 ||
  //       emailUsedLoading ||
  //       usernameUsedLoading ||
  //       !areAllCredentialsFieldsValid()
  //     )
  //     dispatchCredentialsState({
  //       type: "SET_EMAIL_AS_UNUSED",
  //     })
  //   }
  // }, [emailUsedLoading, emailUsedError, emailUsedData])

  useEffect(() => {
    if (signUpError) {
      setErrorOpen(true);
      console.log(signUpError);
    }
  }, [signUpError]);
  useEffect(() => {
    if (!signUpData) {
      return;
    }
    if (signUpData.vendorSignUp.code === 200) {
      setStoreId(signUpData.vendorSignUp.vendorAccount.store._id);
    } else {
      setErrorOpen(true);
    }
  }, [signUpData]);
  useEffect(() => {
    if (storeId.length > 0) {
      console.log('store id is set ', storeId);
      navigation.navigate('Home');
    }
  }, [storeId]);

  // useEffect(() => {
  //   if (signUpData && signUpData.vendorSignUp.code === 200) {
  //     setStoreId(signUpData.data.vendorSignUp.vendorAccount.store._id)
  //     // TODO: NAVIGATE TO HOME PAGE
  //   } else {
  //     setErrorOpen(true)
  //   }
  // }, [signUpLoading, signUpError, signUpData])

  const areAllCredentialsFieldsValid = () => {
    const currErrorMessages = signUpErrorMessage;
    return currErrorMessages.emailError === '' ||
      currErrorMessages.usernameError === '' ||
      currErrorMessages.passwordError === '' ||
      currErrorMessages.verifyPasswordError === '' ||
      currErrorMessages.shopNameError === '' ||
      currErrorMessages.addressError === '' ||
      currErrorMessages.phoneError === '';
  }

  // const handleCreateAccount = () => {
  //   dispatchCredentialsState({type: 'CHECK_SIGN_UP_CREDENTIALS'});
  //   const areCredentialsValid = areAllCredentialsFieldsValid()
  //   if (areCredentialsValid) {
  //     signUp({variables: {accountInput: accountInput}})
  //   }
  // }

  const handleCreateAccount = () => {
    dispatchCredentialsState({type: 'CHECK_SIGN_UP_CREDENTIALS'});
    const areCredentialsValid = areAllCredentialsFieldsValid();
    if (areCredentialsValid) {
      console.log(accountInput);
      signUp({variables: {accountInput: accountInput}});
    } else {
      dispatchCredentialsState({type: 'CHECK_SIGN_UP_CREDENTIALS'});
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={signUpStyles.topSafeAreaView} />
      <SafeAreaView style={signUpStyles.bottomSafeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={signUpStyles.root}>
          <View style={signUpStyles.signUp}>
            <Text style={signUpStyles.signUpText}>
              {translation(SIGN_UP_TITLE_KEY)}
            </Text>
          </View>
          <View style={signUpStyles.card}>
            <ScrollView>
              <View style={signUpStyles.fieldsView}>
                {SignUpTextFields.map(field => {
                  return (
                    <CredentialInput
                      key={field.attribute}
                      field={field}
                      credential={
                        field.attribute === 'confirmPassword'
                          ? verifyPassword
                          : accountInput[field.attribute as keyof AccountInput]
                      }
                      errorMessage={
                        signUpErrorMessage[
                          (field.attribute +
                            'Error') as keyof SignUpErrorMessage
                        ].size > 0
                          ? translation(
                              signUpErrorMessage[
                                (field.attribute +
                                  'Error') as keyof SignUpErrorMessage
                              ]
                                .values()
                                .next().value,
                            )
                          : ''
                      }
                      dispatch={dispatchCredentialsState}
                    />
                  );
                })}
              </View>
              <View style={signUpStyles.buttonView}>
                <Button
                  disabled={submitButtonShouldBeDisabled()}
                  style={signUpStyles.button}
                  mode="contained"
                  onPress={() => handleCreateAccount()}>
                  {translation(SIGN_UP_CREATE_ACCOUNT_KEY)}
                </Button>
              </View>
              <Snackbar
                visible={errorOpen}
                onDismiss={() => {}}
                action={{
                  label: 'Dismiss',
                  onPress: () => {
                    setErrorOpen(false);
                  },
                }}>
                {translation(SIGN_UP_ERROR_ACCOUNT_CREATION_KEY)}
              </Snackbar>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Fragment>
  );
};

export default SignUp;
