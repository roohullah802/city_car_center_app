import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { BASE_AUTH_URL } from '@env';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '../../fonts/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    try {
      setLoading(true);

      const res = await axios.post(`${BASE_AUTH_URL}/forgot-password`, {
        email: email.trim(),
      });

      if (res.data.success) {
        Toast.show({
          type: 'success',
          text1: res.data.message,
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: res.data.message,
        });
      }
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email and we'll send you instructions to reset your password.
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.resetBtn}
        disabled={loading}
        onPress={handleReset}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.resetText}>Send Reset Link</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('6%'),
    paddingTop: hp('6%'),
  },
  title: {
    fontSize: RFValue(24),
    fontFamily: FONTS.bold,
    marginBottom: hp('1%'),
    color: '#000',
  },
  subtitle: {
    fontSize: RFValue(12),
    fontFamily: FONTS.medium,
    color: '#666',
    marginBottom: hp('4%'),
  },
  input: {
    height: hp('6%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: wp('4%'),
    marginBottom: hp('3%'),
    fontSize: RFValue(14),
    fontFamily: FONTS.demiBold,
  },
  resetBtn: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: hp('1.8%'),
    alignItems: 'center',
  },
  resetText: {
    color: '#fff',
    fontSize: RFValue(14),
    fontFamily: FONTS.demiBold,
  },
});
