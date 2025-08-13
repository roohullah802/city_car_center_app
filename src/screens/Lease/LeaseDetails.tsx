import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../fonts/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

type RateOption = {
  label: string;
  value: number;
};

const LeaseDetails: React.FC<{ navigation: any }> = ({ navigation }) => {
  const rateOptions: RateOption[] = useMemo(
    () => [
      { label: 'Initial Miles:', value: 251618,},
      { label: 'Miles Allowed:', value: 583618, },
    ],
    [],
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontFamily: FONTS.bold }}>Lease Details</Text>
          </View>

          <TouchableOpacity>
            <Icon name="ellipsis-horizontal" size={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Lease Info:</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Status:</Text>
          <Text style={[styles.priceValue, { color: 'green' }]}>Active</Text>
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
          <Text style={styles.priceValue}>June 16, 2025 - 10:30PM</Text>
        </View>

        <View style={styles.line} />
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Lease End Date & Time:</Text>
          <Text style={styles.priceValue}>June 22, 2025 - 10:30PM</Text>
        </View>

        <Text style={styles.sectionTitle}>Miles:</Text>
        <View style={styles.rateOptions}>
          {rateOptions.map((option, index)=>{
            return(
               <TouchableOpacity
                key={index}
                style={[styles.rateCard]}
              >
                <Text style={styles.rateLabel}>
                  {option.label}
                </Text>
                <Text style={styles.rateValue}>{option.value.toFixed(0)}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <Text style={styles.sectionTitle}>Car Info:</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>ID:</Text>
          <Text style={[styles.priceValue]}>242132</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Car:</Text>
          <Text style={styles.priceValue}>Mercedes EQC 300kW AMG Line</Text>
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

        <Text style={styles.sectionTitle}>Contact Us:</Text>
          <View style={{flexDirection:"row", gap: 10}}>
            <Icon name="call" size={22} color={"#9b9b9bff"} />
            <Text style={{    color: '#9b9b9bff',fontSize: 12, fontFamily:FONTS.demiBold}}>+9234567673338</Text>
          </View>

          <View style={{flexDirection:"row", gap: 10, marginTop: 10}}>
            <Icon name="mail" size={22} color={"#9b9b9bff"} />
            <Text style={{    color: '#9b9b9bff',fontSize: 12, fontFamily:FONTS.demiBold}}>example@gmail.com</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("extendLease")}>
                    <Text style={styles.buttonText}>Extend Lease</Text>
                  </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaseDetails;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 30 : -10,

    zIndex: 2,
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 15,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: RFValue(12),
    marginTop: 20,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    marginVertical: 8,
  },
   rateOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rateCard: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor:"#dbdbdbff",
    borderColor: '#ddd',
    color:"white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateLabel: {
    fontSize: 12,
    color: '#9b9b9bff',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: FONTS.demiBold,
  },
  rateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717ff',
    fontFamily: FONTS.demiBold,
  },
   button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    opacity: 1,
    marginBottom: 20
  },
    buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FONTS.demiBold,
  },
});
