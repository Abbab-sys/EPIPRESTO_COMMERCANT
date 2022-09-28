import React from "react"
import { Keyboard, KeyboardTypeOptions, StyleSheet, View } from "react-native"
import { Button, Text, TextInput, Card, HelperText} from 'react-native-paper'
import {signUpStyles} from "./SignUpStyles";
import {fieldsArray} from "./SignUpFields";
import {initialSignUpCredentialsState} from "./reducers/SignUpCredentialsReducerState";
import {signUpCredentialsReducer} from "./reducers/SignUpCredentialsReducer";
import { SignUpCredentialsReducerActions } from "./reducers/SignUpCredentialsReducerActions";
import { AccountInput, SignUpErrorMessage } from "../../interfaces/SignUpInterfaces";
import { useTranslation } from "react-i18next";


const SignUp = () => {
    const {t: translation} = useTranslation('translation')
    const [{verifyPassword, accountInput, signUpErrorMessage}, dispatchCredentialsState]
    = React.useReducer(signUpCredentialsReducer, initialSignUpCredentialsState);
    const errorExists = (attribut: string) => {
        return signUpErrorMessage[attribut + 'Error' as keyof SignUpErrorMessage] === undefined ? false : signUpErrorMessage[attribut + 'Error' as keyof SignUpErrorMessage].length > 0;
    }
    return ( 
        <View style={signUpStyles.root}>
            <View style={signUpStyles.signUp}>
                <Text>Sign Up</Text>
            </View>
            <Card style={signUpStyles.card}>
                <View style={signUpStyles.fieldsView}>
                    {fieldsArray.map((field, index) => {
                        return (
                            <View style={signUpStyles.fieldView}>
                                <Text>{field.label}</Text>
                                <TextInput
                                    style={{height: 40}}
                                    key={index}
                                    value={field.attribut === 'confirmPassword' ? verifyPassword : accountInput[field.attribut as keyof AccountInput]}
                                    keyboardType={field.keyboardType as KeyboardTypeOptions}
                                    secureTextEntry={field.secure}
                                    onChangeText={(text) => {dispatchCredentialsState(field.onChange(text) as SignUpCredentialsReducerActions)}}
                                    mode="outlined"
                                    error={false}
                                />
                                <HelperText style={{
                                    height: errorExists(field.attribut) ? 'auto' : 0,
                                }} padding='none' type="error">
                                    {translation(signUpErrorMessage[field.attribut + 'Error' as keyof SignUpErrorMessage])}
                                </HelperText>
                            </View>
                        )
                    })}
                    </View>
                    <View style={signUpStyles.buttonView}>
                        <Button style={signUpStyles.button} mode='contained' onPress={() => {dispatchCredentialsState({type :'CHECK_SIGN_UP_CREDENTIALS'})}}>Sign Up</Button>
                    </View>
                
            </Card>
        </View>
    )
}

export default SignUp