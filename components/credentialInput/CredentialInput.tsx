import React from "react";
import { useTranslation } from "react-i18next";
import { KeyboardTypeOptions, View } from "react-native";
import { HelperText, Text, TextInput } from "react-native-paper";
import { TextField } from "../../interfaces/textFieldInterface";
import { CredentialInputStyles } from "./CredentialInputStyles";

interface CredentialInputProps {
    field: TextField;
    credential: string;
    errorMessage: string;
    dispatch: (action:any) => void;
}

const CredentialInput = (props:CredentialInputProps) => {
    const { t: translation } = useTranslation('translation');
    return(
            <View key={props.field.attribute} style={CredentialInputStyles.fieldView}>
              <Text style={CredentialInputStyles.title}>{translation(props.field.title)}</Text>
              <TextInput
                style={CredentialInputStyles.textInput}
                label={translation(props.field.label)}
                value={props.credential}
                onChangeText={text => props.dispatch(props.field.onChange(text))}
                keyboardType={props.field.keyboardType}
                secureTextEntry={props.field.secure} 
                mode="outlined"
                />
              <HelperText type="error" style={{
                    height: props.errorMessage.length > 0  ? 'auto' : 0,
                  }}>
                {props.errorMessage}
              </HelperText>
            </View>
    )
}

export default CredentialInput;