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
} from 'react-native';
import { FONTS } from '../../fonts/fonts';

const ReportIssueScreen: React.FC = () => {
  const [issue, setIssue] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const isValid = useMemo(() => issue.trim().length > 0 && email.includes('@'), [issue, email]);

  const handleSend = useCallback(() => {
    if (!isValid) {
      Alert.alert('Invalid Input', 'Please enter a valid issue description and email.');
      return;
    }

    // Simulate sending report
    Alert.alert('Report Sent', 'Thank you for your feedback!');
    setIssue('');
    setEmail('');
  }, [isValid]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.content}>
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
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily:FONTS.bold
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontFamily:FONTS.demiBold
  },
  textArea: {
    height: 140,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 14,
    marginBottom: 16,
    fontFamily:FONTS.demiBold
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    marginBottom: 24,
    fontFamily:FONTS.demiBold
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    fontFamily:FONTS.demiBold
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily:FONTS.demiBold

  },
});

export default ReportIssueScreen;
