import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FONTS } from '../../fonts/fonts';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQScreen: React.FC = () => {
  
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = useMemo(
    () => [
      {
        question: 'Who is eligible to lease a car?',
        answer:
          'Anyone aged 21+ (depending on local laws) with valid driving documents, a steady income, and a good credit score may be eligible to lease.',
      },
      {
        question: 'Can I lease a car with bad credit?',
        answer: 'Leasing with bad credit may be more difficult, but some companies may offer options with additional terms.',
      },
      {
        question: 'What is a car lease?',
        answer: 'A car lease is a contract that allows you to use a car for a set period of time while making regular payments.',
      },
      {
        question: 'Can I lease a car with bad credit?',
        answer: 'Yes, but it might require a higher down payment or a co-signer depending on the lender.',
      },
      {
        question: 'When will I be charged?',
        answer: 'You’ll be charged based on your lease agreement terms — typically monthly on the billing date.',
      },
      {
        question: 'How do I start a lease through the app?',
        answer: 'Navigate to the leasing section in the app, choose a vehicle, complete your profile, and submit your application.',
      },
    ],
    []
  );

 
  const handleToggle = useCallback((index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.header}>FAQs</Text>
      <Text style={styles.subHeader}>Frequently Asked Questions (FAQs)</Text>

      {faqData.map((item, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity
            onPress={() => handleToggle(index)}
            style={styles.questionRow}
            activeOpacity={0.7}
          >
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.toggle}>{expandedIndex === index ? '−' : '+'}</Text>
          </TouchableOpacity>

          {expandedIndex === index && <Text style={styles.answer}>{item.answer}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 4,
    fontFamily: FONTS.bold,
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontFamily: FONTS.demiBold,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 1, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    fontFamily: FONTS.demiBold,
  },
  toggle: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 10,
  },
  answer: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    fontFamily: FONTS.demiBold,
  },
});

export default FAQScreen;
