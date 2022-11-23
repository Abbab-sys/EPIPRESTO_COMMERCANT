import React, { useContext, useState } from "react"
import { FlatList, SafeAreaView, View } from "react-native"
import { Text, Card, ActivityIndicator } from 'react-native-paper'
import { homeStyles } from "./HomeStyles";
import DailyData, { DailyDataProps, DataType } from "./subsections/DailyData";
import OrderTemplate from "./subsections/OrderTemplate";
import { Trans, useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { GET_ALL_ORDERS_BY_STORE_ID, GET_ANALYTICS } from "../../graphql/queries";
import { VendorContext } from "../../context/Vendor";
import { NO_ORDER_KEY } from "../../translations/keys/HomeTranslationKeys";
import { ScrollView } from "react-native-gesture-handler";
import { DashboardAnalyticsInterface } from "../../interfaces/DashboardAnalyticsInterface";



const Home = ({navigation}: any) => {

  const {t} = useTranslation('translation')

  const {storeId} = useContext(VendorContext)

  const [analytics, setAnalytics] = useState<DashboardAnalyticsInterface>({
    totalOrders: 0,
    totalSales: 0,
  })

  const {data, loading, error} = useQuery(GET_ALL_ORDERS_BY_STORE_ID, {
    variables: {
      idStore: storeId,
    },
  });

  const { data: analyticsData, loading: analyticsLoading, error: analyticsError } = useQuery(GET_ANALYTICS, {
    variables: {
        idStore: storeId,
        dateFrom: (new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate())).toUTCString(),
        dateTo: (new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() + 1)).toUTCString()
    },
    fetchPolicy: 'network-only',
    onCompleted(data) {
        const result = data.getAnalytics
        const object: DashboardAnalyticsInterface = {
            totalOrders: result.totalOrders,
            totalSales: result.totalSales,
        }
        setAnalytics(object)
    }
}) 

  const dailyData: DailyDataProps[] = [
    {
      dataType: DataType.ORDERS,
      dataAmount: analytics.totalOrders
    },
    {
      dataType: DataType.INCOME,
      dataAmount: analytics.totalSales
    }
  ]

  console.log("DATA: ", analyticsData)
  console.log("ERROR: ", analyticsError)

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
            {
              analyticsLoading ? (
                <ActivityIndicator color="#FFA500" />
              ) : (
                <FlatList
                  numColumns={2}
                  data={dailyData}
                  renderItem={({item}) => 
                    <DailyData
                      dataType={item.dataType}
                      dataAmount={item.dataAmount.toFixed(2)} /> 
                  }
                  keyExtractor={item => item.dataType}
                />
              )
            }
          </SafeAreaView>
        </Card>
        <View style={{flex: 1 , marginTop: '10%'}}>
          <Text style={{justifyContent: 'center', alignSelf: 'center', color: '#FFA500'}} variant="titleMedium">
            {t('home.recentOrders')}
          </Text>
            {
              (!data || data.getStoreById.store.orders.length === 0) ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>{t(NO_ORDER_KEY)}</Text>
                </View> 
              ) : loading ?
              (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size="large" color="#FFA500" />
                </View> 
              ) :
               (
                <ScrollView horizontal>
                  {data.getStoreById.store.orders.slice(-5).reverse().map((order: any, index: number) => (
                    <OrderTemplate
                      key={index}
                      clientName={order.relatedClient.firstName + ' ' + order.relatedClient.lastName}
                      orderNum={order.orderNumber}
                      navigation={() => navigation.navigate('OrderPage', {idOrder: order._id})}
                      />
                  ))}
                </ScrollView>
              )
            }
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home
