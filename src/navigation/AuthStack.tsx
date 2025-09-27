import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import { RootStackParamList } from '../types/types';
import TopBrandsScreen from '../screens/Others/BrandCards';
import SearchCarCards from '../screens/Others/SearchCarCards';
import Faqs from '../screens/Setting/Faqs';
import PrivatePolicy from '../screens/Setting/PrivatePolicy';
import Report from '../screens/Setting/Report';
import ExtendLeaseScreen from '../screens/Lease/ExtendLease';
import CarLeaseCard from '../screens/Others/CarLeaseDetails';
import DateAndTimeScreen from '../screens/Others/DateAndTime';
import LeaseDetailsScreen from '../screens/Lease/LeaseDetails';
import PaymentDetails from '../screens/Payments/PaymentDetails';
import CarCardsByBrand from '../screens/Others/CarCardsByBrand';
import VerifyYourselfScreen from '../screens/Setting/pdf';
import PaymentSuccessScreen from '../screens/Payments/PaymentSuccess';
import SocialAuthScreen from '../screens/Auth/SocialAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../redux.toolkit/store';
import CarImages from '../screens/Others/CarImages';
import LeaseHistoryScreen from '../screens/Lease/LeaseHistory';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack: React.FC = () => {
  const { userData, isGuest } = useSelector((state: RootState) => state.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={userData || isGuest ? 'Tabs' : 'socialAuth'}>
      <Stack.Screen name="Tabs" component={AppTabs} />

      <Stack.Screen name="brandCards">
        {props => <TopBrandsScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen name="searchCarCards">
        {props => <SearchCarCards {...props} />}
      </Stack.Screen>

      <Stack.Screen name="carCardsByBrand">
        {props => <CarCardsByBrand {...props} />}
      </Stack.Screen>

      <Stack.Screen name="faqs" component={Faqs} />

      <Stack.Screen name="privacyPolicy" component={PrivatePolicy} />

      <Stack.Screen name="report" component={Report} />

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

      <Stack.Screen name="pdfPicker">
        {props => <VerifyYourselfScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen name="paymentSuccess">
        {props => <PaymentSuccessScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen name="socialAuth">
        {props => <SocialAuthScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen name="carimages">
        {props => <CarImages {...props} />}
      </Stack.Screen>

      <Stack.Screen name="leaseHistory">
        {props => <LeaseHistoryScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
