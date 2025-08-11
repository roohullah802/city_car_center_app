import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { FONTS } from '../../fonts/fonts';

const TermsPrivacyScreen: React.FC = () => {
  const terms = useMemo(
    () => [
      {
        title: 'Acceptance of Terms',
        content:
          'By using our app, you agree to comply with and be bound by these terms. If you do not agree, please do not use the service.',
      },
      {
        title: 'User Responsibilities',
        content:
          'You must provide accurate information and use the platform responsibly. Misuse, abuse, or unauthorized access may result in termination.',
      },
      {
        title: 'Account Access & Security',
        content:
          'You are responsible for safeguarding your password. Two-factor authentication is recommended for additional security.',
      },
      {
        title: 'Service Usage',
        content:
          'Our app facilitates connections between individuals with disabilities, carers, therapists, and support teams. Booking sessions, messaging, and emergency features must be used ethically and legally.',
      },
      {
        title: 'Payments & Refunds',
        content:
          'Payments made for services (e.g., carer support or therapy) are subject to cancellation and refund policies displayed before booking.',
      },
      {
        title: 'Termination of Services',
        content:
          'We reserve the right to suspend or terminate your access if you violate our terms or use the app inappropriately.',
      },
    ],
    []
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Terms & Privacy Policy</Text>
      <Text style={styles.subHeader}>Last updated: June 23, 2025</Text>

      {terms.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionContent}>{section.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily:FONTS.bold
  },
  subHeader: {
    fontSize: 13,
    color: '#888',
    marginBottom: 20,
    fontFamily:FONTS.demiBold
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
    color: '#111',
    fontFamily:FONTS.bold
  },
  sectionContent: {
    fontSize: 13,
    color: '#707070ff',
    lineHeight: 20,
    fontFamily:FONTS.demiBold
  },
});

export default TermsPrivacyScreen;
