import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useStripe } from '@stripe/stripe-react-native';
import { useCreatePaymentIntendMutation } from '../../redux.toolkit/rtk/payment';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux.toolkit/store';

const DateAndTimeScreen: React.FC<{
  navigation: any;
  route: { params: { carId: string } };
}> = ({ route, navigation }) => {
  const { carId } = route.params;

  // State
  const [pickUpDate, setPickUpDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const {isLoggedIn} = useSelector((state: RootState)=> state.user)
  // Stripe
  const [createPaymentIntent] = useCreatePaymentIntendMutation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // Return date = pickUpDate + 6 days
  const returnDate = useMemo(() => {
    const result = new Date(pickUpDate);
    if (isNaN(result.getTime())) return new Date();
    result.setDate(result.getDate() + 7);
    return result;
  }, [pickUpDate]);

  // Date picker handler
  const onChangeDate = useCallback(
  (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS !== 'ios') setShowDatePicker(false);

    let currentDate: Date | undefined;

    // iOS: use selectedDate
    if (Platform.OS === 'ios') {
      currentDate = selectedDate;
    } else {
      // Android: use event.nativeEvent.timestamp
      if (event.type === 'set' && event.nativeEvent.timestamp) {
        currentDate = new Date(event.nativeEvent.timestamp);
      }
    }

    if (currentDate && !isNaN(currentDate.getTime())) {
      setPickUpDate(currentDate);
    }
  },
  []
);



  // Format date safely
  const formattedDate = (date: Date) => {
    if (!date || isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle payment
  const handlePress = async () => {
    setLoading(true);
    try {
      // 1. Request PaymentIntent from backend
      const validCarId = carId.replace(/"/g, '');
      if (!isLoggedIn) {
        Toast.show({
          type:"error",
          text1: 'Error!',
          text2:'please login user first'
        })
      }
      const response = await createPaymentIntent({
        id: validCarId,
        startDate: pickUpDate.toISOString(),
        endDate: returnDate.toISOString(),
      }).unwrap();
      
      const clientSecret = response?.clientSecret;
      if (!clientSecret) throw new Error('No client secret returned');
      

      // 2. Initialize payment sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'City Car Center',
        paymentIntentClientSecret: clientSecret,
      });
      if (initError) throw initError;

      // 3. Present payment sheet
      const { error: presentError } = await presentPaymentSheet();
      if (presentError) throw presentError;
      navigation.navigate('paymentSuccess');
    } catch (error: any) {
      
      Toast.show({
        type:"error",
        text1: 'Error occured!',
        text2:error.data.message
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Date and Time</Text>

      {/* Pick-up Date */}
      <TouchableOpacity
        style={styles.dateBox}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateLabel}>Pick-up Date</Text>
        <Text style={styles.dateText}>{formattedDate(pickUpDate)}</Text>
      </TouchableOpacity>

      {/* Return Date */}
      <View style={styles.dateBox}>
        <Text style={styles.dateLabel}>Return Date</Text>
        <Text style={styles.dateText}>{formattedDate(returnDate)}</Text>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={pickUpDate || new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      {/* Payment Button */}
      <TouchableOpacity
        style={[styles.payButton, loading && { opacity: 0.7 }]}
        onPress={handlePress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payText}>Continue</Text>
        )}
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
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    color: '#1F305E',
    marginTop: 20
  },
  dateBox: {
    backgroundColor: '#f6f6f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F305E',
  },
  payButton: {
    backgroundColor: '#73C2FB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  payText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
