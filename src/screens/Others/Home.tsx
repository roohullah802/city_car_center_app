import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../fonts/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux.toolkit/store';
import {
  useGetBrandsQuery,
  useGetCarsQuery,
} from '../../redux.toolkit/rtk/apis';
import { useGetCurrentLocation } from '../../folder/getAddress';
import { addFavCar, removeFavCar } from '../../redux.toolkit/slices/userSlice';
import io from 'socket.io-client';
import { Modalize } from 'react-native-modalize';

const socket = io('https://api.citycarcenters.com');
const { width } = Dimensions.get('window');

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const capitalize = (str: string) => str.split(' ').map((itm)=> itm.charAt(0).toUpperCase() + itm.slice(1)).join(' ')
  const [location, setLocation] = useState<string>('N/A');
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [carListData, setCarListData] = useState<any[]>([]);
  const [brandsListData, setBrandListData] = useState<any[]>([]);

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const modalRef = useRef<Modalize>(null);

  const { isLoggedIn, isGuest, userData } = useSelector(
    (state: RootState) => state.user
  );

  const {
    data: Cars,
    isLoading,
    isError,
    refetch: refetchCars,
  } = useGetCarsQuery({});

  const {
    data: Brands,
    isLoading: isLoadingBrands,
    isError: isErrorBrands,
    refetch: refetchBrands,
  } = useGetBrandsQuery({});

  const favouriteCars = useSelector(
    (state: RootState) => state.user.favouriteCars
  );
  const loc = useGetCurrentLocation();

  const carList = useMemo(() => Cars?.data || [], [Cars?.data]);
  const brandList = useMemo(() => Brands?.brands || [], [Brands?.brands]);

  useEffect(() => {
    setCarListData(carList);
  }, [carList]);

  useEffect(() => {
    setBrandListData(brandList);
  }, [brandList]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket is connected', socket.id);
    });

    socket.on('carAdded', car => {
      setCarListData(prev => {
        if (!Array.isArray(carList)) return carList;
        return [car, ...prev];
      });
    });

    socket.on('brandAdded', brand => {
      setBrandListData(brand);
    });

    return () => {
      socket.off('carAdded');
      socket.off('brandAdded');
    };
  }, [carList, brandList]);

  useEffect(() => {
    setLocationLoading(true);
    try {
      if (loc) setLocation(loc);
      else setLocation('N/A');
    } catch (err) {
      console.error('Location fetch failed', err);
      setLocation('N/A');
    } finally {
      setLocationLoading(false);
    }
  }, [loc]);

  const handleFav = useCallback(
    (item: any) => {
      const isFav = favouriteCars?.some(items => items._id === item?._id);
      if (isFav) {
        dispatch(removeFavCar(item._id));
      } else {
        dispatch(addFavCar(item));
      }
    },
    [favouriteCars, dispatch]
  );

  const renderBrand = useCallback(
    ({ item }: any) => (
      <Pressable
        onPress={() =>
          navigation.navigate('carCardsByBrand', { brand: item.brand })
        }
      >
        <View style={styles.brandIconContainer}>
          <Image
            source={{ uri: item?.brandImage?.[0] }}
            style={styles.brandIcon}
            resizeMode="contain"
          />
        </View>
      </Pressable>
    ),
    [navigation]
  );

  const renderCar = useCallback(
    ({ item }: any) => {
      const isFav = favouriteCars?.some(items => items._id === item?._id);

      return (
        <Pressable
          onPress={() => navigation.navigate('carDetails', { _id: item._id })}
        >
          <View style={styles.carCard}>
            <Image
              source={{ uri: item?.images?.[0] }}
              style={styles.carImage}
              resizeMode="cover"
            />
            <Text style={styles.carName}>{capitalize(item.modelName)}</Text>
            <View style={styles.carFooter}>
              <Text style={styles.carPrice}>${item.pricePerDay}/day</Text>
              <TouchableOpacity
                style={styles.leaseButton}
                onPress={() => {
                  if (!isLoggedIn) {
                    navigation.navigate('socialAuth');
                  } else {
                    navigation.navigate('dateAndTime', { carId: item?._id });
                  }
                }}
              >
                <Text style={styles.leaseButtonText}>Rent Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.favoriteIcon}>
              <TouchableOpacity onPress={() => handleFav(item)}>
                <Icon
                  name={isFav ? 'heart' : 'heart-outline'}
                  color="#73C2FB"
                  size={26}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      );
    },
    [navigation, handleFav, favouriteCars, isLoggedIn]
  );

  const renderEmptyList = (type: 'brands' | 'cars') => {
    if (isLoading || isLoadingBrands) {
      return <Text style={styles.loadingText}>Loading {type}...</Text>;
    }
    if (isError || isErrorBrands) {
      return <Text style={styles.errorText}>Failed to load {type}.</Text>;
    }
    return null;
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchCars(), refetchBrands()]);
    } finally {
      setRefreshing(false);
    }
  }, [refetchCars, refetchBrands]);

  useEffect(() => {
    if (isLoggedIn || isGuest) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('socialAuth');
    }
  }, [isLoggedIn, isGuest, navigation]);

  const openProfileModal = () => {
    modalRef.current?.open();
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 30 },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          {isLoggedIn ? (
            <View>
              <Text style={styles.locationLabel}>Location</Text>
              <Text style={styles.locationValue} numberOfLines={1}>
                {locationLoading ? location : location}
              </Text>
            </View>
          ) : (
            <Text style={styles.guest}>Guest</Text>
          )}

          <TouchableOpacity onPress={openProfileModal}>
            <Image
              source={
                userData?.profile
                  ? { uri: userData.profile }
                  : require('../../assests/guest.jpg')
              }
              style={[styles.profileImage, isGuest ? {width:60, height:60} : '']}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>
          Find your ideal ride in just a few clicks{'\n'}
          <Text style={styles.boldText}>quick, easy, and reliable</Text>
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('searchCarCards')}
          activeOpacity={0.5}
          style={styles.searchBarContainer}
        >
          <Text style={[styles.searchInput, { color: '#E5E4E2' }]}>Search</Text>
          <Icon name="search" size={18} color="#999" style={styles.searchIcon} />
        </TouchableOpacity>

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Brands</Text>
            <TouchableOpacity onPress={() => navigation.navigate('brandCards')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={brandsListData}
            renderItem={renderBrand}
            keyExtractor={item => item?.brand}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ListEmptyComponent={() => renderEmptyList('brands')}
          />
        </View>

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Near You</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('searchCarCards')}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={carListData}
            renderItem={renderCar}
            keyExtractor={item => item?._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ListEmptyComponent={() => renderEmptyList('cars')}
          />
        </View>
      </ScrollView>

      {/* MODALIZE: Profile Modal */}
      <Modalize
        ref={modalRef}
        adjustToContentHeight
        handleStyle={{ backgroundColor: '#73C2FB' }}
        modalStyle={{ padding: 30 }}

      >
        <View style={styles.modalContent}>
          <Image
            source={
              userData?.profile
                ? { uri: userData.profile }
                : require('../../assests/guest.jpg')
            }
            style={styles.modalProfileImage}
          />
          <Text style={styles.modalName}>{userData?.name || 'No Name'}</Text>
          <Text style={styles.modalEmail}>{userData?.email || 'No Email'}</Text>
        </View>
      </Modalize>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 11,
    color: '#1F305E',
    fontFamily: FONTS.bold,
  },
  locationValue: {
    fontSize: 10,
    fontWeight: '600',
    color: 'gray',
    fontFamily: FONTS.demiBold,
    width: 230,
  },
  guest: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: '#1F305E',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 14,
    marginTop: 16,
    color: '#1F305E',
    fontFamily: FONTS.bold,
  },
  boldText: {
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 20,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderColor: '#C0C0C0',
    padding: 3,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
    position: 'relative',
    top: 5,
  },
  searchIcon: {
    marginLeft: 10,
    fontSize: 25,
    color: '#E5E4E2',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: '#1F305E',
  },
  seeAll: {
    fontSize: 12,
    color: '#73C2FB',
    fontFamily: FONTS.demiBold,
  },
  brandIconContainer: {
    width: 65,
    height: 70,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 10,
  },
  brandIcon: {
    width: 45,
    height: 45,
  },
  carCard: {
    width: width * 0.62,
    marginRight: 16,
    backgroundColor: '#eef5ff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 55,
    paddingBottom: 10,
  },
  carImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  carName: {
    fontSize: 15,
    marginTop: 10,
    fontFamily: FONTS.bold,
    color: '#1F305E',
    marginLeft: 10,
    marginBottom: 20,
  },
  carFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  carPrice: {
    fontSize: 11,
    color: '#1F305E',
    fontFamily: FONTS.demiBold,
  },
  leaseButton: {
    backgroundColor: '#73C2FB',
    paddingHorizontal: 20,
    paddingVertical: 17,
    borderRadius: 8,
  },
  leaseButtonText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '600',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  loadingText: {
    fontFamily: FONTS.demiBold,
    color: '#999',
    paddingLeft: 16,
  },
  errorText: {
    color: 'red',
    fontFamily: FONTS.demiBold,
    paddingLeft: 16,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  modalContent: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom:100
  },
  modalProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: '#1F305E',
    marginBottom: 5,
  },
  modalEmail: {
    fontSize: 14,
    color: 'gray',
    fontFamily: FONTS.demiBold,
  },
});
