import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {dailyDataStyles} from './DailyDataStyles';

/*
 * Name: DailyData
 * Description: This component is used to display the daily statistic of the vendor.
 * Author: Zouhair Derouich
 */

export enum DataType {
  ORDERS = 'orders',
  INCOME = 'income',
}

export interface DailyDataProps {
  dataType: DataType;
  dataAmount: number;
}

const DailyData = (props: DailyDataProps) => {
  const {t} = useTranslation('translation');

  return (
    <View style={dailyDataStyles.root}>
      <Card style={dailyDataStyles.cardStyle}>
        <Text variant="titleSmall" style={dailyDataStyles.innerCardTitle}>
          {t('home.' + props.dataType).toUpperCase()}
        </Text>
        <Text variant="titleSmall" style={dailyDataStyles.data}>
          {props.dataType === DataType.ORDERS
            ? props.dataAmount
            : `${props.dataAmount}$`}
        </Text>
      </Card>
    </View>
  );
};

export default DailyData;
