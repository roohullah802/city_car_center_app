// VerificationScreen.tsx
import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import { FONTS } from '../../fonts/fonts';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux.toolkit/store';
import { setLoading } from '../../redux.toolkit/slices/userSlice';
import {
  useResendOtpMutation,
  useVerifyEmailMutation,
} from '../../redux.toolkit/rtk/authApis';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CODE_LENGTH = 6;

const VerificationScreen: React.FC<{ navigation: any; route: any }> = ({
  route,
  navigation,
}) => {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading: isLoadingState } = useSelector(
    (state: RootState) => state.user,
  );
  const [countDown, setCountDown] = useState<number>(0);
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const { email } = route?.params;
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendOtp] = useResendOtpMutation();

 
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true; 
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const handleChange = useCallback(
    (text: string, index: number) => {
      if (/^\d$/.test(text)) {
        const newCode = [...code];

        newCode[index] = text;
        setCode(newCode);

       
        if (index < CODE_LENGTH - 1) {
          inputs.current[index + 1]?.focus();
        }
      } else if (text === '') {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    },
    [code],
  );

  const startCountDown = useCallback(() => {
    setCountDown(60);
    timeRef.current = setInterval(() => {
      setCountDown(prev => {
        if (prev <= 1) {
          if (timeRef.current) clearInterval(timeRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleVerify = useCallback(async () => {
    try {
      const enteredCode = Number(code.join(''));
      dispatch(setLoading(true));
      const response = await verifyEmail({ email, code: enteredCode }).unwrap();
      if (response?.success) {
        navigation.navigate('Login');
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Email verification failed.',
        text2: error.data.message
      });
    } finally {
      dispatch(setLoading(false));
    }
  }, [code, email, verifyEmail, dispatch, navigation]);

  const handleResendOTP = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await resendOtp({ email }).unwrap();
      if (response?.success) {
        Toast.show({
          type: 'success',
          text1: 'OTP send successfully.',
          text2: response.message
        });
        startCountDown();
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Resend OTP failed.',
        text2: error.data.message
      });
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, email, resendOtp, startCountDown]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.message}>Loading city car centers...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        We have sent a 6 digits code to{'\n'}
        <Text style={styles.email}>{email}</Text>
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref as any)}
            style={styles.inputBox}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            returnKeyType="next"
          />
        ))}
      </View>

      {countDown > 0 ? (
        <Text style={styles.resendText}>
          Resend OTP in{' '}
          <Text style={styles.resendLink}>
            {String(Math.floor(countDown / 60)).padStart(2, '0')}:
            {String(countDown % 60).padStart(2, '0')}
          </Text>
        </Text>
      ) : (
        <TouchableOpacity disabled={isLoadingState} onPress={handleResendOTP}>
          <Text style={styles.resendText}>
            Didn't receive code?{' '}
            <Text style={styles.resendLink}>Send again</Text>
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        disabled={isLoading}
        style={styles.verifyButton}
        onPress={handleVerify}
      >
        {isLoadingState ? (
          <ActivityIndicator size={'small'} color={'#fff'} />
        ) : (
          <Text style={styles.verifyText}>Verify</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default VerificationScreen;



const inputSize = width / 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#002b34',
    marginBottom: 10,
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: FONTS.demiBold,
  },
  email: {
    fontWeight: '600',
    color: '#002b34',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    width: '100%',
    paddingHorizontal: 10,
  },
  inputBox: {
    width: inputSize,
    height: inputSize,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    fontFamily: FONTS.demiBold,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontFamily: FONTS.demiBold,
  },
  resendLink: {
    fontWeight: '600',
    color: '#002b34',
  },
  verifyButton: {
    marginTop: 30,
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS.demiBold,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: 'red',
    fontFamily: FONTS.bold,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    fontFamily: FONTS.medium,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.demiBold,
  },
});
