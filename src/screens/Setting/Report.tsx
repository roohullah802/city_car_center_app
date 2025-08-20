import React, { useState, useCallback, useMemo } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  View,
 } from  'react-native';
import { FONTS } from '../../fonts/fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { usePostReportIssueMutation } from '../../redux.toolkit/rtk/apis';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux.toolkit/store';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ReportIssueScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [description, setDescription] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.user,
  );
  const [postReportIssue, { isLoading, isError, isSuccess }] =
    usePostReportIssueMutation();

  const isValid = useMemo(
    () => description.trim().length > 0 && email.includes('@'),
    [description, email],
  );

  const handleSend = useCallback(async () => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
      return;
    }
    if (!isValid) {
      Toast.show({
        type: 'error',
        text1: 'Please enter valid email address.',
      });
      return;
    }
    const userId = userData?.id;
    const data = { userId, description, email };
    await postReportIssue(data).unwrap();
  }, [
    isValid,
    description,
    email,
    postReportIssue,
    userData,
    navigation,
    isLoggedIn,
  ]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.message}>Loading city car centers...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Icon name="alert-circle" size={40} color="red" />
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.message}>
          We couldn’t load the car centers. Please try again.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isSuccess) {
    return (
      <View style={styles.centered}>
        <Icon name="checkmark-circle-outline" size={40} color="green" />
        <Text style={[styles.errorTitle, { color: 'green' }]}>
          Issue Report Submitted
        </Text>
        <Text style={styles.message}>
          Thank you for reporting the issue. Our team will review it shortly.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Report Issue</Text>
        <Text style={styles.subHeader}>
          Describe your problem in detail and send to us.
        </Text>

        <TextInput
          style={styles.textArea}
          placeholder="Describe your problem in detail."
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <TextInput
          style={styles.input}
          placeholder="email@example.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isValid ? '#000' : '#ccc' },
          ]}
          onPress={handleSend}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: width * 0.05,
    paddingTop: RFValue(40),
    paddingBottom: RFValue(30),
  },
  header: {
    fontSize: RFValue(22),
    fontWeight: '600',
    marginBottom: RFValue(8),
    fontFamily: FONTS.bold,
  },
  subHeader: {
    fontSize: RFValue(13),
    color: '#666',
    marginBottom: RFValue(20),
    fontFamily: FONTS.demiBold,
  },
  textArea: {
    height: RFValue(140),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: RFValue(14),
    fontSize: RFValue(13),
    marginBottom: RFValue(16),
    fontFamily: FONTS.demiBold,
    textAlignVertical: 'top',
  },
  input: {
    height: RFValue(50),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: RFValue(14),
    fontSize: RFValue(13),
    marginBottom: RFValue(24),
    fontFamily: FONTS.demiBold,
  },
  button: {
    height: RFValue(50),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(14),
    fontWeight: '500',
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
  retryButton: {
    marginTop: 16,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.demiBold,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: 'red',
    fontFamily: FONTS.bold,
  },
});

export default ReportIssueScreen;
