import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { FONTS } from '../../fonts/fonts';

type RateOption = {
  label: string;
  subLabel: string;
  value: number;
  type: 'daily' | 'weekly' | 'monthly';
};

const ExtendLeaseScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [selectedRate, setSelectedRate] = useState<RateOption | null>(null);
  const [manualDays, setManualDays] = useState('10');

  const rateOptions: RateOption[] = useMemo(() => [
    { label: 'Daily Rate', subLabel: '(+20%)', value: 44.40, type: 'daily' },
    { label: 'Weekly Rate', subLabel: '', value: 295.00, type: 'weekly' },
    { label: 'Monthly Rate', subLabel: '(-15%)', value: 880.60, type: 'monthly' },
  ], []);

  const handleSelectRate = useCallback((option: RateOption) => {
    setSelectedRate(option);
    // Optional: Update manualDays based on rate if needed
  }, []);

  const handleManualInput = useCallback((text: string) => {
    // Only allow numeric input
    const numericValue = text.replace(/[^0-9]/g, '');
    setManualDays(numericValue);
    setSelectedRate(null); // Clear selection if manually typed
  }, []);

  const handleContinue = useCallback(() => {
    const days = Number(manualDays);
    if (selectedRate) {
      console.log('Selected rate:', selectedRate);
    }
    console.log('Manual days entered:', days);
    // Handle form submission here
  }, [selectedRate, manualDays]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-back" size={24} color="#000" />
              </TouchableOpacity>
        <Text style={styles.header}>Extend Lease</Text>
        <Text style={styles.subHeader}>
          Choose how much days you want to extend the lease of the car
        </Text>

        <Text style={styles.sectionTitle}>Default Days with Rate</Text>

        <View style={styles.rateOptions}>
          {rateOptions.map((option) => {
            const isSelected = selectedRate?.type === option.type;
            return (
              <TouchableOpacity
                key={option.type}
                style={[styles.rateCard, isSelected && styles.selectedRateCard]}
                onPress={() => handleSelectRate(option)}
              >
                <Text style={styles.rateLabel}>
                  {option.label} {option.subLabel}
                </Text>
                <Text style={styles.rateValue}>{option.value.toFixed(2)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Or enter your days manually</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={manualDays}
            onChangeText={handleManualInput}
            placeholder="Enter number of days"
            placeholderTextColor="#aaa"
          />
          <Text style={styles.daySuffix}>- Days</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    color: '#002A32',
    marginTop: 50,
    fontFamily:FONTS.bold

  },
  subHeader: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
    fontFamily:FONTS.demiBold
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#111',
    fontFamily:FONTS.demiBold
  },
  rateOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  rateCard: {
    width: (width - 60) / 3,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRateCard: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  rateLabel: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily:FONTS.demiBold
  },
  rateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily:FONTS.demiBold
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontFamily:FONTS.demiBold
  },
  daySuffix: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily:FONTS.demiBold
  },
    backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    zIndex: 2,
  },
});

export default ExtendLeaseScreen;
