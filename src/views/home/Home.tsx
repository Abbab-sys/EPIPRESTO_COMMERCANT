import React, { useState } from "react"
import { FlatList, SafeAreaView, View } from "react-native"
import { Text, Card } from 'react-native-paper'
import { homeStyles } from "./HomeStyles";
import Swiper from "react-native-swiper";
import Login from "../login/Login";
import SignUp from "../sign_up/SignUp";
import DailyData, { DailyDataProps, DataType } from "./subsections/DailyData";
import OrderTemplate from "./subsections/OrderTemplate";

const Home = () => {

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
      <View style={homeStyles.view}>
        <Text variant="headlineMedium" style={homeStyles.headline}>
          Marché TEST !
        </Text>
      </View>
      <Card style={homeStyles.cardStyle}>
        <Text variant="titleMedium" style={homeStyles.cardTitle}>
          Bonjour, voici les données de la journée !
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
      <Text variant="titleMedium">Commandes récentes</Text>
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
