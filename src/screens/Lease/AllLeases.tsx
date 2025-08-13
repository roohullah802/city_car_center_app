import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useCallback } from 'react';
import { FONTS } from '../../fonts/fonts';


const AllLeases: React.FC<{navigation: any}> = ({navigation}) => {
  const leases = [1, 2, 3,4,5];

  const leasesCallBack = useCallback(()=>{
    return(
      <Pressable onPress={()=> navigation.navigate("leaseDetails")} style={({pressed})=>[{
          opacity: pressed ? 0.9 : 1
      }]}>
        <View style={styles.leaseCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.leaseTitle}>My Lease</Text>
                  <TouchableOpacity style={styles.extendButton} onPress={()=> navigation.navigate("extendLease")}>
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
      </Pressable>
    )
  },[navigation])

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={styles.statusBarBackground} />
      )}
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      {leases.length > 0 ? (
        <View style={styles.contentContainer}>
          <Text style={styles.topText}>Car lease</Text>
          <Text style={styles.topDescription}>
            You have {leases.length} car{leases.length > 1 ? 's' : ''} at lease so far
          </Text>

          <FlatList
            data={leases}
            keyExtractor={(item, index) => index.toString()}
            renderItem={leasesCallBack}
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
    marginBottom: 4,
    fontFamily: FONTS.bold,
  },
  topDescription: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 10,
    fontFamily: FONTS.demiBold,
  },
  leaseCard: {
    width: '100%',
    backgroundColor: '#25262A',
    borderRadius: 15,
    padding: 13,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leaseTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    fontFamily: FONTS.demiBold,
  },
  leaseModel: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 16,
    fontFamily: FONTS.demiBold,
  },
  extendButton: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  extendText: {
    fontWeight: '600',
    fontSize: 10,
    fontFamily: FONTS.demiBold,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  timerBlock: {
    flex: 1,
    alignItems: 'center',
  },
  ti: {
    color: '#fff',
    fontSize: 30,
    marginTop: 10,
    fontFamily: "BebasNeue Regular",
  },
  timerLabel: {
    width: 30,
    fontSize: 11,
    color: '#fff',
    marginTop: 4,
    fontFamily: FONTS.demiBold,
    textAlign: 'center',
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
    fontFamily: FONTS.demiBold,
  },
});

