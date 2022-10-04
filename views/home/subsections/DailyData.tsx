import React from "react"
import { View } from "react-native"
import { Card, Text } from "react-native-paper"
import { homeStyles } from "../HomeStyles"
import { dailyDataStyles } from "./DailyDataStyles";

export enum DataType {
  ORDERS = "COMMANDES",
  INCOME = "REVENU"
}

export interface DailyDataProps {
  dataType: DataType;
  dataAmount: number;
}

const DailyData = (props: DailyDataProps) => {

  return (
    <View style={dailyDataStyles.root}>
      <Card style={dailyDataStyles.cardStyle}>
        <Text variant="titleLarge" style={dailyDataStyles.innerCardTitle}>{props.dataType.toUpperCase()}</Text>
        <Text variant="titleLarge" style={dailyDataStyles.data}>
          {props.dataType === DataType.ORDERS ? props.dataAmount : `${props.dataAmount}$`}
        </Text>
      </Card>
    </View>
  )
}

export default DailyData;