import React, { useContext, useState } from "react"
import { FlatList, SafeAreaView, View } from "react-native"
import { Text, Card, ActivityIndicator } from 'react-native-paper'
import { homeStyles } from "./HomeStyles";
import Swiper from "react-native-swiper";
import Login from "../login/Login";
import SignUp from "../sign_up/SignUp";
import DailyData, { DailyDataProps, DataType } from "./subsections/DailyData";
import OrderTemplate from "./subsections/OrderTemplate";
import { Trans, useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { GET_STORE_CREDENTIALS_BY_ID } from "../../graphql/queries";
import { VendorContext } from "../../context/Vendor";

const Home = () => {

  const {t} = useTranslation('translation')

  const {storeId} = useContext(VendorContext)

  const { loading, error, data } = useQuery(
    GET_STORE_CREDENTIALS_BY_ID, 
    {
      variables: {
        idStore: storeId
      },
    }
  )

  const dailyData: DailyDataProps[] = [
    {
      dataType: DataType.ORDERS,
      dataAmount: 10
    },
    {
      dataType: DataType.INCOME,
      dataAmount: 100
    }
  ]

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EAEAEA' }}>
      <View style={homeStyles.root}>
        {!data || !data.getStoreById.store.name ? 
        (
          <View style={homeStyles.view}>
            <ActivityIndicator size={40} color="#FFA500" />
          </View>
        ):(
          <View style={homeStyles.view}>
            <Text variant="headlineMedium" style={homeStyles.headline}>
              <Trans
                i18nKey={'home.shop'}
                values={{
                  shopName: data.getStoreById.store.name
                }}
              />
            </Text>
          </View>
        )}
        <Card style={homeStyles.cardStyle}>
          <Text variant="titleMedium" style={homeStyles.cardTitle}>
            {t('home.welcomeMessage')}
          </Text>
          <SafeAreaView>
            <FlatList
              numColumns={2}
              data={dailyData}
              renderItem={({item}) => 
                <DailyData
                  dataType={item.dataType}
                  dataAmount={item.dataAmount} /> 
              }
              keyExtractor={item => item.dataType}
            />
          </SafeAreaView>
        </Card>
        <Text style={{justifyContent: 'center', alignSelf: 'center'}} variant="titleMedium">
          {t('home.recentOrders')}
        </Text>
        <Swiper showsButtons={true}>
          {/* TODO: MAP MOST RECENT ORDERS */}
          <OrderTemplate clientName="KHALIL ZRIBA" orderNum={1}/>
          <OrderTemplate clientName="ALESSANDRO VAN REUSEL" orderNum={2}/>
          <OrderTemplate clientName="ZOUHAIR DEROUICH" orderNum={3}/>
          <OrderTemplate clientName="RYMA MESSADAA" orderNum={4}/>
          <OrderTemplate clientName="ADAM NAOUI" orderNum={5}/>
        </Swiper>
      </View>
    </SafeAreaView>
  )
}

export default Home
