// src/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import {Apis as appApis} from './rtk/apis'
import {Apis as authApis} from './rtk/authApis'
import {Apis as leaseApis} from './rtk/leaseApis'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  user: userReducer,
  [appApis.reducerPath]: appApis.reducer,
  [authApis.reducerPath]: authApis.reducer,
  [leaseApis.reducerPath]: leaseApis.reducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(appApis.middleware, authApis.middleware, leaseApis.middleware),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
