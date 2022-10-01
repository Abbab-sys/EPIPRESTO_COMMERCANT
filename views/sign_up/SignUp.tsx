import React, { useContext, useEffect, useState } from 'react';
import {KeyboardAvoidingView, KeyboardTypeOptions, View} from 'react-native';
import {Button, Card, HelperText, Snackbar, Text, TextInput} from 'react-native-paper';
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
import CredentialInput from '../../components/credentialInput/CredentialInput';
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { IS_VENDOR_EMAIL_USED, IS_VENDOR_USERNAME_USED } from "../../queries";
import { SIGN_UP } from "../../mutations";
import { VendorContext } from '../../context/Vendor';

const SignUp = () => {
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

  const [isEmailUsed, {loading: emailUsedLoading, error: emailUsedError, data: emailUsedData}] = useLazyQuery(IS_VENDOR_EMAIL_USED);
  const [isUsernameUsed, {loading: usernameUsedLoading, error: usernameUsedError, data: usernameUsedData}] = useLazyQuery(IS_VENDOR_USERNAME_USED);
  const [signUp, {loading: signUpLoading, error: signUpError, data: signUpData}] = useMutation(SIGN_UP);

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

  // useEffect(() => {
  //   if (usernameUsedData && usernameUsedData.isVendorUsernameUsed) {
  //     setDisabled(true)
  //     dispatchCredentialsState({
  //       type: "SET_USERNAME_AS_ALREADY_USED",
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
  //       type: "SET_USERNAME_AS_UNUSED",
  //     })
  //   }
  // }, [usernameUsedLoading, usernameUsedError, usernameUsedData])

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

  const [disabled, setDisabled] = useState(
    signUpErrorMessage.emailError.length > 0 ||
    signUpErrorMessage.usernameError.length > 0 ||
    emailUsedLoading ||
    usernameUsedLoading ||
    !areAllCredentialsFieldsValid()
  )

  return (
    <View style={signUpStyles.root}>
      <View style={signUpStyles.signUp}>
        <Text>{translation(SIGN_UP_TITLE_KEY)}</Text>
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
              errorMessage={translation(
                      signUpErrorMessage[
                        (field.attribute + 'Error') as keyof SignUpErrorMessage
                      ],
                    )} 
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
