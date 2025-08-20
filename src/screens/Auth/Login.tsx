import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import { BASE_AUTH_URL } from '@env';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux.toolkit/store';
import { login, setLoading } from '../../redux.toolkit/slices/userSlice';
import CookieManager from '@react-native-cookies/cookies';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isLoggedIn } = useSelector(
    (state: RootState) => state.user,
  );

  const handleLogin = async () => {
    
  try {
    if (isLoggedIn) {
      Toast.show({
        type: 'error',
        text1: 'User already logged in',
      });
      return;
    }

    dispatch(setLoading(true));

    const user = await axios.post(`${BASE_AUTH_URL}/login`, {
      email: email.trim(),
      password: password.trim(),
    }, {withCredentials: true});


    if (user.data.success) {
      Toast.show({
        type: 'success',
        text1: user.data.message,
      });

      navigation.navigate('Tabs', { screen: 'Lease' });
      
      
      dispatch(
        login({
          name: user?.data?.user?.firstName,
          id: user?.data?.user?.id,
          email: user?.data?.user?.email,
          token: user?.data?.user?.token
        })
      );

      
      await CookieManager.set('http://127.0.0.1:5000', {
        name: 'token',
        value: user?.data?.user?.token,
        domain: '127.0.0.1',
        path: '/api/user/auth/login',
        version: '1',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });

    } else {
      Toast.show({
        type: 'error',
        text1: user.data.message,
      });
    }

  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: error?.response?.data?.message || 'Login failed',
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
        <ScrollView
          contentContainerStyle={{ paddingBottom: hp('5%') }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
          >
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Login existing{'\n'}account</Text>

          <View style={styles.inputContainer}>
            <Icon
              name="email-outline"
              size={20}
              color="#999"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
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
              placeholder="Enter password"
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

          <TouchableOpacity disabled={isLoading} style={styles.signupBtn} onPress={handleLogin}>
            {isLoading ? (
              <ActivityIndicator size={'small'} color={'#fff'} />
            ) : (
              <Text style={styles.signupText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerRow}>
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
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginRow}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.loginText}>Create new Account? </Text>
            <Text style={styles.loginLink}>Signup</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
    marginBottom: hp('3%'),
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: RFValue(14),
    color: '#666',
    marginBottom: hp('4%'),
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
  },
  loginText: {
    fontSize: RFValue(13),
    color: '#444',
    fontFamily: FONTS.demiBold,
  },
  loginLink: {
    fontSize: RFValue(13),
    fontWeight: 'bold',
    color: '#000',
  },
});
