import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CredentialInput from "../../components/credential-input/CredentialInput";
import { VendorContext } from "../../context/Vendor";
import { SIGN_UP } from "../../graphql/mutations";
import { GET_STORE_CREDENTIALS_BY_ID, IS_VENDOR_USERNAME_USED } from "../../graphql/queries";
import { useTimeout } from "../../hooks/CredentialsHooks";
import { StoreErrorMessage, StoreInput } from "../../interfaces/StoreInterfaces";
import { TitleSyles } from "../../Styles/TitleStyles";
import { SETTINGS_STORE_STATUS_CLOSED_KEY, SETTINGS_STORE_STATUS_OPEN_KEY, SETTINGS_STORE_STATUS_TITLE_KEY, SETTINGS_STORE_TITLE_KEY } from "../../translations/keys/SettingsTranslationsKeys";
import { storeCredentialsReducer } from "./reducers/StoreCredentialsReducer";
import { initialStoreCredentialsState } from "./reducers/StoreCredentialsReducerState";
import { StoreStyles } from "./StoreStyles";
import { StoreTextFields } from "./StoreTextFields";

const Store = () => {

    const {t: translation} = useTranslation('translation');
    const [{storeInput, storeErrorMessage}, dispatchCredentialsState]
    = useReducer(storeCredentialsReducer, initialStoreCredentialsState);

    const [isEnabled, setIsEnabled] = useState(false);


    const handleStoreCredentials = (storeCredentialsData: any) => {
      if (!storeCredentialsData) return
      dispatchCredentialsState({type: "SET_STORE_CREDENTIALS", data: storeCredentialsData.getStoreById.store})
    }

    const {storeId, setStoreId} = useContext(VendorContext)

    const { loading, error, data } = useQuery(GET_STORE_CREDENTIALS_BY_ID, {variables: {idStore: "633cfb2bf7bdb731e893e28b"}, onCompleted: handleStoreCredentials})
    const [storeChanges] = useMutation(SIGN_UP, {onCompleted: () => console.log("Store changes saved")});

    const areAllCredentialsFieldsValid = (): boolean => {
      const currErrorMessages = storeErrorMessage;
      return currErrorMessages.shopNameError.size === 0 &&
        currErrorMessages.addressError.size === 0 &&
        currErrorMessages.phoneError.size === 0;
    }
    const areAllCredentialsFieldsAreFilled = (): boolean => {
      return storeInput.shopName !== '' &&
        storeInput.address !== '' &&
        storeInput.phone !== ''
    }
  
    // const submitButtonShouldBeDisabled = () => {
    //   return usernameUsedLoading ||
    //     !areAllCredentialsFieldsValid()
    //     || !areAllCredentialsFieldsAreFilled()
    // }
  
    const handleCreateAccount = () => {
      dispatchCredentialsState({type: 'CHECK_STORE_CREDENTIALS'});
      const areCredentialsValid = areAllCredentialsFieldsValid()
      if (areCredentialsValid) {
        storeChanges({variables: {accountInput: storeInput}}).then(r => console.log(r))
      }
    }

    return (
       <View>
            <View style={TitleSyles.View}>
                <Text style={TitleSyles.Text}>{translation(SETTINGS_STORE_TITLE_KEY)}</Text>
            </View>
            <ScrollView>
            <View style={StoreStyles.fieldsView}>
              {StoreTextFields.map(field => {
                    return (
                      <CredentialInput
                        key={field.attribute}
                        field={field}
                        credential={ storeInput[field.attribute as keyof StoreInput] as string}
                        errorMessage={
                          storeErrorMessage[
                            (field.attribute +
                              'Error') as keyof StoreErrorMessage
                          ].size > 0
                            ? translation(
                              storeErrorMessage[
                                  (field.attribute +
                                    'Error') as keyof StoreErrorMessage
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
              <View style={StoreStyles.statusView}>
                <Text style={StoreStyles.text}>{translation(SETTINGS_STORE_STATUS_TITLE_KEY)} : {translation(storeInput.isStoreActive ? SETTINGS_STORE_STATUS_OPEN_KEY : SETTINGS_STORE_STATUS_CLOSED_KEY)}</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={storeInput.isStoreActive ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => dispatchCredentialsState({type: 'CHANGE_STATUS'})}
                  value={storeInput.isStoreActive}
                />
              </View>
            </View>
            </ScrollView>
       </View>
    );
}

export default Store;