import React from "react"
import { Trans, useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native"
import { Button, Text } from 'react-native-paper'
import { SafeAreaView } from "react-native-safe-area-context";

interface OrderTemplateProps {
  orderNum: number;
  clientName: string;
  navigation: () => {}
}

const OrderTemplate = (props: OrderTemplateProps) => {

  const {t} = useTranslation('translation')

  return(
    <SafeAreaView style={orderStyles.container}>
      <Text variant="titleSmall" style={orderStyles.text}>
        <Trans
          i18nKey={'home.ordersSection.order'}
          values={{
            orderNum: props.orderNum
          }}
        />
      </Text>
      <Text variant="titleSmall" style={orderStyles.text}>
        Client
      </Text>
      <Text variant="titleSmall" style={orderStyles.text}>
        {props.clientName}
      </Text>
      <Button style={orderStyles.buttonStyle} 
        onPress={() => props.navigation()}
        >
        <Text style={orderStyles.buttonText}>
          {t('home.ordersSection.consult')}
        </Text>
      </Button>
    </SafeAreaView>
  )
}

export const orderStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#F2F4F8',
    elevation: 4,
    margin: 10
  },
  buttonStyle: {
    borderRadius: 30,
    color: "white",
    backgroundColor: "#FFA500",
    margin: 10
  },
  buttonText: {
    color: 'white'
  },
  text: {
    margin: 10
  }
});

export default OrderTemplate