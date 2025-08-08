import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import {store, persistor } from './src/redux.toolkit/store'
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading....</Text>} persistor={persistor}>
         <RootNavigator />
      </PersistGate>
     
    </Provider>
  );
};
// heyyyy

export default App;
