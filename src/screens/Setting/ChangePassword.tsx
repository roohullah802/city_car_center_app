import React, { useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../fonts/fonts';
import { useChangeAppPasswordMutation } from '../../redux.toolkit/rtk/authApis';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const ChangePasswordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const [changePassword, {isLoading}] = useChangeAppPasswordMutation();

  const toggleOld = useCallback(() => setShowOld(prev => !prev), []);
  const toggleNew = useCallback(() => setShowNew(prev => !prev), []);
  const toggleConfirm = useCallback(() => setShowConfirm(prev => !prev), []);

  const isSaveDisabled = useMemo(() => {
    return (
      !oldPassword ||
      !newPassword ||
      !confirmPassword ||
      newPassword !== confirmPassword
    );
  }, [oldPassword, newPassword, confirmPassword]);

  const handleChangePassword = useCallback(async() => {
    console.log(oldPassword, newPassword, confirmPassword);
    
   try {
    const data = {oldPassword, newPassword, reNewPassword: confirmPassword};
    const response = await changePassword(data).unwrap();
    if (response?.success) {
      Toast.show({
        type:"success",
        text1:response?.message
      })
      navigation.navigate('Tabs', {screen: 'Settings'})
      return;
    }
    
   } catch (error: any) {
    Toast.show({
      type:"error",
      text1:"something error"
  })
    
   }
  }, [changePassword, confirmPassword, oldPassword, newPassword, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'android' ? 80 : 0} // adjust if you have header
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Change password</Text>
        <Text style={styles.subtitle}>
          Your password must be different from previous password
        </Text>

        {/* Input Fields */}
        <View style={styles.inputGroup}>
          {/* Old Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              placeholderTextColor={"gray"}
              secureTextEntry={!showOld}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TouchableOpacity onPress={toggleOld}>
              <Icon
                name={showOld ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* New Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor={"gray"}
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={toggleNew}>
              <Icon
                name={showNew ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Re-enter new Password"
              placeholderTextColor={"gray"}
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={toggleConfirm}>
              <Icon
                name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.button, isSaveDisabled && { opacity: 0.5 }]}
          disabled={isSaveDisabled || isLoading}
          onPress={handleChangePassword}
        >
          {isLoading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ):(
            <Text style={styles.buttonText}>Change password</Text>
          )}
          
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
  },
  header: {
    marginTop: width * 0.02,
    marginBottom: width * 0.04,
  },
  title: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#0F1E2D',
    fontFamily: FONTS.demiBold,
  },
  subtitle: {
    fontSize: width * 0.038,
    color: '#6B6B6B',
    marginBottom: width * 0.06,
    fontFamily: FONTS.demiBold,
  },
  inputGroup: {
    marginBottom: 'auto',
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    height: width * 0.13,
    backgroundColor: '#F6F8F8',
    justifyContent: 'space-between',
    marginBottom: width * 0.04,
  },
  input: {
    flex: 1,
    fontSize: width * 0.038,
    color: '#000',
    fontFamily: FONTS.medium,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: width * 0.04,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: width * 0.05,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.042,
    fontWeight: '600',
    fontFamily: FONTS.demiBold,
  },
});

export default ChangePasswordScreen;
