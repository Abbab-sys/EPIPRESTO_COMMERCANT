import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "../home/Home";
import Inventory from "../inventory/Inventory";
import Login from "../login/Login";
import SignUp from "../sign_up/SignUp";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from "react-native";

const Navigation = () => {
  
  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Icon name="home" color={focused ? "#FFA500" : "#707070"} size={size}></Icon>
          ),
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? "#FFA500" : "#707070"}}>Home</Text>
          ),
        }}/>
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Icon name="database" color={focused ? "#FFA500" : "#707070"} size={size}></Icon>
          ),
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? "#FFA500" : "#707070"}}>Inventory</Text>
          ),
        }}/>
    </Tab.Navigator>
  )
}

export default Navigation