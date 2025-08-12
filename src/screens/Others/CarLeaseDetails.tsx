import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '../../fonts/fonts'; // Ensure this path is correct

const { width } = Dimensions.get('window');

const carImages = [
  { id: 1, image: require('../../assests/car1.jpg') },
  { id: 2, image: require('../../assests/car2.jpg') },
  { id: 3, image: require('../../assests/car1.jpg') },
  { id: 4, image: require('../../assests/car2.jpg') },
  { id: 5, image: require('../../assests/car1.jpg') },
];

type RateOption = {
  label: string;
  value: number;
  type: string;
};

const CarLeaseDetails: React.FC<{ navigation: any }> = ({ navigation }) => {
  const rateOptions: RateOption[] = useMemo(() => [
    { label: 'Max Power', value: 44.4, type: 'hp' },
    { label: '0-60 mph', value: 295.0, type: 'sec' },
    { label: 'Top Speed', value: 880.6, type: 'mph' },
  ], []);

  const [activeImage, setActiveImage] = useState<number>(0);

  const renderCarImage = useCallback(({ item }: { item: any }) => (
    <View style={styles.carWrapper}>
      <Image source={item.image} style={styles.carImage} resizeMode="cover" />
    </View>
  ), []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <SafeAreaView style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.titleText}>Mercedes-Benz EQC 300kW</Text>

        {/* Status Boxes */}
        <View style={styles.statusRow}>
          <View style={styles.statusBox}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Available</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>Fully featured</Text>
          </View>
        </View>

        {/* Image Carousel */}
        <FlatList
          data={carImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCarImage}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setActiveImage(Math.round(x / width));
          }}
        />

        {/* Image Dots */}
        <View style={styles.dotsContainer}>
          {carImages.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                activeImage === i ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Rating */}
        <Text style={styles.ratingText}>
          ⭐ 5.0 <Text style={styles.ratingSub}> (100+ Reviews)</Text>
        </Text>

        {/* Car Info */}
        <Text style={styles.sectionTitle}>Car Info</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoColumn}>
            <View style={styles.infoItem}>
              <Icon name="person" size={16} />
              <Text style={styles.infoText}>2 Passengers</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="snow" size={16} />
              <Text style={styles.infoText}>Air Conditioning</Text>
            </View>
          </View>
          <View style={styles.infoColumn}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="car-door" size={16} />
              <Text style={styles.infoText}>2 Doors</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="gas-station" size={16} />
              <Text style={styles.infoText}>Fuel Info</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="car-shift-pattern" size={16} />
          <Text style={styles.infoText}>Manual</Text>
        </View>

        {/* Car Specs */}
        <Text style={styles.sectionTitle}>Car Specs</Text>
        <View style={styles.specRow}>
          {rateOptions.map((option, idx) => (
            <View key={idx} style={styles.specCard}>
              <Text style={styles.specLabel}>{option.label}</Text>
              <Text style={styles.specValue}>
                {option.value.toFixed(2)} <Text style={styles.specUnit}>{option.type}</Text>
              </Text>
            </View>
          ))}
        </View>

        {/* Price Info */}
        <Text style={styles.sectionTitle}>Price & Lease Info</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Weekly Rate:</Text>
          <Text style={styles.priceValue}>$0/week</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Tax:</Text>
          <Text style={styles.priceValue}>$8.4 flat (7 days)</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Lease Duration:</Text>
          <Text style={styles.priceValue}>7 Days (Default)</Text>
        </View>

        {/* Lease Button */}
        <TouchableOpacity style={styles.leaseButton} onPress={() => navigation.navigate('dateAndTime')}>
          <Text style={styles.leaseButtonText}>Lease this car</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CarLeaseDetails;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 700,
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 10,
    zIndex: 2,
  },
  titleText: {
    fontSize: RFValue(16),
    fontFamily: FONTS.bold,
    marginTop: 60,
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 22,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#000',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'green',
    marginRight: 5,
  },
  statusText: {
    fontSize: RFValue(8),
    fontFamily: FONTS.demiBold,
  },
  carWrapper: {
    width: width * 0.90,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 8,
    marginBottom: 5,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: -25,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
    marginHorizontal: 3,
  },
  activeDot: {
    width: 25,
  },
  inactiveDot: {
    width: 7,
  },
  ratingText: {
    fontSize: RFValue(10),
    fontFamily: FONTS.demiBold,
    marginTop: 10,
  },
  ratingSub: {
    fontSize: RFValue(8),
    color: 'gray',
    fontFamily: FONTS.demiBold,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: RFValue(12),
    marginTop: 20,
    marginBottom: 10,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  infoColumn: {
    gap: 10,
    flex: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  infoText: {
    fontSize: RFValue(10),
    color: '#5e5e5e',
    fontFamily: FONTS.demiBold,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  specCard: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specLabel: {
    fontSize: RFValue(8),
    color: 'gray',
    marginBottom: 6,
    textAlign: 'center',
  },
  specValue: {
    fontSize: RFValue(14),
    fontFamily: FONTS.demiBold,
    textAlign: 'center',
  },
  specUnit: {
    fontSize: RFValue(8),
    color: 'gray',
    fontFamily: FONTS.demiBold,
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
  leaseButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  leaseButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(14),
    fontFamily: FONTS.demiBold,
  },
});
