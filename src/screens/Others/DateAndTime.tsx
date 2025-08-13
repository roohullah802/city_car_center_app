import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const DateAndTimeScreen: React.FC<{navigation: any}> = () => {
  const [pickUpDate, setPickUpDate] = useState(new Date(Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const returnDate = useMemo(() => {
    const result = new Date(pickUpDate);
    result.setDate(pickUpDate.getDate() + 6);
    return result;
  }, [pickUpDate]);



  const onChangeDate = useCallback((event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setPickUpDate(selectedDate);
    }
  }, []);

  const formattedDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Date and Time</Text>

      <TouchableOpacity style={styles.dateBox} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateLabel}>Pick-up Date</Text>
        <Text style={styles.dateText}>{formattedDate(pickUpDate)}</Text>
      </TouchableOpacity>

      <View style={styles.dateBox}>
        <Text style={styles.dateLabel}>Return Date</Text>
        <Text style={styles.dateText}>{formattedDate(returnDate)}</Text>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={pickUpDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payText}>Pay now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DateAndTimeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    minHeight: '100%',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    color: '#002B3F'
  },
 
  dateBox: {
    backgroundColor: '#f6f6f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  dateLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222'
  },
  payButton: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30
  },
  payText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
