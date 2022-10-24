import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Switch, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveHours from "../../components/active_hours/ActiveHours";
import CredentialInput from "../../components/credential-input/CredentialInput";
import { VendorContext } from "../../context/Vendor";
import { MODIFY_STORE, MODIFY_VENDORS } from "../../graphql/mutations";
import { GET_STORE_CREDENTIALS_BY_ID } from "../../graphql/queries";
import { SubTitleStyles } from "../../Styles/SubTitleStyles";
import { ActivesHour, StoreErrorMessage, StoreInput } from "../../interfaces/StoreInterfaces";
import { ButtonStyles } from "../../Styles/ButtonStyles";
import { TitleSyles } from "../../Styles/TitleStyles";
import { SETTINGS_STORE_ERROR_KEY, SETTINGS_STORE_MODIFY_KEY, SETTINGS_STORE_STATUS_CLOSED_KEY, SETTINGS_STORE_STATUS_OPEN_KEY, SETTINGS_STORE_STATUS_TITLE_KEY, SETTINGS_STORE_SUCCESS_KEY, SETTINGS_STORE_TITLE_KEY } from "../../translations/keys/SettingsTranslationsKeys";
import { storeCredentialsReducer } from "./reducers/StoreCredentialsReducer";
import { initialStoreCredentialsState } from "./reducers/StoreCredentialsReducerState";
import { StoreStyles } from "./StoreStyles";
import { StoreTextFields } from "./StoreTextFields";
import { useSnackbar } from "../../hooks/UiHooks/UiHooks";

const weekdays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]


const Store = () => {

    const {t: translation} = useTranslation('translation');
    const [{storeInput, storeErrorMessage}, dispatchCredentialsState]
    = useReducer(storeCredentialsReducer, initialStoreCredentialsState);

    const [confirmModificationSnackbar, {open: openConfirmModificationSnackbar, close: closeConfirmModificationSnackbar}] = useSnackbar({
      severity: 'success',
      messageTranslationKey: SETTINGS_STORE_SUCCESS_KEY
    })
    const [modificationErrorSnackbar, {open: openModificationErrorSnackbar, close: closeModificationErrorSnackbar}] = useSnackbar({
      severity: 'error',
      messageTranslationKey: SETTINGS_STORE_ERROR_KEY
    })

    function generateActiveHoursSetters(day:string){
      function updateOpeningHour (activeHourIndex:number,newOpeningHour:string){
        dispatchCredentialsState({ type: 'SET_OPENING_HOUR', day, activeHourIndex, newOpeningHour})
      }
      function updateClosingHour (activeHourIndex:number,newClosingHour:string) {
        dispatchCredentialsState({type: 'SET_CLOSING_HOUR', day, activeHourIndex, newClosingHour})
      }
      function addActiveHour(){
        console.log("addActiveHour")
        dispatchCredentialsState({type: 'ADD_ACTIVE_HOUR', day})
      }
      function removeActiveHour(activeHourIndex:number){
        dispatchCredentialsState({type: 'REMOVE_ACTIVE_HOUR', day, activeHourIndex})
      }
      return {updateOpeningHour:updateOpeningHour,updateClosingHour:updateClosingHour, addActiveHour:addActiveHour, removeActiveHour:removeActiveHour}
    }

  
    const handleStoreCredentials = (storeCredentialsData: any) => {
      console.log(storeCredentialsData)
      if (!storeCredentialsData) return
      dispatchCredentialsState({type: "SET_STORE_CREDENTIALS", data: storeCredentialsData.getStoreById.store})
    }

    const {storeId, setStoreId} = useContext(VendorContext)

    const { loading, error, data } = useQuery(GET_STORE_CREDENTIALS_BY_ID, {variables: {idStore: storeId}, onCompleted: handleStoreCredentials, fetchPolicy: "no-cache"})
    const [storeChanges] = useMutation(MODIFY_STORE, {onCompleted: () => console.log("Store changes saved")});
    const [vendorChanges] = useMutation(MODIFY_VENDORS, {onCompleted: () => console.log("Vendor changes saved")});

    const areAllCredentialsFieldsValid = (): boolean => {
      let areAllActiveHoursValid = true
      storeInput.disponibilities.forEach((activeHours:Array<ActivesHour>) => {
        activeHours.forEach((activeHour:ActivesHour) => {
          if (activeHour.errorEndingHour !== "" || activeHour.errorOpeningHour !== "") areAllActiveHoursValid = false
        })
      })
      const currErrorMessages = storeErrorMessage;
      return areAllActiveHoursValid &&
        currErrorMessages.shopNameError.size === 0 &&
        currErrorMessages.addressError.size === 0 &&
        currErrorMessages.phoneError.size === 0;
    }


    const getUpdateStoreObject = () => {
      let disponibilitiesObject:Array<any> = []
      storeInput.disponibilities.forEach((value,key) => {
        let activeHoursObject:Array<any> = []
        value.forEach((activeHour:ActivesHour) => {
          activeHoursObject.push({openingHour: activeHour.openingHour, endingHour: activeHour.endingHour})
        })
        disponibilitiesObject.push({day: key, activesHours: activeHoursObject})
      })
      return {
        name: storeInput.shopName,
        address: storeInput.address,
        disponibilities: disponibilitiesObject
      }
    }
      
  
    const handleModify = () => {
      dispatchCredentialsState({type: 'CHECK_STORE_CREDENTIALS'});
      const areCredentialsValid = areAllCredentialsFieldsValid()
      if (areCredentialsValid) {
        const updateStoreObject = getUpdateStoreObject()
        storeChanges({variables: {storeId:"633cfb2bf7bdb731e893e28b", fieldsToUpdate: updateStoreObject}}).then( r => {
          if(r.data.updateStore.code === 200) vendorChanges({variables: {vendorId: storeInput.idVendor, fieldsToUpdate: {phone: storeInput.phone}}}).then(
            r => {
              if(r.data.updateVendorAccount.code === 200) openConfirmModificationSnackbar()
              else openModificationErrorSnackbar()
            }
          )
          else openModificationErrorSnackbar()
          }
          )
        
      } else {
        openModificationErrorSnackbar()
      }
    }

    return (
       <SafeAreaView style={StoreStyles.root}>
            <View style={TitleSyles.View}>
                <Text style={TitleSyles.Text}>{translation(SETTINGS_STORE_TITLE_KEY)}</Text>
            </View>
            {loading ? <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator> : 
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
            </View>
            <Text style={SubTitleStyles.text}>{translation(SETTINGS_STORE_STATUS_TITLE_KEY)}</Text>
              <View style={StoreStyles.statusView}>
                <Text style={StoreStyles.text}> {translation(storeInput.isOpen ? SETTINGS_STORE_STATUS_OPEN_KEY : SETTINGS_STORE_STATUS_CLOSED_KEY)}</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={storeInput.isOpen ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => dispatchCredentialsState({type: 'CHANGE_STATUS'})}
                  value={storeInput.isOpen}
                />
              </View>
              <View>
                  {weekdays.map(day => {
                    const {updateOpeningHour,updateClosingHour,addActiveHour, removeActiveHour}=generateActiveHoursSetters(day)
                    return(
                      <View key={day}>
                        <ActiveHours day={day} activeHours={storeInput.disponibilities.get(day) as Array<ActivesHour>} 
                        updateOpeningHour={updateOpeningHour} 
                        updateClosingHour={updateClosingHour}
                        addActiveHour={addActiveHour}
                        removeActiveHour={removeActiveHour}
                        ></ActiveHours>
                      </View>
                    )
                  })}
              </View>
              <Button
            style={[ButtonStyles.button, StoreStyles.button]}
            mode="contained"
            onPress={handleModify}>
            {translation(SETTINGS_STORE_MODIFY_KEY )}
          </Button>
          {modificationErrorSnackbar}
          {confirmModificationSnackbar}
            </ScrollView>
            }
       </SafeAreaView>
    );
}

export default Store;