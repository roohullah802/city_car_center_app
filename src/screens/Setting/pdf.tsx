// VerifyYourselfScreen.tsx

import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Linking
} from 'react-native';
import {pick, types} from '@react-native-documents/picker'
import { FONTS } from '../../fonts/fonts';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux.toolkit/store';

const { width } = Dimensions.get('window');

const VerifyYourselfScreen: React.FC<{navigation: any, route: any}> = ({navigation,route}) => {
    const {onSave} = route.params;
    
  const [drivingLicense, setDrivingLicense] = useState<any>();
  const {userData} = useSelector((state: RootState)=> state.user);
  console.log(userData);
  

  const handleFilePick = useCallback(async()=>{
    try {
      const result = await pick({
        allowMultiSelection: false,
        presentationStyle: 'fullScreen',
        type: [types.allFiles],
      });
      setDrivingLicense(result[0]);
    } catch (err: any) {
      Toast.show({
        type:"error",
        text1:"error file picker"
      })
    }
  },[])

  const isFormValid = useMemo(() => {
    return !!drivingLicense
  }, [drivingLicense]);

  const handleSubmit = useCallback(() => {
    onSave(drivingLicense);
    navigation.goBack();
  }, [drivingLicense, onSave, navigation]);

  const openWindow = (url: string)=>{
    Linking.openURL(url);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Verify yourself</Text>
      <Text style={styles.subtitle}>
        Verify yourself by upload Driving License.
      </Text>

      {/* Upload Driving License */}
      <View style={styles.uploadContainer}>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => handleFilePick()}
        >
          <Text style={styles.uploadText}>
            {/* {drivingLicense ? drivingLicense.name : 'Click to upload'} */}
            Click to upload
          </Text>
          <Text style={styles.fileInfo}>PNG, JPG or Form (max. 20MB)</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.licenseTitle}>see driving license</Text>
        <TouchableOpacity onPress={()=> openWindow( userData?.drivingLicence ?  userData?.drivingLicence : '')}>
          <Text style={styles.licenseLink}> ==&gt;  {userData?.drivingLicence ? userData.drivingLicence : 'driving license not uploaded yet'}</Text>
        </TouchableOpacity>
      </View>


      {/* Continue Button */}
      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: width < 400 ? 24 : 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    fontFamily:FONTS.demiBold
  },
  uploadContainer: {
    marginBottom: 24,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  uploadText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
    fontFamily:FONTS.demiBold
  },
  fileInfo: {
    fontSize: 12,
    fontFamily:FONTS.demiBold,
    color: '#888',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  licenseTitle:{
    fontFamily:FONTS.demiBold,
    fontSize: 15,
    marginBottom: 20,
    color: '#666'
  },
  licenseLink:{
    fontFamily:FONTS.demiBold,
    fontSize: 15,
    marginBottom: 20,
    color: '#296ad2ff'
  }
});

export default VerifyYourselfScreen;
