/* eslint-disable prettier/prettier */
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToDo from './ToDo';
import Done from './Done';

export default function HomeTabs() {
const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'To-Do') {
                iconName = 'clipboard-list';
                size = focused ? 25 : 20;
            } else if (route.name === 'Done') {
                iconName = 'clipboard-check';
                size = focused ? 25 : 20;
            }
            return (
                <FontAwesome5
                name={iconName}
                size={size}
                color={color}
                />
            );
            },
            tabBarActiveTintColor: '#0080ff',
            tabBarInactiveTintColor:'#777777',
            tabBarLabelStyle:{
            fontSize: 15, fontWeight: 'bold',
            },
        })
      }
    >
      <Tab.Screen name={'To-Do'} component={ToDo} />
      <Tab.Screen name={'Done'} component={Done} />
    </Tab.Navigator>
  );
}
