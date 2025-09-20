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
import { useGetPaymentDetailsQuery } from '../../redux.toolkit/rtk/leaseApis';

const { width } = Dimensions.get('window');

type Payment = {
  paymentId: string;
  Reason: string;
  totalAmount: string;
  startDate: string;
  endDate: string;
  status: string;
  _id: string
};

const PaymentDetails: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { id } = route.params;

  const { data } = useGetPaymentDetailsQuery(id);
  const payment = data?.data.leases;

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const renderItem = useCallback(({ item }: { item: Payment }) => {
    return (
      <View style={styles.paymentItem}>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentId}>
            {!item?.paymentId ? item?.paymentId : 'No ID'}
          </Text>
          <Text style={styles.reason}>
            lease created from {formatDate(item.startDate)} to{' '}
            {formatDate(item.endDate)}
          </Text>
          <View style={styles.details}>
            <Text style={styles.date}>{formatDate(item.startDate)}</Text>
            <Text
              style={[
                styles.amount,
                item.status === 'completed'
                  ? styles.unSuccessText
                  : styles.successText,
              ]}
            >
              ${item.totalAmount}
            </Text>
            <Text
              style={[
                styles.status,
                item.status === 'incomplete'
                  ? styles.unsuccessStatus
                  : styles.successStatus,
              ]}
            >
              {item.status}
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
            <Icon name="chevron-back" size={24} color='#1F305E' />
          </TouchableOpacity>
          <Text style={styles.headerText}>Payment Details</Text>
        </View>

        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Payment ID</Text>
            <Text style={[styles.tableHeaderText, { marginRight: 30 }]}>
              Reason
            </Text>
            <Text style={styles.tableHeaderText}>Date</Text>
          </View>

          {!payment || payment?.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No payment history</Text>
            </View>
          ) : (
            <FlatList
              data={payment}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.itemGap} />}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  content: {
    padding: RFValue(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop:10
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
    color:'#1F305E'
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
    color: '#1F305E',
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
    color:'#1F305E'
  },
  reason: {
    fontFamily: FONTS.demiBold,
    fontSize: RFValue(10),
    width: width * 0.25,
    marginLeft: 20,
    color:'#1F305E'
  },
  details: {
    width: width * 0.25,
    alignItems: 'flex-end',
  },
  date: {
    fontFamily: FONTS.demiBold,
    fontSize: RFValue(9),
    color:'#1F305E'
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
  noDataContainer: {
    alignItems: 'center',
    marginTop: RFValue(20),
  },

  noDataText: {
    fontSize: RFValue(12),
    color: '#888',
    fontFamily: FONTS.medium,
  },
});
