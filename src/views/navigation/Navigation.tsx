import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text} from 'react-native';
import {NavigationTabScreens} from './NavigationTabScreens';
import {useTranslation} from 'react-i18next';

const Navigation = () => {
  const Tab = createBottomTabNavigator();

  const {t: translation} = useTranslation('translation');

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      {NavigationTabScreens.map((screen, index) => (
        <Tab.Screen
          name={screen.navigationName}
          component={screen.component}
          key={index}
          options={{
            tabBarIcon: ({size, focused}) => (
              <Icon
                name={screen.iconName}
                size={size}
                color={focused ? '#FFA500' : '#707070'}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text style={{color: focused ? '#FFA500' : '#707070', fontSize: 10}}>
                {translation(screen.title)}
              </Text>
            ),
            tabBarLabelPosition: 'below-icon',
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Navigation;
