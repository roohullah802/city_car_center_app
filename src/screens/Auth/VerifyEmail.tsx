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
} from 'react-native';
import { FONTS } from '../../fonts/fonts';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux.toolkit/store';
import { setLoading } from '../../redux.toolkit/slices/userSlice';
import axios from 'axios';
import { BASE_AUTH_URL } from '@env';

const { width } = Dimensions.get('window');

const CODE_LENGTH = 6;

const VerificationScreen: React.FC<{ navigation: any; route: any }> = ({
  route,
  navigation,
}) => {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.user);
  const [countDown, setCountDown] = useState<number>(0);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = useCallback(
    (text: string, index: number) => {
      if (/^\d$/.test(text)) {
        console.log(text);
        const newCode = [...code];
        console.log(newCode);

        newCode[index] = text;
        setCode(newCode);

        // Move to next input
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
    console.log(timeRef);

    const enteredCode = code.join('');
    try {
      dispatch(setLoading(true));
      const { email } = route.params;
      const response = await axios.post(
        BASE_AUTH_URL + '/verify-email',
        {
          email,
          code: Number(enteredCode),
        },
        { withCredentials: true },
      );
      const verify = response.data;
      if (verify.success) {
        Toast.show({
          type: 'success',
          text1: verify.message,
        });
        navigation.navigate('Login');
      } else {
        Toast.show({
          type: 'error',
          text1: verify.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, navigation, route.params, code]);

  const handleResendOTP = useCallback(async () => {
    const { email } = route.params;
    try {
        dispatch(setLoading(true))
      const response = await axios.post(
        BASE_AUTH_URL + '/resend-otp',
        { email },
        { withCredentials: true },
      );
      const otp = response.data;

      if (otp.success) {
        Toast.show({
          type: 'success',
          text1: otp.message,
        });
        startCountDown();
      } else {
        Toast.show({
          type: 'error',
          text1: otp.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
    }finally{
        dispatch(setLoading(false))
    }
  }, [route.params, startCountDown, dispatch]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        We have sent a 6 digits code to{'\n'}
        <Text style={styles.email}>Faizan@gmail.com</Text>
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
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
        <TouchableOpacity disabled={isLoading} onPress={handleResendOTP}>
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
        {isLoading ? (
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
});
