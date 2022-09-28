import React from 'react';
import {KeyboardAvoidingView, KeyboardTypeOptions, View} from 'react-native';
import {Button, Card, HelperText, Text, TextInput} from 'react-native-paper';
import {signUpStyles} from './SignUpStyles';
import {fieldsArray} from './SignUpFields';
import {initialSignUpCredentialsState} from './reducers/SignUpCredentialsReducerState';
import {signUpCredentialsReducer} from './reducers/SignUpCredentialsReducer';
import {SignUpCredentialsReducerActions} from './reducers/SignUpCredentialsReducerActions';
import {
  AccountInput,
  SignUpErrorMessage,
} from '../../interfaces/SignUpInterfaces';
import {useTranslation} from 'react-i18next';
import { SIGN_UP_CREATE_ACCOUNT_KEY, SIGN_UP_TITLE_KEY } from '../../translations/keys/SignUpTranslationKeys';

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
  return (
    <View style={signUpStyles.root}>
      <View style={signUpStyles.signUp}>
        <Text>{translation(SIGN_UP_TITLE_KEY)}</Text>
      </View>
      <Card style={signUpStyles.card}>
        <View style={signUpStyles.fieldsView}>
          {fieldsArray.map(field => {
            return (
              <View style={signUpStyles.fieldView} key={field.attribute}>
                <Text>{translation(field.title)}</Text>
                <TextInput
                  style={{height: 40}}
                  label= {translation(field.label)}
                  value={
                    field.attribute === 'confirmPassword'
                      ? verifyPassword
                      : accountInput[field.attribute as keyof AccountInput]
                  }
                  keyboardType={field.keyboardType as KeyboardTypeOptions}
                  secureTextEntry={field.secure}
                  onChangeText={text => {
                    dispatchCredentialsState(
                      field.onChange(text) as SignUpCredentialsReducerActions,
                    );
                  }}
                  mode="outlined"
                  error={false}
                />
                <HelperText
                  style={{
                    height: errorExists(field.attribute) ? 'auto' : 0,
                  }}
                  padding="none"
                  type="error">
                  {translation(
                    signUpErrorMessage[
                      (field.attribute + 'Error') as keyof SignUpErrorMessage
                    ],
                  )}
                </HelperText>
              </View>
            );
          })}
        </View>
        <View style={signUpStyles.buttonView}>
          <Button
            style={signUpStyles.button}
            mode="contained"
            onPress={() => {
              dispatchCredentialsState({type: 'CHECK_SIGN_UP_CREDENTIALS'});
            }}>
            {translation(SIGN_UP_CREATE_ACCOUNT_KEY)}
          </Button>
        </View>
      </Card>
    </View>
  );
};

export default SignUp;
