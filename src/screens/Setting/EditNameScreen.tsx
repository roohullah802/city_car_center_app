// src/screens/EditNameScreen.tsx

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../fonts/fonts';


const EditNameScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
     <TouchableOpacity
             style={styles.backButton}
             onPress={() => navigation.goBack()}
           >
             <Icon name="chevron-back" size={24} color="#000" />
           </TouchableOpacity>

      <Text style={styles.title}>What is your Name?</Text>
      <Text style={styles.subtitle}>Enter your full name</Text>

      <View style={styles.inputBox}>
        <TextInput
          value="Faizan Farooq"
          style={styles.textInput}
          placeholder="Full Name"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save change</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default EditNameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
  },
  backArrow: {
    fontSize: wp('6%'),
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
    fontFamily:FONTS.demiBold
  },
  subtitle: {
    fontSize: wp('3.5%'),
    color: '#888',
    marginBottom: hp('3%'),
    fontFamily:FONTS.demiBold
  },
  inputBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: hp('3%'),
  },
  textInput: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#003087',
    fontFamily:FONTS.demiBold
  },
  saveButton: {
    marginTop: 'auto',
    backgroundColor: '#000',
    borderRadius: wp('3%'),
    paddingVertical: hp('1.8%'),
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: '500',
    fontFamily:FONTS.demiBold
  },
   backButton: {
    marginBottom:70,
    position: 'relative',
    top: Platform.OS === 'ios' ? 50 : 20,
    zIndex: 2,
  },
});
