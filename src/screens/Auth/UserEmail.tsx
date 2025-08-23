import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useCheckEmailMutation } from '../../redux.toolkit/rtk/authApis';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../fonts/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux.toolkit/store';
import { setLoading } from '../../redux.toolkit/slices/userSlice';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>('');

  const [checkEmail, { isLoading, isError }] = useCheckEmailMutation();
  const { isLoading: isLoadingState } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();

  const handleContinue = async () => {
  if (!email.trim()) {
    Toast.show({
      type: 'error',
      text1: 'Please enter your email address.',
    });
    return;
  }

  dispatch(setLoading(true));
  try {
    const response = await checkEmail({email}).unwrap(); 
    if (response.success) {
      navigation.navigate('verifyOtp', {email: email});
    } else {
      Toast.show({
        type: 'error',
        text1: response.message || 'Something went wrong.',
      });
    }
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: error?.data?.message || 'Email checking failed.',
    });
  } finally {
    dispatch(setLoading(false));
  }
};


  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.message}>Loading city car centers...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Icon name="alert-circle" size={40} color="red" />
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.message}>
          We couldn’t load the car centers. Please try again.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>
            Forgot{'\n'}
            <Text style={styles.bold}>Password</Text>
          </Text>
          <Text style={styles.subtitle}>
            Enter your email to reset your password
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.textInput}
              placeholderTextColor="#888"
            />
          </View>

          <TouchableOpacity style={styles.button} disabled={isLoading} onPress={handleContinue}>
            {isLoadingState ? (
              <ActivityIndicator size={'small'} color={'#fff'} />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.1,
  },
  title: {
    fontSize: height * 0.04,
    color: '#000',
    lineHeight: height * 0.05,
    marginBottom: height * 0.01,
  },
  bold: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: height * 0.02,
    color: '#666',
    marginBottom: height * 0.04,
  },
  inputContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: height * 0.03,
  },
  textInput: {
    fontSize: height * 0.02,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: height * 0.018,
  },
  buttonText: {
    color: '#fff',
    fontSize: height * 0.022,
    fontWeight: '600',
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

export default ForgotPasswordScreen;
