import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, { useCallback } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../fonts/fonts';

const { width } = Dimensions.get('window');

type Payment = {
  PaymentId: string;
  Reason: string;
  Amount: string;
  Date: string;
  Status: string;
};

const PaymentDetails: React.FC<{ navigation: any }> = ({ navigation }) => {
  const payments: Payment[] = [
    {
      PaymentId: '234133443',
      Reason: 'Lease extension from 16/2/2025 to 22/2/2025',
      Amount: '$120',
      Date: '15/2/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133413',
      Reason: 'Lease extension from 23/2/2025 to 1/3/2025',
      Amount: '$121',
      Date: '22/2/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133414',
      Reason: 'Lease extension from 2/3/2025 to 8/3/2025',
      Amount: '$122',
      Date: '1/3/2025',
      Status: 'Unsuccessful',
    },
    {
      PaymentId: '234133415',
      Reason: 'Lease extension from 9/3/2025 to 15/3/2025',
      Amount: '$120',
      Date: '8/3/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133416',
      Reason: 'Lease extension from 16/3/2025 to 22/3/2025',
      Amount: '$120',
      Date: '15/3/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133417',
      Reason: 'Lease extension from 23/3/2025 to 29/3/2025',
      Amount: '$120',
      Date: '22/3/2025',
      Status: 'Unsuccessful',
    },
    {
      PaymentId: '234133418',
      Reason: 'Lease extension from 30/3/2025 to 5/4/2025',
      Amount: '$120',
      Date: '29/3/2025',
      Status: 'Unsuccessful',
    },
    {
      PaymentId: '234133419',
      Reason: 'Lease extension from 6/4/2025 to 12/4/2025',
      Amount: '$120',
      Date: '5/4/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133420',
      Reason: 'Lease extension from 13/4/2025 to 19/4/2025',
      Amount: '$120',
      Date: '12/4/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133421',
      Reason: 'Lease extension from 20/4/2025 to 26/4/2025',
      Amount: '$120',
      Date: '19/4/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133422',
      Reason: 'Lease extension from 27/4/2025 to 3/5/2025',
      Amount: '$120',
      Date: '26/4/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133423',
      Reason: 'Lease extension from 4/5/2025 to 10/5/2025',
      Amount: '$120',
      Date: '3/5/2025',
      Status: 'Unsuccessful',
    },
    {
      PaymentId: '234133424',
      Reason: 'Lease extension from 11/5/2025 to 17/5/2025',
      Amount: '$120',
      Date: '10/5/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133425',
      Reason: 'Lease extension from 18/5/2025 to 24/5/2025',
      Amount: '$120',
      Date: '17/5/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133426',
      Reason: 'Lease extension from 25/5/2025 to 31/5/2025',
      Amount: '$120',
      Date: '24/5/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133427',
      Reason: 'Lease extension from 1/6/2025 to 7/6/2025',
      Amount: '$120',
      Date: '31/5/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133428',
      Reason: 'Lease extension from 8/6/2025 to 14/6/2025',
      Amount: '$120',
      Date: '7/6/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133429',
      Reason: 'Lease extension from 15/6/2025 to 21/6/2025',
      Amount: '$120',
      Date: '14/6/2025',
      Status: 'Unsuccessful',
    },
    {
      PaymentId: '234133430',
      Reason: 'Lease extension from 22/6/2025 to 28/6/2025',
      Amount: '$120',
      Date: '21/6/2025',
      Status: 'Successfully',
    },
    {
      PaymentId: '234133431',
      Reason: 'Lease extension from 29/6/2025 to 5/7/2025',
      Amount: '$120',
      Date: '28/6/2025',
      Status: 'Successfully',
    },
  ];

  const renderItem = useCallback(({ item }: { item: Payment }) => {
    return (
      <View style={styles.paymentItem}>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentId}>{item.PaymentId}</Text>
          <Text style={styles.reason}>{item.Reason}</Text>
          <View style={styles.details}>
            <Text style={styles.date}>{item.Date}</Text>
            <Text
              style={[
                styles.amount,
                item.Status === 'Unsuccessful'
                  ? styles.unSuccessText
                  : styles.successText,
              ]}
            >
              {item.Amount}
            </Text>
            <Text
              style={[
                styles.status,
                item.Status === 'Unsuccessful'
                  ? styles.unsuccessStatus
                  : styles.successStatus,
              ]}
            >
              {item.Status}
            </Text>
          </View>
        </View>
        <View style={styles.separatorLine} />
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Payment Details</Text>
        </View>

        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Payment ID</Text>
            <Text style={[styles.tableHeaderText, {marginRight: 30}]}>Reason</Text>
            <Text style={styles.tableHeaderText}>Date</Text>
          </View>

          <FlatList
            data={payments}
            renderItem={renderItem}
            keyExtractor={item => item.PaymentId.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.itemGap} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: RFValue(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingRight: RFValue(10),
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: RFValue(16),
    flex: 1,
    textAlign: 'center',
    marginRight: RFValue(30),
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFValue(20),
    marginBottom: RFValue(15),
  },
  tableHeaderText: {
    fontFamily: FONTS.demiBold,
    fontSize: RFValue(12),
    color: '#8a8a8aff',
  },
  paymentItem: {
    marginBottom: RFValue(15),
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  paymentId: {
    fontFamily: FONTS.demiBold,
    fontSize: RFValue(10),
    width: width * 0.25,
  },
  reason: {
    fontFamily: FONTS.demiBold,
    fontSize: RFValue(10),
    width: width * 0.3,
  },
  details: {
    width: width * 0.25,
    alignItems: 'flex-end',
  },
  date: {
    fontFamily: FONTS.demiBold,
    fontSize: RFValue(9),
  },
  amount: {
    fontFamily: FONTS.demiBold,
    fontSize: RFValue(9),
  },
  status: {
    fontFamily: FONTS.demiBold,
    fontSize: RFValue(7),
    borderRadius: 20,
    paddingVertical: RFValue(2),
    paddingHorizontal: RFValue(8),
    overflow: 'hidden',
    marginTop: RFValue(4),
  },
  successStatus: {
    backgroundColor: '#dce1e9ff',
    color: 'blue',
  },
  unsuccessStatus: {
    backgroundColor: '#ecddddff',
    color: 'red',
  },
  separatorLine: {
    borderWidth: 0.2,
    width: '100%',
    borderColor: '#aaaaaaff',
    marginTop: RFValue(20),
  },
  itemGap: {
    height: RFValue(10),
  },
  unSuccessText: {
    color: 'red',
  },
  successText: {
    color: 'black',
  },
});
