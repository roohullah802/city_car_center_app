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
import Faqs from '../screens/Setting/Faqs';
import PrivatePolicy from '../screens/Setting/PrivatePolicy';
import Report from '../screens/Setting/Report';
import ChangePasswordScreen from '../screens/Setting/ChangePassword';
import ExtendLeaseScreen from '../screens/Lease/ExtendLease';
import CarLeaseCard from '../screens/Others/CarLeaseDetails';
import DateAndTimeScreen from '../screens/Others/DateAndTime';
import LeaseDetailsScreen from '../screens/Lease/LeaseDetails';
import PaymentDetails from '../screens/Payments/PaymentDetails';
import VerificationScreen from '../screens/Auth/VerifyEmail';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack: React.FC = () => {
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

      <Stack.Screen name="faqs" component={Faqs} />

       <Stack.Screen name="privacyPolicy" component={PrivatePolicy} />

      <Stack.Screen name="report" component={Report} />

       <Stack.Screen name="changePassword">
        {props => <ChangePasswordScreen {...props} />}
      </Stack.Screen>

       <Stack.Screen name="extendLease">
        {props => <ExtendLeaseScreen {...props} />}
      </Stack.Screen>

       <Stack.Screen name="carDetails">
        {props => <CarLeaseCard {...props} />}
      </Stack.Screen>

      <Stack.Screen name="dateAndTime">
        {props => <DateAndTimeScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen name="leaseDetails">
        {props => <LeaseDetailsScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen name="paymentDetails">
        {props => <PaymentDetails {...props} />}
      </Stack.Screen>

      <Stack.Screen name="verifyEmail">
        {props => <VerificationScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
