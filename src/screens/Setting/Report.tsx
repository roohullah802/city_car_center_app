import React, { useState, useCallback, useMemo } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { FONTS } from '../../fonts/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

const ReportIssueScreen: React.FC = () => {
  const [issue, setIssue] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const isValid = useMemo(() => issue.trim().length > 0 && email.includes('@'), [issue, email]);

  const handleSend = useCallback(() => {
    if (!isValid) {
      Alert.alert('Invalid Input', 'Please enter a valid issue description and email.');
      return;
    }

    Alert.alert('Report Sent', 'Thank you for your feedback!');
    setIssue('');
    setEmail('');
  }, [isValid]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Report Issue</Text>
        <Text style={styles.subHeader}>Describe your problem in detail and send to us.</Text>

        <TextInput
          style={styles.textArea}
          placeholder="Describe your problem in detail."
          placeholderTextColor="#999"
          value={issue}
          onChangeText={setIssue}
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
          style={[styles.button, { backgroundColor: isValid ? '#000' : '#ccc' }]}
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
});

export default ReportIssueScreen;
