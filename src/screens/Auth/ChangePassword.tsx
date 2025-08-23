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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux.toolkit/store';
import { setLoading } from '../../redux.toolkit/slices/userSlice';
import { useChangePasswordMutation } from '../../redux.toolkit/rtk/authApis';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const ChangePasswordScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleNew = useCallback(() => setShowNew(prev => !prev), []);
  const toggleConfirm = useCallback(() => setShowConfirm(prev => !prev), []);

  const { isLoading: isLoadingState } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const isSaveDisabled = useMemo(() => {
    return !newPassword || !confirmPassword || newPassword !== confirmPassword;
  }, [newPassword, confirmPassword]);
  const { email } = route.params;

  const handleChangePassword = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await changePassword({
        email,
        newPassword,
        reNewPassword: confirmPassword,
      }).unwrap();
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: response.message,
        });
        navigation.navigate('Login')
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'some error! while change password.',
      });
    } finally {
      dispatch(setLoading(false));
    }
  }, [changePassword, confirmPassword, dispatch, email, newPassword, navigation]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.message}>Loading city car centers...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'android' ? 80 : 0}
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
          {/* New Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
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
          disabled={isLoadingState}
          onPress={handleChangePassword}
        >
          {isLoadingState ? (
            <ActivityIndicator size={'small'} color={'#fff'} />
          ) : (
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
    marginBottom: width * 0.04, // replaced gap
  },
  input: {
    flex: 1,
    fontSize: width * 0.042,
    color: '#000',
    fontFamily: FONTS.demiBold,
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    fontFamily: FONTS.medium,
  },
});

export default ChangePasswordScreen;
