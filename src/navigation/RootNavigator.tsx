import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootNavigator = () => {
  return (
    <GestureHandlerRootView>
 <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </GestureHandlerRootView>
     
  );
};

export default RootNavigator;
