import {useMutation, useQuery} from '@apollo/client';
import React, {useContext, useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import ActiveHours from '../../components/active_hours/ActiveHours';
import CredentialInput from '../../components/credential-input/CredentialInput';
import {VendorContext} from '../../context/Vendor';
import {MODIFY_STORE, MODIFY_VENDORS} from '../../graphql/mutations';
import {GET_STORE_CREDENTIALS_BY_ID} from '../../graphql/queries';
import {SubTitleStyles} from '../../Styles/SubTitleStyles';
import {
  ActivesHour,
  StoreErrorMessage,
  StoreInput,
} from '../../interfaces/StoreInterfaces';
import {ButtonStyles} from '../../Styles/ButtonStyles';
import {TitleSyles} from '../../Styles/TitleStyles';
import {
  SETTINGS_STORE_ERROR_KEY,
  SETTINGS_STORE_MODIFY_KEY,
  SETTINGS_STORE_STATUS_CLOSED_KEY,
  SETTINGS_STORE_STATUS_OPEN_KEY,
  SETTINGS_STORE_STATUS_TITLE_KEY,
  SETTINGS_STORE_SUCCESS_KEY,
  SETTINGS_STORE_TITLE_KEY,
} from '../../translations/keys/SettingsTranslationsKeys';
import {storeCredentialsReducer} from './reducers/StoreCredentialsReducer';
import {initialStoreCredentialsState} from './reducers/StoreCredentialsReducerState';
import {StoreStyles} from './StoreStyles';
import {StoreTextFields} from './StoreTextFields';
import {useSnackbar} from '../../hooks/UiHooks/UiHooks';
import {EMPTY_KEY} from '../../translations/keys/EmptyTranslationKey';

/*
 * Name: Store
 * Description: This component is used to modify the store credentials. It is used by the Settings component.
 * Author: Alessandro van Reusel
 */

const weekdays = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

const Store = ({navigation}: any) => {
  const {t: translation} = useTranslation('translation');
  const [{storeInput, storeErrorMessage}, dispatchCredentialsState] =
    useReducer(storeCredentialsReducer, initialStoreCredentialsState);

  // Snackbar hook to confirm modifications
  const [confirmModificationSnackbar, {open: openConfirmModificationSnackbar}] =
    useSnackbar({
      severity: 'success',
      messageTranslationKey: SETTINGS_STORE_SUCCESS_KEY,
    });

  // Snackbar hook to show errors
  const [modificationErrorSnackbar, {open: openModificationErrorSnackbar}] =
    useSnackbar({
      severity: 'error',
      messageTranslationKey: SETTINGS_STORE_ERROR_KEY,
    });

  // Mutliple functions to add/remove/modify active hours
  function generateActiveHoursSetters(day: string) {
    function updateOpeningHour(
      activeHourIndex: number,
      newOpeningHour: string,
    ) {
      dispatchCredentialsState({
        type: 'SET_OPENING_HOUR',
        day,
        activeHourIndex,
        newOpeningHour,
      });
    }
    function updateClosingHour(
      activeHourIndex: number,
      newClosingHour: string,
    ) {
      dispatchCredentialsState({
        type: 'SET_CLOSING_HOUR',
        day,
        activeHourIndex,
        newClosingHour,
      });
    }
    function addActiveHour() {
      dispatchCredentialsState({type: 'ADD_ACTIVE_HOUR', day});
    }
    function removeActiveHour(activeHourIndex: number) {
      dispatchCredentialsState({
        type: 'REMOVE_ACTIVE_HOUR',
        day,
        activeHourIndex,
      });
    }
    return {
      updateOpeningHour: updateOpeningHour,
      updateClosingHour: updateClosingHour,
      addActiveHour: addActiveHour,
      removeActiveHour: removeActiveHour,
    };
  }
  // Handle the store credentials input from the query
  const handleStoreCredentials = (storeCredentialsData: any) => {
    if (!storeCredentialsData) return;
    dispatchCredentialsState({
      type: 'SET_STORE_CREDENTIALS',
      data: storeCredentialsData.getStoreById.store,
    });
  };

  const {storeId} = useContext(VendorContext);
  // Query to get the store credentials
  const {loading} = useQuery(GET_STORE_CREDENTIALS_BY_ID, {
    variables: {idStore: storeId},
    onCompleted: handleStoreCredentials,
    fetchPolicy: 'no-cache',
  });
  // Mutation to modify the store credentials
  const [storeChanges] = useMutation(MODIFY_STORE, {
    onCompleted: () => {},
  });
  // Mutation to modify the vendor credentials
  const [vendorChanges] = useMutation(MODIFY_VENDORS, {
    onCompleted: () => {},
  });
  // Check if the credentials are valid
  const areAllCredentialsFieldsValid = (): boolean => {
    let areAllActiveHoursValid = true;
    storeInput.disponibilities.forEach((activeHours: Array<ActivesHour>) => {
      activeHours.forEach((activeHour: ActivesHour) => {
        if (
          activeHour.errorEndingHour !== '' ||
          activeHour.errorOpeningHour !== ''
        )
          areAllActiveHoursValid = false;
      });
    });
    const currErrorMessages = storeErrorMessage;
    return (
      areAllActiveHoursValid &&
      currErrorMessages.shopNameError.size === 0 &&
      currErrorMessages.addressError.size === 0 &&
      currErrorMessages.phoneError.size === 0
    );
  };
  // Create a update store object for the mutation
  const getUpdateStoreObject = () => {
    let disponibilitiesObject: Array<any> = [];
    storeInput.disponibilities.forEach((value, key) => {
      let activeHoursObject: Array<any> = [];
      value.forEach((activeHour: ActivesHour) => {
        activeHoursObject.push({
          openingHour: activeHour.openingHour,
          endingHour: activeHour.endingHour,
        });
      });
      disponibilitiesObject.push({day: key, activesHours: activeHoursObject});
    });
    return {
      name: storeInput.shopName,
      address: storeInput.address,
      disponibilities: disponibilitiesObject,
      isPaused: storeInput.isPaused,
    };
  };

  // Handle modifications from the user
  const handleModify = () => {
    dispatchCredentialsState({type: 'CHECK_STORE_CREDENTIALS'});
    const areCredentialsValid = areAllCredentialsFieldsValid();
    if (areCredentialsValid) {
      const updateStoreObject = getUpdateStoreObject();
      storeChanges({
        variables: {storeId: storeId, fieldsToUpdate: updateStoreObject},
      }).then(r => {
        if (r.data.updateStore.code === 200)
          vendorChanges({
            variables: {
              vendorId: storeInput.idVendor,
              fieldsToUpdate: {phone: storeInput.phone},
            },
          }).then(r => {
            if (r.data.updateVendorAccount.code === 200)
              openConfirmModificationSnackbar();
            else openModificationErrorSnackbar();
          });
        else openModificationErrorSnackbar();
      });
    } else {
      openModificationErrorSnackbar();
    }
  };

  return (
    <SafeAreaView style={StoreStyles.root}>
      <View style={[TitleSyles.view, StoreStyles.titleView]}>
        <TouchableOpacity
          style={StoreStyles.back_button}
          onPress={() => navigation.goBack()}>
          <Image
            style={StoreStyles.back_button_icon}
            source={require('../../assets/icons/back.png')}
          />
        </TouchableOpacity>
        <Text style={TitleSyles.headline}>
          {translation(SETTINGS_STORE_TITLE_KEY)}
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
      ) : (
        <ScrollView>
          <View style={StoreStyles.fieldsView}>
            {StoreTextFields.map(field => {
              return (
                <CredentialInput
                  key={field.attribute}
                  field={field}
                  credential={
                    storeInput[field.attribute as keyof StoreInput] as string
                  }
                  errorMessage={
                    storeErrorMessage[
                      (field.attribute + 'Error') as keyof StoreErrorMessage
                    ].size > 0
                      ? storeErrorMessage[
                          (field.attribute + 'Error') as keyof StoreErrorMessage
                        ]
                          .values()
                          .next().value
                      : (EMPTY_KEY as string)
                  }
                  dispatch={dispatchCredentialsState}
                />
              );
            })}
          </View>
          <Text style={SubTitleStyles.text}>
            {translation(SETTINGS_STORE_STATUS_TITLE_KEY)}
          </Text>
          <View style={StoreStyles.statusView}>
            <Text style={StoreStyles.text}>
              {' '}
              {translation(
                storeInput.isPaused
                  ? SETTINGS_STORE_STATUS_OPEN_KEY
                  : SETTINGS_STORE_STATUS_CLOSED_KEY,
              )}
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={storeInput.isPaused ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              style={{marginLeft: 10}}
              onValueChange={() =>
                dispatchCredentialsState({type: 'CHANGE_STATUS'})
              }
              value={storeInput.isPaused}
            />
          </View>
          <View>
            {weekdays.map(day => {
              const {
                updateOpeningHour,
                updateClosingHour,
                addActiveHour,
                removeActiveHour,
              } = generateActiveHoursSetters(day);
              return (
                <View key={day}>
                  <ActiveHours
                    day={day}
                    activeHours={
                      storeInput.disponibilities.get(day) as Array<ActivesHour>
                    }
                    updateOpeningHour={updateOpeningHour}
                    updateClosingHour={updateClosingHour}
                    addActiveHour={addActiveHour}
                    removeActiveHour={removeActiveHour}></ActiveHours>
                </View>
              );
            })}
          </View>
          <Button
            style={[ButtonStyles.button, StoreStyles.button]}
            mode="contained"
            onPress={handleModify}>
            {translation(SETTINGS_STORE_MODIFY_KEY)}
          </Button>
          {modificationErrorSnackbar}
          {confirmModificationSnackbar}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Store;
