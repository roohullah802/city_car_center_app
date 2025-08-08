import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Others/Home';
import Setting from '../screens/Setting/Setting';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AllLeases from '../screens/Lease/AllLeases';

const Tab = createBottomTabNavigator();

type Obj = {
  name: string;
};

const AppTabs = () => {
  const getTabIcons = (
    route: Obj,
    size: number,
    focused: boolean,
    color: string,
  ) => {
    let iconName;
    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Lease') {
      iconName = focused ? 'car' : 'car-outline';
    } else if (route.name) {
      iconName = focused ? 'settings' : 'settings-outline';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, size, color }) => {
           return getTabIcons(route, size, focused, color);
          },
          headerShown: false,
          tabBarStyle: {
            height: 55
          },
          tabBarActiveTintColor:"black",
          tabBarLabelStyle:{
            fontSize: 10
          }
        };
      }}
    >
      <Tab.Screen name="Home">{props => <Home {...props} />}</Tab.Screen>

      <Tab.Screen name="Lease">{props => <AllLeases {...props} />}</Tab.Screen>

      <Tab.Screen name="Settings">{props => <Setting {...props} />}</Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppTabs;
