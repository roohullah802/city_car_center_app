import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '../../fonts/fonts';

type RateOption = {
  label: string;
  value: number;
};

const LeaseDetails: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const rateOptions: RateOption[] = useMemo(
    () => [
      { label: 'Initial Miles:', value: 251618 },
      { label: 'Miles Allowed:', value: 583618 },
    ],
    []
  );

  const toggleMenu = () => setMenuVisible((prev) => !prev);
  const closeMenu = () => setMenuVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={closeMenu}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-back" size={24} color="#000" />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Lease Details</Text>

              <View style={styles.menuWrapper}>
                <TouchableOpacity onPress={toggleMenu}>
                  <Icon name="ellipsis-horizontal" size={24} color="#000" />
                </TouchableOpacity>

                {menuVisible && (
                  <View style={styles.dropdownMenu}>
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setMenuVisible(false);
                        navigation.navigate('paymentDetails');
                      }}
                    >
                      <Text style={styles.dropdownText}>Payment Details</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            {/* Lease Info */}
            <Text style={styles.sectionTitle}>Lease Info:</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Status:</Text>
              <Text style={[styles.priceValue, styles.statusActive]}>
                Active
              </Text>
            </View>
            <View style={styles.line} />
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Lease Type:</Text>
              <Text style={styles.priceValue}>Unlimited Miles Lease</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Daily Miles:</Text>
              <Text style={styles.priceValue}>2000</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Duration:</Text>
              <Text style={styles.priceValue}>7 Days</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Lease Start Date & Time:</Text>
              <Text style={styles.priceValue}>
                June 16, 2025 - 10:30PM
              </Text>
            </View>
            <View style={styles.line} />
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Lease End Date & Time:</Text>
              <Text style={styles.priceValue}>
                June 22, 2025 - 10:30PM
              </Text>
            </View>

            {/* Miles Info */}
            <Text style={styles.sectionTitle}>Miles:</Text>
            <View style={styles.rateOptions}>
              {rateOptions.map((option, index) => (
                <View key={index} style={styles.rateCard}>
                  <Text style={styles.rateLabel}>{option.label}</Text>
                  <Text style={styles.rateValue}>
                    {option.value.toFixed(0)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Car Info */}
            <Text style={styles.sectionTitle}>Car Info:</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>ID:</Text>
              <Text style={styles.priceValue}>242132</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Car:</Text>
              <Text style={styles.priceValue}>
                Mercedes EQC 300kW AMG Line
              </Text>
            </View>
            <View style={styles.line} />
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Plate:</Text>
              <Text style={styles.priceValue}>3412XCV</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Miles:</Text>
              <Text style={styles.priceValue}>291437</Text>
            </View>

            {/* Contact Info */}
            <Text style={styles.sectionTitle}>Contact Us:</Text>
            <View style={styles.contactRow}>
              <Icon name="call" size={22} color="#9b9b9bff" />
              <Text style={styles.contactText}>+9234567673338</Text>
            </View>
            <View style={[styles.contactRow, styles.contactRowMargin]}>
              <Icon name="mail" size={22} color="#9b9b9bff" />
              <Text style={styles.contactText}>example@gmail.com</Text>
            </View>

            {/* Extend Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('extendLease')}
            >
              <Text style={styles.buttonText}>Extend Lease</Text>
            </TouchableOpacity>
          </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LeaseDetails;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFValue(15),
    backgroundColor: '#fff',
  },
  scrollContent: {
  padding: 3,
},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RFValue(10),
  },
  backButton: {
    paddingRight: RFValue(10),
  },
  headerTitle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.bold,
    color: '#000',
  },
  menuWrapper: {
    position: 'relative',
  },
  dropdownMenu: {
    position: 'absolute',
    top: RFValue(28),
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    minWidth: RFValue(120),
  },
  dropdownItem: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(12),
  },
  dropdownText: {
    fontFamily: FONTS.demiBold,
    fontSize: RFValue(11),
    color: '#333',
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: RFValue(12),
    marginTop: RFValue(20),
    marginBottom: RFValue(10),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFValue(10),
  },
  priceLabel: {
    fontSize: RFValue(10),
    fontFamily: FONTS.demiBold,
    color: 'gray',
  },
  priceValue: {
    fontSize: RFValue(10),
    fontFamily: FONTS.demiBold,
    color: 'gray',
  },
  statusActive: {
    color: 'green',
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    marginVertical: RFValue(8),
  },
  rateOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(10),
  },
  rateCard: {
    flex: 1,
    marginHorizontal: RFValue(5),
    backgroundColor: '#dbdbdbff',
    borderRadius: RFValue(10),
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateLabel: {
    fontSize: RFValue(10),
    color: '#9b9b9bff',
    textAlign: 'center',
    marginBottom: RFValue(4),
    fontFamily: FONTS.demiBold,
  },
  rateValue: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#171717ff',
    fontFamily: FONTS.demiBold,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactRowMargin: {
    marginTop: RFValue(10),
  },
  contactText: {
    color: '#9b9b9bff',
    fontSize: RFValue(10),
    fontFamily: FONTS.demiBold,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: RFValue(14),
    borderRadius: RFValue(10),
    alignItems: 'center',
    marginTop: RFValue(30),
    marginBottom: RFValue(20),
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(14),
    fontWeight: '500',
    fontFamily: FONTS.demiBold,
  },
});

