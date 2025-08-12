import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../fonts/fonts';

type Gender = 'Male' | 'Female' | 'Other';

const genders: Gender[] = ['Male', 'Female', 'Other'];

const genderIcons: { [key in Gender]: string } = {
  Male: 'male-outline',
  Female: 'female-outline',
  Other: 'transgender-outline',
};

const GenderSelectionScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState<Gender>('Male');

  const renderGenderOption = (gender: Gender) => {
    const isSelected = selectedGender === gender;

    return (
      <TouchableOpacity
        key={gender}
        style={[styles.option, isSelected && styles.selectedOption]}
        onPress={() => setSelectedGender(gender)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={genderIcons[gender]}
          size={24}
          color={isSelected ? '#fff' : '#2E3A59'}
          style={{ marginBottom: hp('1%') }}
        />
        <Text style={[styles.optionText, isSelected && styles.selectedText]}>
          {gender}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Icon name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Title and Subtitle */}
      <Text style={styles.title}>What is your Gender?</Text>
      <Text style={styles.subtitle}>Select your preferred gender</Text>

      {/* Gender Options */}
      <View style={styles.optionsContainer}>{genders.map(renderGenderOption)}</View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          console.log('Selected gender:', selectedGender);
          navigation.goBack();
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.saveButtonText}>Save change</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('6%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: wp('6%'),
    zIndex: 2,
  },
  title: {
    marginTop: -40,
    fontSize: wp('5.5%'),
    fontWeight: '600',
    marginBottom: hp('2%'),
    color: '#000',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: wp('3.5%'),
    color: '#8A8A8A',
    marginBottom: hp('4%'),
    fontFamily: FONTS.demiBold,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: hp('5%'),
  },
  option: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: wp('3%'),
    paddingVertical: hp('2.2%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
    backgroundColor: '#fff',
  },
  selectedOption: {
    backgroundColor: '#003DA5',
    borderColor: '#003DA5',
  },
  optionText: {
    fontSize: wp('4%'),
    color: '#2E3A59',
    fontWeight: '500',
    fontFamily: FONTS.demiBold,
  },
  selectedText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: hp('2%'),
    borderRadius: wp('2.5%'),
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontWeight: '600',
    fontFamily: FONTS.demiBold,
  },
});

export default GenderSelectionScreen;
