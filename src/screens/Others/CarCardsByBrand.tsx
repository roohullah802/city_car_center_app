import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../fonts/fonts';
import { useGetCarsQuery } from '../../redux.toolkit/rtk/apis';
const { width } = Dimensions.get('window');

interface ImageObject {
  url: string;
  public_id: string;
}

interface Car {
  modelName: string;
  price: number;
  pricePerDay: number;
  images: ImageObject[];
  brandImage: ImageObject;
  totalReviews: number;
  _id: string;
}

const CarCardsByBrand: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const { brand } = route.params;

  const { data: Cars, isLoading} = useGetCarsQuery([]);

  const filteredCars = useMemo(() => {
    if(!Cars?.data) return [];
    return Cars?.data
      .filter((item: any) =>
        item.modelName.toLowerCase().includes(searchText?.toLowerCase()),
      )
      .filter((item: any) =>
        item.brand.toLowerCase().includes(brand.toLowerCase()),
      );
  }, [Cars?.data, searchText, brand]);

  const renderCarCard = useCallback(
    ({ item }: { item: Car }) => {
      return (
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.9 : 1,
            },
          ]}
          onPress={() => navigation.navigate('carDetails', { _id: item._id })}
        >
          <View style={styles.card}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

            <Image
              source={{ uri: item?.images[0] as unknown as string }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.details}>
              <Text style={styles.name}>{item.modelName}</Text>
              <View style={styles.bottomRow}>
                <View style={styles.rating}>
                  <Icon name="star" size={16} color="#fbbf24" />
                  <Text style={styles.ratingText}>({item.totalReviews})</Text>
                </View>
                <Text style={styles.price}>${item.pricePerDay}/day</Text>
              </View>
            </View>
          </View>
        </Pressable>
      );
    },
    [navigation],
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.message}>Loading city car centers...</Text>
      </View>
    );
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        </View>

        {!Cars?.data || Cars?.data.length <= 0 ? (
          <View style={styles.noData}>
            <Icon name="car-sport" size={30} color="#000" />
            <Text style={{ fontFamily:FONTS.demiBold }}>No Cars Found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredCars}
            keyExtractor={item => item._id.toString()}
            renderItem={item => renderCarCard(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    fontFamily: FONTS.bold,
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
    fontFamily: FONTS.demiBold,
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
    height: width * 0.5,
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
    fontFamily: FONTS.demiBold,
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
    fontFamily: FONTS.demiBold,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    fontFamily: FONTS.demiBold,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: FONTS.demiBold,
    marginTop: 40,
  },

  indicator: {
    marginTop: 350,
  },
  containerError: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 12,
    color: '#111',
    fontFamily: FONTS.bold,
  },
  listContainer: {
    paddingBottom: 20,
  },
  cardError: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  infoContainer: {
    padding: 12,
  },
  titleError: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    fontFamily: FONTS.demiBold,
  },
  location: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    fontFamily: FONTS.medium,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingTextError: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
    fontFamily: FONTS.demiBold,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: 'red',
    fontFamily: FONTS.bold,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    fontFamily: FONTS.medium,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.demiBold,
  },
});

export default CarCardsByBrand;
