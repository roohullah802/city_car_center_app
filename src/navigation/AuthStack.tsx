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
import TopBrandsScreen from '../screens/Others/BrandCards';
import SearchCarCards from '../screens/Others/SearchCarCards';
import PasswordSecurity from '../screens/Setting/PasswordSecurity';
import NotificationPreference from '../screens/Setting/NotificationPreference';
import Faqs from '../screens/Setting/Faqs';
import PrivatePolicy from '../screens/Setting/PrivatePolicy';
import Report from '../screens/Setting/Report';
import Logout from '../screens/Auth/Logout';

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

       <Stack.Screen name="brandCards">
        {props => <TopBrandsScreen {...props} />}
      </Stack.Screen>

       <Stack.Screen name="searchCarCards">
        {props => <SearchCarCards {...props} />}
      </Stack.Screen>

      <Stack.Screen name="passwordSecurity">
        {props => <PasswordSecurity {...props} />}
      </Stack.Screen>

       <Stack.Screen name="NotificationPreference">
        {props => <NotificationPreference {...props} />}
      </Stack.Screen>

      <Stack.Screen name="faqs">
        {props => <Faqs {...props} />}
      </Stack.Screen>

       <Stack.Screen name="privacyPolicy">
        {props => <PrivatePolicy {...props} />}
      </Stack.Screen>

      <Stack.Screen name="report">
        {props => <Report {...props} />}
      </Stack.Screen>

      <Stack.Screen name="logout">
        {props => <Logout {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
