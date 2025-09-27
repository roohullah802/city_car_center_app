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
          <StripeProvider publishableKey='pk_test_51Re3kqIetrHxrdQ8rp3US8KmNt6zFPkzaUIGlVixbhUmRtSlsMsyySYiD4fQyGp3SeULX3u5jLccoRrZ7jJvp2uR00z6fyQVmj'>
            <RootNavigator />
          </StripeProvider>
        </View>
      </PersistGate>
      <Toast />
    </Provider>
  );
};

export default App;
