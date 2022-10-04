import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {KeyboardTypeOptions, View} from 'react-native';
import {HelperText, Text, TextInput} from 'react-native-paper';
import {TextField} from '../../interfaces/textFieldInterface';
import {CredentialInputStyles} from './CredentialInputStyles';

interface CredentialInputProps {
  field: TextField;
  credential: string;
  errorMessage: string;
  dispatch: (action: any) => void;
}

const CredentialInput = (props: CredentialInputProps) => {
  const {t: translation, i18n} = useTranslation('translation');
  const [isFocused, setIsFocused] = React.useState(false);
  const [label, setLabel] = React.useState<string>(
    translation(props.field.label),
  );
  useEffect(() => {
    setLabel(translation(props.field.label));
  }, [i18n.language]);
  return (
    <View key={props.field.attribute} style={CredentialInputStyles.fieldView}>
      {!isFocused && (
        <Text style={CredentialInputStyles.title}>
          {translation(props.field.title)}
        </Text>
      )}
      <TextInput
        onFocus={() => setLabel('')}
        onBlur={() => setLabel(translation(props.field.label))}
        style={CredentialInputStyles.textInput}
        label={label}
        value={props.credential}
        onChangeText={text => props.dispatch(props.field.onChange(text))}
        keyboardType={props.field.keyboardType}
        secureTextEntry={props.field.secure}
        mode="outlined"
      />
      <HelperText
        type="error"
        style={{
          height: props.errorMessage.length > 0 ? 'auto' : 0,
        }}>
        {translation(props.errorMessage)}
      </HelperText>
    </View>
  );
};

export default CredentialInput;
