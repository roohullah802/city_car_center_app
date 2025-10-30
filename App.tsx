import React, { useEffect } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor } from "./src/redux.toolkit/store";
import { PersistGate } from "redux-persist/integration/react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar, View } from "react-native";
import { showToast, ToastProvider } from "./src/folder/toastService";
import { clearUserData } from "./src/redux.toolkit/slices/userSlice";
import io from "socket.io-client";

const socket = io("https://api.citycarcenters.com", {
  transports: ["websocket"],
});


const AppInner = () => {
  const dispatch = useDispatch();
  const { userData, isLoggedIn } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!isLoggedIn || !userData?.id) return;

    socket.on("userDeleted", (deletedUserId) => {
      console.log("userDeleted event received:", deletedUserId);


      if (deletedUserId?.id === userData.id) {
        showToast("Your account has been removed by the admin.");
        dispatch(clearUserData());
      }
    });

    return () => {
      socket.off("userDeleted");
    };
  }, [isLoggedIn, userData, dispatch]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <RootNavigator />
      </View>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider>
          <StripeProvider publishableKey="pk_test_51Re3kqIetrHxrdQ8NHfzFtJJnpeuU4LNItyYnJKbUyDfhVV8fbJTpsg6VSh050aEzezOdJpZDmMrt3tsYtVsbJPx00ML9GB0Qc">
            <AppInner />
          </StripeProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
