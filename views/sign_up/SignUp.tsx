import React, { useContext, useEffect, useState } from 'react';
import {View} from 'react-native';
import {Button, Card, HelperText, Snackbar, Text, TextInput} from 'react-native-paper';
import {signUpStyles} from './SignUpStyles';
import {SignUpTextFields} from './SignUpTextFields';
import {initialSignUpCredentialsState} from './reducers/SignUpCredentialsReducerState';
import {signUpCredentialsReducer} from './reducers/SignUpCredentialsReducer';
import {
  AccountInput,
  SignUpErrorMessage,
} from '../../interfaces/SignUpInterfaces';
import {useTranslation} from 'react-i18next';
import { SIGN_UP_CREATE_ACCOUNT_KEY, SIGN_UP_ERROR_ACCOUNT_CREATION_KEY, SIGN_UP_TITLE_KEY } from '../../translations/keys/SignUpTranslationKeys';
import CredentialInput from '../../components/credentialInput/CredentialInput';
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { IS_VENDOR_EMAIL_USED, IS_VENDOR_USERNAME_USED } from "../../queries";
import { SIGN_UP } from "../../mutations";
import { VendorContext } from '../../context/Vendor';
import {useTimeout} from '../../hooks/CredentialsHooks';

const SignUp = () => {
  const {t: translation} = useTranslation('translation');
  const [
    {verifyPassword, accountInput, signUpErrorMessage},
    dispatchCredentialsState,
  ] = React.useReducer(signUpCredentialsReducer, initialSignUpCredentialsState);
  const {storeId, setStoreId} = useContext(VendorContext);

  const [isEmailUsed, {loading: emailUsedLoading, error: emailUsedError, data: emailUsedData}] = useLazyQuery(IS_VENDOR_EMAIL_USED);
  const [isUsernameUsed, {loading: usernameUsedLoading, error: usernameUsedError, data: usernameUsedData}] = useLazyQuery(IS_VENDOR_USERNAME_USED);
  const [signUp, {loading: signUpLoading, error: signUpError, data: signUpData}] = useMutation(SIGN_UP);

  const [errorOpen, setErrorOpen] = useState(false);

  useTimeout({
    callback: isEmailUsed,
    time: 500,
    callbackVars: {variables: {email: accountInput.email}},
    dependencies: [accountInput.email]
  })
  useEffect(() => {
    if (!emailUsedData) return
    
    (emailUsedData.isVendorEmailUsed)
      ? dispatchCredentialsState({type: "SET_EMAIL_AS_ALREADY_USED"})
      : dispatchCredentialsState({type: "SET_EMAIL_AS_UNUSED"})
  }, [emailUsedData])

  useTimeout({
    callback: isUsernameUsed,
    time: 500,
    callbackVars: {variables: {username: accountInput.username}},
    dependencies: [accountInput.username]
  })
  useEffect(() => {
    if (!usernameUsedData) return
    (usernameUsedData.isVendorUsernameUsed)
      ? dispatchCredentialsState({type: "SET_USERNAME_AS_ALREADY_USED"})
      : dispatchCredentialsState({type: "SET_USERNAME_AS_UNUSED"})
  }, [usernameUsedData])

  useEffect(() => {
    if (!signUpData) return
    if (signUpData.vendorSignUp.code === 200) {
      setStoreId(signUpData.vendorSignUp.vendorAccount.store._id)
      // navigate("/synchronization")
    } else {
      setErrorOpen(true)
    }
  }, [setStoreId, signUpData])

  const handleSnackbarClosing = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
  };

  
  const areAllCredentialsFieldsValid = (): boolean => {
    const currErrorMessages = signUpErrorMessage;
    return currErrorMessages.emailError.size === 0 &&
      currErrorMessages.usernameError.size === 0 &&
      currErrorMessages.passwordError.size === 0 &&
      currErrorMessages.verifyPasswordError.size === 0 &&
      currErrorMessages.shopNameError.size === 0 &&
      currErrorMessages.addressError.size === 0 &&
      currErrorMessages.phoneError.size === 0;
  }
  const areAllCredentialsFieldsAreFilled = (): boolean => {
    return accountInput.shopName !== '' &&
      accountInput.email !== '' &&
      accountInput.username !== '' &&
      accountInput.password !== '' &&
      verifyPassword !== '' &&
      accountInput.address !== '' &&
      accountInput.phone !== ''
  }

  const submitButtonShouldBeDisabled = () => {
    return emailUsedLoading ||
      usernameUsedLoading ||
      !areAllCredentialsFieldsValid()
      || !areAllCredentialsFieldsAreFilled()
  }

  const handleCreateAccount = () => {
    dispatchCredentialsState({type: 'CHECK_SIGN_UP_CREDENTIALS'});
    const areCredentialsValid = areAllCredentialsFieldsValid()
    if (areCredentialsValid) {
      signUp({variables: {accountInput: accountInput}}).then(r => console.log(r))
    } else {
      dispatchCredentialsState({type: 'CHECK_SIGN_UP_CREDENTIALS'});
    }
  }

  return (
    <View style={signUpStyles.root}>
      <View style={signUpStyles.signUp}>
        <Text >{translation(SIGN_UP_TITLE_KEY)}</Text>
      </View>
      <Card style={signUpStyles.card}>
        <View style={signUpStyles.fieldsView}>
          {SignUpTextFields.map(field => {
            return (
              <CredentialInput 
              key={field.attribute}
              field={field} 
              credential={field.attribute === 'confirmPassword'
                      ? verifyPassword
                      : accountInput[field.attribute as keyof AccountInput]} 
              errorMessage={signUpErrorMessage[field.attribute + "Error" as keyof SignUpErrorMessage].size > 0 ? translation(signUpErrorMessage[field.attribute + 'Error' as keyof SignUpErrorMessage].values().next().value) : ''}
              dispatch={dispatchCredentialsState}></CredentialInput>
              // <View style={signUpStyles.fieldView} key={field.attribute}>
              //   <Text>{translation(field.title)}</Text>
              //   <TextInput
              //     style={{height: 40}}
              //     label= {translation(field.label)}
              //     value={
              //       field.attribute === 'confirmPassword'
              //         ? verifyPassword
              //         : accountInput[field.attribute as keyof AccountInput]
              //     }
              //     keyboardType={field.keyboardType as KeyboardTypeOptions}
              //     secureTextEntry={field.secure}
              //     onChangeText={text => {
              //       dispatchCredentialsState(
              //         field.onChange(text) as unknown as SignUpCredentialsReducerActions,
              //       );
              //     }}
              //     mode="outlined"
              //     error={false}
              //   />
              //   <HelperText
              //     style={{
              //       height: errorExists(field.attribute) ? 'auto' : 0,
              //     }}
              //     padding="none"
              //     type="error">
              //     {translation(
              //       signUpErrorMessage[
              //         (field.attribute + 'Error') as keyof SignUpErrorMessage
              //       ],
              //     )}
              //   </HelperText>
              // </View>
            );
          })}
        </View>
        <View style={signUpStyles.buttonView}>
          <Button
            style={signUpStyles.button}
            mode="contained"
            onPress={() => dispatchCredentialsState({type: 'CHECK_SIGN_UP_CREDENTIALS'})}>
            {translation(SIGN_UP_CREATE_ACCOUNT_KEY)}
          </Button>
        </View>
        <Snackbar
          visible={errorOpen}
          onDismiss={() => {}}
          action={{
            label: 'Dismiss',
            onPress: () => {
              setErrorOpen(false)
            },
          }}>
          {translation(SIGN_UP_ERROR_ACCOUNT_CREATION_KEY)}
        </Snackbar>
      </Card>
    </View>
  );
};

export default SignUp;
