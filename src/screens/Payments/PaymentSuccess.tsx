import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { FONTS } from '../../fonts/fonts';

const { width, height } = Dimensions.get('window');


const scaleFont = (size: number) => {
  const scale = width / 375;
  return Math.round(size * scale);
};


interface Props {
  navigation: any,
}

const PaymentSuccessScreen: React.FC<Props> = ({ navigation }) => {
    

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.checkmark}>✓</Text>
      </View>
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.subtitle}>
        You’re all set — your lease has been processed and confirmed. Our team is getting everything ready for your scheduled pick-up.
      </Text>
      <View style={styles.detailsContainer}>
        {/* {leaseDetailsDisplay} */}
      </View>

      <TouchableOpacity style={styles.homeButton} onPress={()=> navigation.navigate('Tabs',{screen: 'Home'})} activeOpacity={0.7}>
        <Text style={styles.homeButtonText}>Go to home page</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.timerButton} onPress={()=> navigation.navigate('Tabs', {screen: 'Lease'})} activeOpacity={0.7}>
        <Text style={styles.timerButtonText}>View Lease Timer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: height,
  },
  iconContainer: {
    backgroundColor: '#000',
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    color: 'white',
    fontSize: scaleFont(32),
    fontWeight: 'bold',
  },
  title: {
    fontSize: scaleFont(22),
    fontWeight: '700',
    color: '#004466',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: FONTS.bold
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: '#444',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: FONTS.demiBold
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#555',
    fontSize: scaleFont(14),
  },
  detailValue: {
    color: '#222',
    fontSize: scaleFont(14),
    flexShrink: 1,
    textAlign: 'right',
    maxWidth: '65%',
  },
  homeButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: scaleFont(16),
    textAlign: 'center',
    fontFamily:FONTS.demiBold
  },
  timerButton: {
    backgroundColor: '#004466',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
  },
  timerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: scaleFont(16),
    textAlign: 'center',
    fontFamily:FONTS.demiBold
  },
});

export default PaymentSuccessScreen;
