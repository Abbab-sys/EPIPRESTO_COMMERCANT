import {t} from 'i18next';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {HelperText, Text, TextInput} from 'react-native-paper';
import {TextField} from '../../interfaces/textFieldInterface';
import {SubTitleStyles} from '../../Styles/SubTitleStyles';
import {
  SIGN_UP_CATEGORY_BAKERY_KEY,
  SIGN_UP_CATEGORY_BUTCHER_KEY,
  SIGN_UP_CATEGORY_FISH_KEY,
  SIGN_UP_CATEGORY_FRUITS_KEY,
  SIGN_UP_CATEGORY_HEALTHY_KEY,
  SIGN_UP_CATEGORY_KETO_KEY,
  SIGN_UP_CATEGORY_NOT_FOUND_KEY,
  SIGN_UP_CATEGORY_OTHER_KEY,
  SIGN_UP_CATEGORY_PLACEHOLDER_KEY,
  SIGN_UP_CATEGORY_WORLD_KEY,
} from '../../translations/keys/SignUpTranslationKeys';
import {CredentialInputStyles} from './CredentialInputStyles';

/*
 * Name: Credential Input
 * Description: This component is used to display the input fields for the sign up form.
 * Author: Alessandro van Reusel, Adam Naoui-Busson, Zouhair Derouich
 */
interface CredentialInputProps {
  field: TextField;
  isCategory?: boolean;
  credential: string;
  errorMessage: string;
  dispatch: (action: any) => void;
}

const CredentialInput = (props: CredentialInputProps) => {
  const {t: translation, i18n} = useTranslation('translation');
  const [isFocused, setIsFocused] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const [label, setLabel] = React.useState<string>(
    translation(props.field.label),
  );
  useEffect(() => {
    setLabel(translation(props.field.label));
  }, [i18n.language]);

  const categories = [
    {key: '1', value: t(SIGN_UP_CATEGORY_FRUITS_KEY)},
    {key: '2', value: t(SIGN_UP_CATEGORY_FISH_KEY)},
    {key: '3', value: t(SIGN_UP_CATEGORY_HEALTHY_KEY)},
    {key: '4', value: t(SIGN_UP_CATEGORY_KETO_KEY)},
    {key: '5', value: t(SIGN_UP_CATEGORY_BAKERY_KEY)},
    {key: '6', value: t(SIGN_UP_CATEGORY_WORLD_KEY)},
    {key: '7', value: t(SIGN_UP_CATEGORY_BUTCHER_KEY)},
    {key: '8', value: t(SIGN_UP_CATEGORY_OTHER_KEY)},
  ];

  // Handle the category change for the mutation
  const handleMutationCategory = (categoryNum: string) => {
    let mutationCategory = '';
    switch (categoryNum) {
      case '1':
        mutationCategory = 'FRUITS_AND_VEGETABLES';
        break;
      case '2':
        mutationCategory = 'FISH_AND_SEAFOOD';
        break;
      case '3':
        mutationCategory = 'HEALTHY';
        break;
      case '4':
        mutationCategory = 'KETO';
        break;
      case '5':
        mutationCategory = 'BAKERY';
        break;
      case '6':
        mutationCategory = 'WORLD_PRODUCTS';
        break;
      case '7':
        mutationCategory = 'BUTCHER';
        break;
      case '8':
        mutationCategory = 'OTHER';
        break;
      default:
        break;
    }
    return mutationCategory;
  };

  return (
    <View key={props.field.attribute} style={CredentialInputStyles.fieldView}>
      {!isFocused && (
        <Text style={SubTitleStyles.text}>
          {translation(props.field.title)}
        </Text>
      )}
      {props.isCategory ? (
        <View style={{marginTop: '2%'}}>
          {/* 
            // @ts-ignore */}
          <SelectList
            setSelected={(val: string) => {
              setSelected(val);
              props.dispatch(props.field.onChange(handleMutationCategory(val)));
            }}
            data={categories}
            placeholder={t(SIGN_UP_CATEGORY_PLACEHOLDER_KEY)}
            boxStyles={{borderRadius: 4}}
            inputStyles={{
              color: 'rgb(78, 68, 75)',
              fontWeight: '400',
              fontSize: 17,
            }}
            dropdownTextStyles={{color: 'black'}}
            notFoundText={t(SIGN_UP_CATEGORY_NOT_FOUND_KEY)}
          />
        </View>
      ) : (
        <TextInput
          onFocus={() => setLabel('')}
          onBlur={() => setLabel(translation(props.field.label))}
          label={label}
          value={props.credential}
          onChangeText={text => props.dispatch(props.field.onChange(text))}
          keyboardType={props.field.keyboardType}
          secureTextEntry={props.field.secure}
          mode="outlined"
        />
      )}
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
