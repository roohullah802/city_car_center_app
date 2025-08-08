import React from 'react';
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
import { useRoute } from '@react-navigation/native';

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
const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const route = useRoute();
  console.log(route.name);
  
  return (
    <ScrollView style={styles.container}>
      {Platform.OS === 'ios' && route.name === 'Home' && (
        <View style={{ height: 44, backgroundColor: 'black' }} />
      )}
      <StatusBar
        backgroundColor={route.name === 'Home' ? 'black' : 'white'}
        barStyle={route.name === 'Home' ? 'light-content' : 'dark-content'}
      />

      <StatusBar backgroundColor={'black'} barStyle="light-content" />
      {/*  Top Black Header */}
      <SafeAreaView>
        <View style={styles.topSection}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.locationText}>HI, ROOHULLAH</Text>
            </View>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
              style={styles.avatar}
            />
          </View>

          <FlatList
            data={leaseData}
            keyExtractor={item => item.toString()}
            renderItem={() => (
              <View style={styles.leaseCard}>
                <View style={styles.view}>
                  <Text style={styles.leaseTitle}>My Lease</Text>
                  <TouchableOpacity style={styles.extendButton}>
                    <Text style={styles.extendText}>Extend Lease</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.leaseModel}>
                  Porsche 2019 - 911 Carrera S
                </Text>
                {/* <Text style={styles.timer}>my timer</Text> */}
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
            horizontal={true}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>
      </SafeAreaView>

      {/*  White Main Content */}
      <SafeAreaView>
        <View style={styles.mainSection}>
          {/*  Search Bar */}

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
            />
          </View>

          {/* 🚘 Top Brands */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Top Brands</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal={true}
            data={brands.slice(0, 10)}
            keyExtractor={item => item.toString()}
            renderItem={() => (
              <View style={styles.brandCard}>
                <Image
                  style={styles.brandImage}
                  source={require('../../assests/bmwlogo.jpeg')}
                />
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
            showsHorizontalScrollIndicator={false}
          />

          {/* 🚗 Available Near You */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Available For You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={true}
            data={cars.slice(0, 10)}
            keyExtractor={item => item.name.toString()}
            renderItem={({ item }) => (
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
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

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
    paddingTop: 30,
    paddingBottom: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationLabel: {
    color: '#888',
    fontSize: 12,
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 3,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  leaseCard: {
    width: width - 40,
    backgroundColor: '#25262A',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    marginBottom: 40,
  },
  leaseTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  leaseModel: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 20,
  },
  timer: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'digital-7 (italic)',
  },
  carImage: {
    width: '100%',
    marginTop: 10,
    resizeMode: 'contain',
  },
  extendButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  extendText: {
    fontWeight: '600',
    fontSize: 12,
  },
  mainSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#000',
    position: 'relative',
    bottom: 40,
    boxShadow: '0px 0px 5px 0.5px #ccc',
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
  },
  seeAll: {
    width: 80,
    fontSize: 14,
    color: '#007bff',
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
    resizeMode: 'cover',
  },
  carCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    width: 250,
    marginBottom: 20,
  },
  carThumb: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  carImageSetup: {
    width: '100%',
    height: 140,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  carName: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 10,
  },
  carPrice: {
    width: 80,
    fontSize: 13,
    color: '#333',
    marginTop: 4,
  },
  carRating: {
    width: 80,
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    boxShadow: '0px 1px 5px 0px #ccc',
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 13,
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
    fontSize: 35,
    marginTop: 10,
    fontFamily: 'digital-7 (italic)',
  },
  timerLabel: {
    fontSize: 13,
    color: '#fff',
    marginTop: 4,
    marginLeft: 5,
  },
});
