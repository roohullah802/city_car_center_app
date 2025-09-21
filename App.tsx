import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux.toolkit/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { StripeProvider } from '@stripe/stripe-react-native';
import { StatusBar, View } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* StatusBar applied globally */}
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        {/* Wrap navigator in a white background View for iOS */}
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <StripeProvider publishableKey='pk_test_51Re3kqIetrHxrdQ8VFHpsds1idd8fNGSVQYhVgYRiZcRMpXIJHDH3QGWReIpnEcobuwlK0YXWoeOJhalC9kXFPJ900wV7gJMcy'>
            <RootNavigator />
          </StripeProvider>
        </View>
      </PersistGate>
      <Toast />
    </Provider>
  );
};

export default App;
