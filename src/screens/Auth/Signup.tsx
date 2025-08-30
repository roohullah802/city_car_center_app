// SignupScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '../../fonts/fonts';
import axios from 'axios';
import { BASE_AUTH_URL } from '@env';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import { setLoading } from '../../redux.toolkit/slices/userSlice';
import { RootState, AppDispatch } from '../../redux.toolkit/store';

const SignupScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.user);

  type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    password: string;
  };

  const handleSignup = async () => {
    try {
      dispatch(setLoading(true));
      const userData: UserData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNo: phoneNo.trim(),
        password: password.trim(),
      };

      const response = await axios.post(`${BASE_AUTH_URL}/signup`, userData, {
        withCredentials: true,
      });

      const result = response.data;
      if (result.success) {
        navigation.navigate('verifyEmail',{email: email});
      } else {
        Toast.show({
          type: 'error',
          text1: result.message || 'Signup failed.',
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message || 'Something went wrong',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
          >
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Create New{'\n'}account</Text>
          <Text style={styles.subtitle}>Create your new account</Text>

          <View style={styles.inputContainer}>
            <Icon
              name="account-circle-outline"
              size={20}
              color="#999"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#999"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="account-circle-outline"
              size={20}
              color="#999"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name (optional)"
              placeholderTextColor="#999"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="#999" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="phone-outline"
              size={20}
              color="#999"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="phoneNo"
              placeholderTextColor="#999"
              value={phoneNo}
              onChangeText={setPhoneNo}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="lock-outline"
              size={20}
              color="#999"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="*******"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rememberMeRow}>
            <CheckBox value={rememberMe} onValueChange={setRememberMe} />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>

          <TouchableOpacity
            disabled={isLoading}
            style={styles.signupBtn}
            onPress={handleSignup}
          >
            {isLoading ? (
              <ActivityIndicator size={'small'} color={'#fff'} />
            ) : (
              <Text style={styles.signupText}>Signup</Text>
            )}
          </TouchableOpacity>

          {/* <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or continue with other</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.socialBtn}>
            <Icon name="apple" size={20} color="#000" />
            <Text style={styles.socialText}>Login with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <Icon name="google" size={20} color="#DB4437" />
            <Text style={styles.socialText}>Login with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <Icon name="facebook" size={20} color="#3b5998" />
            <Text style={styles.socialText}>Login with Facebook</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.loginRow}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Already have an account? </Text>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('5%'),
    backgroundColor: '#fff',
  },
  backBtn: {
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: RFValue(28),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: hp('1%'),
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: RFValue(14),
    color: '#666',
    marginBottom: hp('4%'),
    fontFamily: FONTS.demiBold,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
  },
  icon: {
    marginRight: wp('2%'),
  },
  input: {
    flex: 1,
    height: hp('6%'),
    fontSize: RFValue(14),
    color: '#000',
    fontFamily: FONTS.demiBold,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  rememberMeText: {
    marginLeft: wp('2%'),
    fontSize: RFValue(13),
    color: '#444',
    fontFamily: FONTS.demiBold,
  },
  signupBtn: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: hp('1.8%'),
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  signupText: {
    color: '#fff',
    fontSize: RFValue(16),
    fontWeight: '600',
    fontFamily: FONTS.demiBold,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: wp('2%'),
    fontSize: RFValue(12),
    color: '#999',
    fontFamily: FONTS.demiBold,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('1.5%'),
  },
  socialText: {
    width: 200,
    marginLeft: wp('3%'),
    fontSize: RFValue(14),
    color: '#000',
    fontFamily: FONTS.demiBold,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  loginText: {
    fontSize: RFValue(13),
    color: '#444',
    fontFamily: FONTS.demiBold,
  },
  loginLink: {
    fontSize: RFValue(13),
    fontWeight: 'bold',
    color: '#007BFF',
  },
});
