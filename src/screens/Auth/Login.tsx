// SignupScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
 

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={()=> navigation.navigate("Tabs", { screen: 'Home' })
}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Login existing{'\n'}account</Text>

      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberMeRow}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
        />
        <Text style={styles.rememberMeText}>Remember me</Text>
      </View>

      <TouchableOpacity style={styles.signupBtn}>
        <Text style={styles.signupText}>Signup</Text>
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

      <TouchableOpacity style={styles.loginRow} onPress={()=> navigation.navigate("Signup")}>
        <Text style={styles.loginText}>Create new Account? </Text>
        <Text style={styles.loginLink}>Signup</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  loginText: {
    fontSize: RFValue(13),
    color: '#444',
  },
  loginLink: {
    fontSize: RFValue(13),
    fontWeight: 'bold',
    color: '#000',
  },
});
