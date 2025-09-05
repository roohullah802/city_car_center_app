import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { FONTS } from '../../fonts/fonts';
import { useGetAllFaqsQuery } from '../../redux.toolkit/rtk/apis';
import Icon from 'react-native-vector-icons/Ionicons';


interface FAQItem {
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

const FAQScreen: React.FC = () => {
  
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const {data: Faqs, isLoading, isError, refetch} = useGetAllFaqsQuery([]); 
  const faqData: FAQItem[] = Faqs?.data
  
  
  const handleToggle = useCallback((index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  }, []);


  const renderedFaqs = useMemo(()=>{
    return faqData?.map((item: any, index: number) => (
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
      ))
  },[expandedIndex, faqData, handleToggle])

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
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.header}>FAQs</Text>
      <Text style={styles.subHeader}>Frequently Asked Questions (FAQs)</Text>

      {renderedFaqs}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: 'red',
    fontFamily: FONTS.bold,
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
});

export default FAQScreen;
