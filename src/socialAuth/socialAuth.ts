import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const API = 'https://api.citycarcenters.com/api/user/auth'; // adjust for device/emulator

GoogleSignin.configure({
  webClientId:
    '383737400149-e7giebnlo44ocrdbu9dvsbod8bjtdik4.apps.googleusercontent.com',
  iosClientId:
    '383737400149-nqj6h1oigjqvep859tv9gmqv4goshm6n.apps.googleusercontent.com',
  offlineAccess: true,
});

export async function googleLogin() {
  await GoogleSignin.hasPlayServices();
  const signInResponse = await GoogleSignin.signIn();
  const idToken = signInResponse.data?.idToken;
  const profile = signInResponse.data?.user.photo;
  const res = await axios.post(`${API}/google`, { idToken });
  return {profile, data: res?.data};
}

export async function appleLogin() {
  if (!appleAuth.isSupported) {
    Toast.show({
      type: 'error',
      text1: 'Apple Sign-In is not supported on Android devices.',
    });
    return;
  }
  const appleRes = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  if (!appleRes.identityToken) throw 'No Apple token';
  const res = await axios.post(`${API}/apple`, {
    idToken: appleRes.identityToken,
  });
  return {profile: null,data: res?.data};
}
