import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '../../fonts/fonts';
import { useUpdateProfileMutation } from '../../redux.toolkit/rtk/authApis';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux.toolkit/store';
import {
  setDrivingLicense,
  setUserData,
} from '../../redux.toolkit/slices/userSlice';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { userData } = useSelector((state: RootState) => state.user);
  const [fullName, setFullName] = useState<string>(userData?.name || '');
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<number>(15);
  const [file, setFile] = useState<any>('');
  const [profileChange, { isLoading }] = useUpdateProfileMutation();

  const dispatch = useDispatch<AppDispatch>();

  const imagePickerHandler = async () => {
    // Placeholder for future image picker logic
  };

  const pdfPickerHandler = async () => {
    navigation.navigate('pdfPicker', {
      onSave: (updatedValue: any) => setFile(updatedValue),
    });
  };

  const saveHandler = async () => {
    console.log('hit');

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('age', age);
      formData.append('gender', gender);
      if (file?.name) {
        formData.append('file', {
          uri: file?.uri || '',
          type: file?.type || 'application/pdf',
          name: file?.name || 'document.pdf',
        } as any);
      }
      const response = await profileChange(formData).unwrap();
      if (response?.success) {
        Toast.show({
          type: 'success',
          text1: 'Update successfully',
          text2: response?.message,
        });
        console.log(response);

        navigation.goBack();
        dispatch(
          setDrivingLicense({ drivingLicence: response?.data?.drivingLicence }),
        );
        const splitName = fullName.split(' ')[0];
        dispatch(setUserData({ name: splitName }));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Update failed',
        text2:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={RFValue(22)} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.subtitle}>Manage your profile</Text>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image
          source={require('../../assests/download.png')}
          style={styles.avatar}
        />
        <TouchableOpacity
          style={styles.cameraIcon}
          onPress={imagePickerHandler}
        >
          <Icon name="camera" size={RFValue(14)} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Info Items */}
      <View style={styles.section}>
        <LabelAndValue
          label="Your full name"
          value="Full Name"
          onPress={() =>
            navigation.navigate('EditNameScreen', {
              fullName,
              onSave: (updatedValue: string) => setFullName(updatedValue),
            })
          }
        />
        <LabelAndValue
          label="Age"
          value="Age"
          onPress={() =>
            navigation.navigate('AgePickerScreen', {
              age,
              onSave: (updatedValue: number) => setAge(updatedValue),
            })
          }
        />
        <LabelAndValue
          label="Gender"
          value="Male"
          onPress={() =>
            navigation.navigate('GenderScreen', {
              gender,
              onSave: (updatedValue: string) => setGender(updatedValue),
            })
          }
        />
        <FileItem
          label="Driver license"
          fileName={file?.name ? file?.name : 'upload.pdf'}
          onPress={pdfPickerHandler}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity disabled={isLoading} style={styles.saveButton} onPress={saveHandler}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={'#fff'} />
        ) : (
          <Text style={styles.saveButtonText}>Save change</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const LabelAndValue = ({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.valueRow} onPress={onPress}>
      <Text style={styles.value}>{value}</Text>
      <Icon name="chevron-forward" size={RFValue(18)} color="#000" />
    </TouchableOpacity>
  </View>
);

const FileItem = ({
  label,
  fileName,
  onPress,
}: {
  label: string;
  fileName: string;
  onPress: () => void;
}) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.valueRow} onPress={onPress}>
      <Icon
        name="document-text-outline"
        size={RFValue(18)}
        color="red"
        style={{ marginRight: 8 }}
      />
      <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
        {fileName}
      </Text>
      <Icon
        name="chevron-forward"
        size={RFValue(18)}
        color="#000"
        style={{ marginLeft: 8 }}
      />
    </TouchableOpacity>
  </View>
);

// Responsive Styles
const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
    paddingBottom: RFValue(40),
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? RFValue(50) : RFValue(20),
    left: RFValue(20),
    zIndex: 2,
  },
  title: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: '#072A3F',
    textAlign: 'center',
    marginTop: RFValue(40),
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: RFValue(13),
    color: '#666',
    textAlign: 'center',
    marginBottom: RFValue(20),
    fontFamily: FONTS.demiBold,
  },
  avatarWrapper: {
    alignSelf: 'center',
    marginTop: RFValue(10),
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#000',
    padding: RFValue(6),
    borderRadius: 20,
  },
  section: {
    marginTop: RFValue(30),
  },
  item: {
    marginBottom: RFValue(20),
  },
  label: {
    fontSize: RFValue(12),
    color: '#555',
    marginBottom: RFValue(6),
    fontFamily: FONTS.demiBold,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(14),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
  },
  value: {
    flex: 1,
    fontSize: RFValue(13),
    color: '#000',
    fontFamily: FONTS.demiBold,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: RFValue(13),
    borderRadius: 12,
    marginTop: RFValue(30),
  },
  saveButtonText: {
    color: '#fff',
    fontSize: RFValue(14),
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: FONTS.bold,
  },

});

export default ProfileScreen;
