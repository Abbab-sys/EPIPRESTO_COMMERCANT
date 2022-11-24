import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { TextElement } from "react-native-elements/dist/text/Text";
import { Button, HelperText, IconButton, Text, TextInput } from "react-native-paper";
import { ActivesHour } from "../../interfaces/StoreInterfaces";
import { SubTitleStyles } from "../../Styles/SubTitleStyles";
import { TitleSyles } from "../../Styles/TitleStyles";
import { DISPONIBILITY_CLOSING_HOUR_KEY, DISPONIBILITY_OPEN_HOUR_KEY } from "../../translations/keys/DisponibilityTranslationKeys";
import { EMPTY_KEY } from "../../translations/keys/EmptyTranslationKey";
import { ActiveHoursStyles } from "./ActiveHoursStyles";


interface DisponibilityProps {
    day: string,
    activeHours: Array<ActivesHour>;
    updateOpeningHour:(activeHourIndex:number,newOpeningHour:string) => void
    updateClosingHour:(activeHourIndex:number,newEndingHour:string) => void
    addActiveHour:() => void
    removeActiveHour:(activeHourIndex:number) => void
    // dispatch: (action: any) => void;
  }

const ActiveHours = (props:DisponibilityProps) => {
    const {t: translation} = useTranslation('translation');
    return (
        <View>
            <View style={ActiveHoursStyles.flexDirectionRow}>
                <Text style={[SubTitleStyles.text, ActiveHoursStyles.subTitlesMargin]}>{translation("disponibility.days." + props.day)}</Text>
                <IconButton style={[ActiveHoursStyles.iconSize, ActiveHoursStyles.plusIcon]} iconColor='white' icon="plus-thick" mode='contained' onPress={()=> props.addActiveHour()}></IconButton>
            </View>
            <View style={ActiveHoursStyles.closedText}>
                {props.activeHours.length === 0 && <Text>{translation("disponibility.closed")}</Text>}
            </View>
            
            <ScrollView horizontal >
            {props.activeHours.map((activeHour, index) => {
                return (
                <View style={[ActiveHoursStyles.ActiveHoursView, ActiveHoursStyles.flexDirectionRow]} key={index}>
                    <View style={ActiveHoursStyles.textInputView}>
                        <TextInput
                        label= {
                            <View style={ActiveHoursStyles.textInputLabelView}>
                                <Text style={ActiveHoursStyles.textInputLabel}>{translation(DISPONIBILITY_OPEN_HOUR_KEY)}</Text>
                            </View>
                        }
                        value={activeHour.openingHour as string}
                        onChangeText={text => props.updateOpeningHour(index,text)}
                        keyboardType="numeric"
                        error={activeHour.errorOpeningHour!==''}
                        />
                        <HelperText type="error" visible={activeHour.errorOpeningHour!==''}>
                        {translation(activeHour.errorOpeningHour !== '' ? activeHour.errorOpeningHour : EMPTY_KEY)}
                    </HelperText>
                    </View>
                        <Text style={{fontSize:40}}> - </Text>
                    <View style={ActiveHoursStyles.textInputView}>
                        <TextInput
                        label= {
                            <View style={ActiveHoursStyles.textInputLabelView}>
                                <Text style={ActiveHoursStyles.textInputLabel}>{translation(DISPONIBILITY_CLOSING_HOUR_KEY)}</Text>
                            </View>
                        }
                        value={activeHour.endingHour as string}
                        onChangeText={text => props.updateClosingHour(index,text)}
                        keyboardType="numeric"
                        error={activeHour.errorEndingHour!==''}
                        />
                         <HelperText type="error" visible={activeHour.errorEndingHour!==''}>
                        {translation(activeHour.errorEndingHour !== '' ? activeHour.errorEndingHour : EMPTY_KEY)}
                    </HelperText>
                    {props.activeHours.length >= 0 && <IconButton iconColor="white" style={[ActiveHoursStyles.minusIcon, ActiveHoursStyles.iconSize]} icon="minus-thick" mode='contained' onPress={()=> props.removeActiveHour(index)}></IconButton>}
                    </View>
                </View>
                    )}
                )}
                </ScrollView>                
        </View>
    )
}

export default ActiveHours;