import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  SafeAreaView,
  Platform,
  GestureResponderEvent,
  Alert,
} from 'react-native';
import { appleLogin, googleLogin } from '../../socialAuth/socialAuth';
import { useDispatch } from 'react-redux';
import {
  continueAsGuest,
  setLoggedIn,
  setToken,
  setUserData,
} from '../../redux.toolkit/slices/userSlice';
import Toast from 'react-native-toast-message';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValidateTokenMutation } from '../../redux.toolkit/rtk/authApis';

const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

function scaleSize(size: number, width: number) {
  return Math.round((width / guidelineBaseWidth) * size);
}
function scaleVertical(size: number, height: number) {
  return Math.round((height / guidelineBaseHeight) * size);
}

export default function SocialAuthScreen({ navigation }: any) {
  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 600;
  const dispatch = useDispatch();
  const [validateToken] = useValidateTokenMutation();

  const [showFaceId, setShowFaceId] = useState(false);

  useEffect(() => {
    const checkBiometric = async () => {
      const token = await AsyncStorage.getItem('token');
      const biometric = await AsyncStorage.getItem('userBiometric');

      if (token && biometric === 'true') {
        setShowFaceId(true);
      } else {
        setShowFaceId(false);
      }
    };

    checkBiometric();
  }, []);

  // dynamic sizes
  const logoTop = scaleVertical(isTablet ? 80 : 60, height);
  const titleFont = scaleSize(isTablet ? 42 : 32, width);
  const buttonHeight = Math.max(52, scaleVertical(isTablet ? 68 : 56, height));
  const buttonFont = scaleSize(isTablet ? 20 : 16, width);
  const outerPadding = scaleSize(isTablet ? 40 : 20, width);

  const handleBtn = useCallback(
    async (fn: any, provider: any) => {
      try {
        const { profile, data } = await fn();

        if (data.token) {
          dispatch(setLoggedIn(true));
          dispatch(setToken(data.token));
          dispatch(
            setUserData({
              name: data.user.name,
              email: data.user.email,
              id: data.user._id,
              profile: profile,
            }),
          );
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('userBiometric', 'true');
          navigation.navigate('Tabs', { screen: 'Home' });
        }
      } catch (err: any) {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong!',
          text2:
            'Please check your internet connection or try another account.',
        });
      }
    },
    [navigation, dispatch],
  );

  const handleFaceIdLogin = async () => {
    
    const rnBiometrics = new ReactNativeBiometrics();
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();

    if (!available) {
      Alert.alert('Error', 'Biometric authentication not available');
      return;
    }

    if (
      biometryType === 'FaceID' ||
      biometryType === 'TouchID' ||
      biometryType === 'Biometrics'
    ) {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Login with Face ID',
      });

      if (!success) return;

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('No session', 'Please login with Google/Apple first.');
        return;
      }

      try {
        const result = await validateToken(token).unwrap();
        
        if (result?.user) {
          dispatch(setLoggedIn(true));
          dispatch(setToken(token));
          dispatch(
            setUserData({
              name: result.user.name,
              email: result.user.email,
              id: result.user._id,
              profile: result.user.profile,
            }),
          );
          navigation.navigate('Tabs');
        } else {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.setItem('userBiometric', 'false');
          Alert.alert('Login Failed', 'User not found. Please login again.');
        }
      } catch (err) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.setItem('userBiometric', 'false');
        setShowFaceId(false)
        Alert.alert(
          'Login Failed',
          'Invalid or expired session. Please login with google or apple',
        );
      }
    }
  };

  const handleGuest = useCallback(()=>{
    navigation.navigate('Tabs', { screen: 'Home' });
    dispatch(continueAsGuest());
  },[navigation, dispatch])

  return (
    <SafeAreaView style={[styles.safe]}>
      <View style={[styles.container, { paddingHorizontal: outerPadding }]}>
        <View style={[styles.header, { marginTop: logoTop }]}>
          <Text
            style={[
              styles.title,
              {
                fontSize: titleFont,
                lineHeight: titleFont + 6,
                textAlign: 'left',
              },
            ]}
            accessibilityRole="header"
          >
            <Text style={styles.titleBold}>
              Smart Solutions{'\n'}For Your Car Needs {'\n'}
            </Text>
            <Text style={styles.titleAccent}>City Car Center</Text>
          </Text>
        </View>

        {/* Buttons area */}
        <View style={styles.buttonsWrap}>
          <SocialButton
            label="Sign in with Google"
            icon={require('../../assests/google.png')}
            onPress={() => handleBtn(googleLogin, 'google')}
            height={buttonHeight}
            fontSize={buttonFont}
          />

          <SocialButton
            label="Sign in with Apple"
            icon={require('../../assests/apple.png')}
            onPress={() => handleBtn(appleLogin, 'apple')}
            height={buttonHeight}
            fontSize={buttonFont}
          />

          {showFaceId && (
            <SocialButton
              label="Login with Face ID / TouchID"
              icon={require('../../assests/face.png')}
              onPress={handleFaceIdLogin}
              height={buttonHeight}
              fontSize={buttonFont}
            />
          )}

          <SocialButton
            label="Guest"
            icon={require('../../assests/guest.png')}
            onPress={handleGuest}
            height={buttonHeight}
            fontSize={buttonFont}
          />
        </View>

        {/* Why link */}
        <TouchableOpacity
          accessibilityRole="link"
          onPress={() => {}}
          style={styles.whyWrap}
          activeOpacity={0.7}
        >
          <Text style={[styles.whyText]}>Why do I have to sign in?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* Reusable social button */
type SocialButtonProps = {
  label: string;
  icon: any;
  onPress?: (e: GestureResponderEvent) => void;
  height?: number;
  fontSize?: number;
};

function SocialButton({
  label,
  icon,
  onPress,
  height = 56,
}: SocialButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        {
          height,
        },
      ]}
    >
      <View style={styles.iconWrap}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>

      <View style={styles.labelWrap}>
        <Text style={[styles.buttonLabel]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    alignSelf: 'stretch',
    marginBottom: 24,
  },
  title: {
    color: '#222222',
    fontWeight: '400',
  },
  titleBold: {
    color: '#222222',
    fontWeight: '700',
    fontSize: 25,
  },
  titleAccent: {
    color: '#00AEEF',
    fontWeight: '700',
    fontSize: 25,
  },

  buttonsWrap: {
    marginTop: 90,
    alignSelf: 'stretch',
    gap: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 14,
    shadowColor: '#000',
    borderWidth: 0.2,
    borderColor: 'gray',
    marginBottom: 12,
  },
  iconWrap: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 28,
    height: 28,
  },
  labelWrap: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 6,
  },
  buttonLabel: {
    color: '#222222',
    fontWeight: '600',
    letterSpacing: -0.6,
    fontSize: 12,
  },
  whyWrap: {
    marginTop: 40,
    alignSelf: 'center',
  },
  whyText: {
    textDecorationLine: 'underline',
    color: '#9aa0a6',
    fontWeight: '600',
    fontSize: 12,
  },
});
