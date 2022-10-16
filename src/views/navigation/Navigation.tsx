import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "../home/Home";
import Inventory from "../inventory/Inventory";
import Login from "../login/Login";
import SignUp from "../sign_up/SignUp";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from "react-native";
import Orders from "../orders/Orders";
import { NavigationTabScreens } from "./NavigationTabScreens";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  
  const Tab = createBottomTabNavigator();
  const {t: translation} = useTranslation('translation');

  return(
    <Tab.Navigator screenOptions={{headerShown:false}}>
      
      {NavigationTabScreens.map((screen, index) => (
        <Tab.Screen 
        name={screen.navigationName} 
        component={screen.component} 
        key={index} 
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Icon name={screen.iconName} size={size} color={focused ? '#FFA500' : '#707070'} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{color: focused ? '#FFA500' : '#707070'}}>{translation(screen.title)}</Text>
          )
        }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default Navigation