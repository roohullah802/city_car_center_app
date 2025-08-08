import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';


const AllLeases = ({ navigation }: any) => {
  const leases = [1, 2, 3,4,5]; // mock data

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={styles.statusBarBackground} />
      )}
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {leases.length > 0 ? (
        <View style={styles.contentContainer}>
          <Text style={styles.topText}>Car lease</Text>
          <Text style={styles.topDescription}>
            You have {leases.length} car{leases.length > 1 ? 's' : ''} at lease so far
          </Text>

          <FlatList
            data={leases}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => (
              <View style={styles.leaseCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.leaseTitle}>My Lease</Text>
                  <TouchableOpacity style={styles.extendButton}>
                    <Text style={styles.extendText}>Extend Lease</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.leaseModel}>
                  Porsche 2019 - 911 Carrera S
                </Text>

                <View style={styles.timerContainer}>
                  {[
                    { value: '00', label: 'day' },
                    { value: '22', label: 'hr' },
                    { value: '33', label: 'min' },
                    { value: '44', label: 'sec' },
                  ].map((item, index) => (
                    <View key={index} style={styles.timerBlock}>
                      <Text style={styles.ti}>{item.value}</Text>
                      <Text style={styles.timerLabel}>{item.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.noLeaseContainer}>
          <Text style={styles.noLeaseText}>No lease found!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AllLeases;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarBackground: {
    height: Platform.OS === 'ios' ? 44 : 0,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  topText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  topDescription: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 10,
  },
  leaseCard: {
    width: '100%',
    backgroundColor: '#25262A',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leaseTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  leaseModel: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 16,
  },
  extendButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  extendText: {
    fontWeight: '600',
    fontSize: 12,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  timerBlock: {
    flex:1,
    alignItems: 'center',
  },
  ti: {
    color: '#fff',
    fontSize: 32,
    marginTop: 10,
    fontFamily: Platform.OS === 'ios' ? 'digital-7' : 'digital-7',
  },
  timerLabel: {
    flex:1,
    width:30,
    fontSize: 13,
    color: '#fff',
    marginTop: 4,
  },
  noLeaseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  noLeaseText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});
