import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, Card, BottomNavigation} from 'react-native-paper';
import {homeStyles} from './HomeStyles';
import Swiper from 'react-native-swiper';
import OrderTemplate from './subsections/Order';
import Login from '../login/Login';
import SignUp from '../sign_up/SignUp';

const Home = () => {
  return (
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
        <View style={homeStyles.innerView}>
          <Card style={homeStyles.cardContent}>
            <Text variant="titleLarge" style={homeStyles.innerCardTitle}>
              COMMANDES
            </Text>
            <Text variant="titleLarge" style={homeStyles.data}>
              10
            </Text>
          </Card>
          <Card style={homeStyles.cardContent}>
            <Text variant="titleLarge" style={homeStyles.innerCardTitle}>
              REVENU
            </Text>
            <Text variant="titleLarge" style={homeStyles.data}>
              100$
            </Text>
          </Card>
        </View>
      </Card>
      <Text variant="titleMedium">Commande récentes</Text>
      <Swiper showsButtons={true}>
        {/* TODO: MAP MOST RECENT ORDERS */}
        <OrderTemplate clientName="KHALIL ZRIBA" orderNum={1} />
        <OrderTemplate clientName="ALESSANDRO VAN REUSEL" orderNum={2} />
        <OrderTemplate clientName="ZOUHAIR DEROUICH" orderNum={3} />
        <OrderTemplate clientName="RYMA MESSADAA" orderNum={4} />
        <OrderTemplate clientName="ADAM NAOUI" orderNum={5} />
      </Swiper>
    </View>
  );
};

export default Home;
