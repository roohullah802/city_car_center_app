import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { FONTS } from '../../fonts/fonts';

const { width } = Dimensions.get('window');

const brands = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const cars = [
  {
    id: 1,
    name: 'Mercedes Car EQC 300kW',
    price: '$300',
    rating: 5.0,
    image: require('../../assests/car1.jpg'),
  },
  {
    id: 2,
    name: 'Red Mazda',
    price: '$280',
    rating: 4.8,
    image: require('../../assests/car2.jpg'),
  },
];

const leaseData = [1, 2, 3, 4, 5];

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const route = useRoute();
  const isFocused = useIsFocused();

  const leaseDataCallBack = useCallback(() => {
    return (
      <View style={styles.leaseCard}>
        <View style={styles.view}>
          <Text style={styles.leaseTitle}>My Lease</Text>
          <TouchableOpacity
            style={styles.extendButton}
            onPress={() => navigation.navigate('extendLease')}
          >
            <Text style={styles.extendText}>Extend Lease</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.leaseModel}>Porsche 2019 - 911 Carrera S</Text>
        {/* <Text style={styles.timer}>my timer</Text> */}
        <View style={styles.timerContainer}>
          {[
            { value: '00', label: 'days' },
            { value: '22', label: 'Hours' },
            { value: '33', label: 'Mins' },
            { value: '44', label: 'Secs' },
          ].map((item, index) => (
            <View key={index} style={styles.timerBlock}>
              <Text style={styles.ti}>{item.value}</Text>
              <Text style={styles.timerLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }, [navigation]);

  const brandsCallBack = useCallback(() => {
    return (
      <View style={styles.brandCard}>
        <Image
          style={styles.brandImage}
          source={require('../../assests/bmwlogo.jpeg')}
        />
      </View>
    );
  }, []);

  const carsCallBack = useCallback(
    (item: any) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('carDetails')}>
          <View style={styles.carCard}>
            <View style={styles.carImageSetup}>
              <Image source={item.image} style={styles.carThumb} />
            </View>
            <Text style={styles.carName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.carRating}>⭐ {item.rating}</Text>
              <Text style={styles.carPrice}>{item.price}/day</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation]
  );

  return (
    <ScrollView style={styles.container}>
      {Platform.OS === 'ios' && route.name === 'Home' && (
        <View style={{ height: 44, backgroundColor: 'black' }} />
      )}
      {isFocused && (
        <StatusBar backgroundColor="black" barStyle="light-content" />
      )}

      <StatusBar backgroundColor={'black'} barStyle="light-content" />

      <SafeAreaView>
        <View style={styles.topSection}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.locationText}>HI, ROOHULLAH</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={leaseData}
            keyExtractor={(item) => item.toString()}
            renderItem={leaseDataCallBack}
            horizontal={true}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.mainSection}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={'#888'}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vehicle..."
            placeholderTextColor="#888"
            onFocus={() => navigation.navigate('searchCarCards')}
          />
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Top Brands</Text>
          <TouchableOpacity onPress={() => navigation.navigate('brandCards')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal={true}
          data={brands.slice(0, 10)}
          keyExtractor={(item) => item.toString()}
          renderItem={brandsCallBack}
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Available For You</Text>
          <TouchableOpacity onPress={() => navigation.navigate('searchCarCards')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal={true}
          data={cars.slice(0, 10)}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => carsCallBack(item)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 30,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS.demiBold,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  leaseCard: {
    maxWidth: width * 0.95,
    backgroundColor: '#25262A',
    borderRadius: 15,
    padding: 13,
    marginTop: 20,
    marginBottom: 60,
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
    marginTop: 15,
    fontFamily: FONTS.demiBold,
  },
  extendButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  extendText: {
    fontWeight: '600',
    fontSize: 10,
  },
  mainSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    marginTop: -40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 14,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS.bold,
  },
  seeAll: {
    fontSize: 14,
    color: '#007bff',
    fontFamily: FONTS.demiBold,
  },
  brandCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#e5e5e5ff',
    borderRadius: 10,
  },
  brandImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  carCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    width: width * 0.7,
    marginBottom: 20,
  },
  carThumb: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  carImageSetup: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  carName: {
    fontSize: 13,
    marginTop: 9,
    fontFamily: FONTS.demiBold,
    color: '#575757ff',
  },
  carPrice: {
    fontSize: 13,
    color: '#333',
    marginTop: 4,
    fontFamily:FONTS.demiBold
  },
  carRating: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    fontFamily:FONTS.demiBold
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timerBlock: {
    marginHorizontal: 15,
  },
  ti: {
    color: 'white',
    fontSize: 30,
    marginTop: 8,
    fontFamily: 'BebasNeue Regular',
  },
  timerLabel: {
    fontSize: 11,
    color: '#fff',
    marginTop: 4,
    marginLeft: 5,
  },
});

export default HomeScreen;
