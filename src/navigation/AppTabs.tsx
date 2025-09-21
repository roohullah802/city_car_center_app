import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Others/Home';
import Setting from '../screens/Setting/Setting';
import Ionicons from 'react-native-vector-icons/AntDesign';
import AllLeases from '../screens/Lease/AllLeases';
import FavouriteCars from '../screens/Others/FavouriteCars';

const Tab = createBottomTabNavigator();

type Obj = {
  name: string;
};

const AppTabs: React.FC = () => {





  const getTabIcons = (
    route: Obj,
    size: number,
    focused: boolean,
    color: string,
  ) => {
    let iconName;
    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home';
    } else if (route.name === 'Lease') {
    iconName = focused ? 'car' : 'car';
    } else if (route.name === "Favourite") {
      iconName = focused ? 'heart' : 'heart';
    }else if (route.name) {
      iconName = focused ? 'setting' : 'setting'
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, size, color }) => {
           return getTabIcons(route, size = 22, focused, color);
          },
          headerShown: false,
          tabBarStyle: {
            height: 66,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            elevation:20,
            position:"absolute",
            paddingTop:8
          },
          tabBarActiveTintColor:'#73C2FB',
         tabBarLabelStyle:{
          fontSize: 8
         }
        };
      }}
    >
      <Tab.Screen name='Home'>{props => <Home {...props} />}</Tab.Screen>
      <Tab.Screen name="Lease">{props =>  <AllLeases {...props} />}</Tab.Screen>
      <Tab.Screen name="Favourite">{props => <FavouriteCars {...props} />}</Tab.Screen>
      <Tab.Screen name="Setting">{props => <Setting {...props} />}</Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppTabs;
