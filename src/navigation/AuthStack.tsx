import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import AppTabs from './AppTabs';
import SignupScreen from '../screens/Auth/Signup';
import { RootStackParamList } from '../types/types';
import ProfileScreen from '../screens/Setting/Profile';
import EditNameScreen from '../screens/Setting/EditNameScreen';
import AgePickerScreen from '../screens/Setting/AgePickerScreen';
import GenderScreen from '../screens/Setting/GenderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs">{() => <AppTabs />}</Stack.Screen>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup">
        {props => <SignupScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Profile">
        {props => <ProfileScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen name="EditNameScreen">
        {props => <EditNameScreen {...props} />}
      </Stack.Screen>

       <Stack.Screen name="AgePickerScreen">
        {props => <AgePickerScreen {...props} />}
      </Stack.Screen>

       <Stack.Screen name="GenderScreen">
        {props => <GenderScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
