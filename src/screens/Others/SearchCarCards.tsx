import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheetFilterModal from './BottomSheetFilterModel';
import { Modalize } from 'react-native-modalize';

const { width } = Dimensions.get('window');

interface Car {
  id: string;
  name: string;
  price: number;
  image: any;
  rating: number;
  reviews: string;
}

const carData: Car[] = [
  {
    id: '1',
    name: 'Mercedes Car EQC 300kW',
    price: 300,
    image: require('../../assests/car1.jpg'),
    rating: 5,
    reviews: '100+ r',
  },
  {
    id: '2',
    name: 'Red Mazda 6 - Elite Estate',
    price: 300,
    image: require('../../assests/car2.jpg'),
    rating: 5,
    reviews: '100+ r',
  },
];

const SearchCarCards = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');
  const ref = useRef<Modalize>(null);
  const onApply = () => {
    ref.current?.open();
  };

  const openFilterModal = ()=>{
    ref.current?.open();
  }

  const filteredCars = carData.filter(car =>
    car.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderCarCard = ({ item }: { item: Car }) => (
    <View style={styles.card}>
    <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.bottomRow}>
          <View style={styles.rating}>
            <Icon name="star" size={16} color="#fbbf24" />
            <Text style={styles.ratingText}>
              {item.rating.toFixed(1)} ({item.reviews})
            </Text>
          </View>
          <Text style={styles.price}>${item.price}/day</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Available Cars</Text>

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#999" />
        <TextInput
          placeholder="Search cars..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={openFilterModal}>
          <Icon name="options-outline" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {carData.length > 0 ? (
        <FlatList
          data={filteredCars}
          keyExtractor={item => item.id}
          renderItem={renderCarCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View style={styles.noData}>
          <Icon name="car-sport" size={30} color="#000" />
          <Text style={{ width: 150 }}>No Results Found</Text>
          <Text style={{ fontSize: 12, color: 'gray', width: 300 }}>
            `We currently have no Search Results for “{searchText}”. Please try
            with different search text`
          </Text>
        </View>
      )}
      <BottomSheetFilterModal ref={ref} onApply={onApply}  />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 10,
    marginBottom: 5,
    width: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 10,
    color: '#111',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: width * 0.4,
    borderRadius: 10,
  },
  details: {
    marginTop: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    width: 140,
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchCarCards;
