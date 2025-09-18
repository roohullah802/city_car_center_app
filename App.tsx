import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux.toolkit/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StripeProvider publishableKey='pk_test_51Re3kqIetrHxrdQ8VFHpsds1idd8fNGSVQYhVgYRiZcRMpXIJHDH3QGWReIpnEcobuwlK0YXWoeOJhalC9kXFPJ900wV7gJMcy'>
          <RootNavigator />
        </StripeProvider>
      </PersistGate>
      <Toast />
    </Provider>
  );
};
// heyyyy

export default App;
