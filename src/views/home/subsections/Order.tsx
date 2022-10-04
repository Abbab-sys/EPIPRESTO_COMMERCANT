import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

interface OrderTemplateProps {
  orderNum: number;
  clientName: string;
}

const OrderTemplate = (props: OrderTemplateProps) => {
  return (
    <View style={orderStyles.container}>
      <Text variant="titleSmall">{`Commande #${props.orderNum}`}</Text>
      <Text variant="titleSmall">Client</Text>
      <Text variant="titleSmall">{props.clientName}</Text>
    </View>
  );
};

const orderStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});

export default OrderTemplate;
