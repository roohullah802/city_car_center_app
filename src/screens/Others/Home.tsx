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
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { FONTS } from '../../fonts/fonts';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux.toolkit/store';
import {
  useGetBrandsQuery,
  useGetCarsQuery,
} from '../../redux.toolkit/rtk/apis';
import { useGetAllLeasesQuery } from '../../redux.toolkit/rtk/leaseApis';
import { useCountdowns } from '../../timer/leaseTimer';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const route = useRoute();
  const isFocused = useIsFocused();

  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const user = useSelector((state: RootState) => state.user);

  const { data: Cars, isLoading: isLoadingCars, isError: isErrorCars } = useGetCarsQuery([]);
  const { data: Brands, isLoading: isLoadingBrands, isError: isErrorBrands } = useGetBrandsQuery([]);

  const { data: Leases, isError } = useGetAllLeasesQuery(null);
  const LeaseWithTimer = useCountdowns(Leases?.lease);

  const leaseDataCallBack = useCallback(
    ({ item }: any) => {
      console.log(item);

      return (
        <Pressable
          onPress={() => {
            if (!isLoggedIn) {
              navigation.navigate('Login');
              return;
            }
            navigation.navigate('leaseDetails');
          }}
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
        >
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
            <Text style={styles.leaseModel}>
              {item?.carDetails[0]?.modelName}
            </Text>
            {/* <Text style={styles.timer}>my timer</Text> */}
            {item.countdown && (
              <View style={styles.timerContainer}>
                {[
                  { value: item?.countdown?.days, label: 'days' },
                  { value: item?.countdown?.hours, label: 'Hr' },
                  { value: item?.countdown?.minutes, label: 'Min' },
                  { value: item?.countdown?.seconds, label: 'Sec' },
                ].map((item, index) => (
                  <View key={index} style={styles.timerBlock}>
                    <Text style={styles.ti}>{item.value}</Text>
                    <Text style={styles.timerLabel}>{item.label}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </Pressable>
      );
    },
    [navigation, isLoggedIn],
  );

  const brandsCallBack = useCallback(
    ({ item }: any) => {
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('carCardsByBrand', { brand: item.brand })
          }
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
        >
          <View style={styles.brandCard}>
            <Image
              style={styles.brandImage}
              source={{ uri: item?.brandImage?.url }}
            />
          </View>
        </Pressable>
      );
    },
    [navigation],
  );

  const carsCallBack = useCallback(
    (item: any) => {
      return (
        <Pressable
          onPress={() => navigation.navigate('carDetails', { _id: item?._id })}
          style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
        >
          <View style={styles.carCard}>
            <View style={styles.carImageSetup}>
              <Image
                source={{ uri: item?.images?.[0]?.url }}
                style={styles.carThumb}
              />
            </View>
            <Text style={styles.carName}>
              {item?.modelName?.charAt(0).toLocaleUpperCase() +
                item?.modelName?.slice(1)}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.carRating}>
                ⭐ {item?.reviews_data.length}
              </Text>
              <Text style={styles.carPrice}>{item?.price}/day</Text>
            </View>
          </View>
        </Pressable>
      );
    },
    [navigation],
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
              <Text style={styles.locationText}>
                {isLoggedIn && user?.userData?.name
                  ? `HI, ${user?.userData?.name.toLocaleUpperCase()}`
                  : 'Welcome to City Car Center'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (!isLoggedIn) {
                  navigation.navigate('Login');
                  return;
                }
                navigation.navigate('Profile');
              }}
            >
              {user?.profile ? (
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                  style={styles.avatar}
                />
              ) : user?.userData?.name ? (
                <Text style={styles.charAt}>
                  {user?.userData?.name.charAt(0).toLocaleUpperCase()}
                </Text>
              ) : (
                ''
              )}
            </TouchableOpacity>
          </View>

          {LeaseWithTimer === undefined || LeaseWithTimer?.length === 0 || isError ? (
            <View style={styles.leaseCard}>
              <View style={styles.view}>
                <Text style={styles.leaseTitle}>My Lease</Text>
                <TouchableOpacity
                  disabled
                  style={styles.extendButton}
                  onPress={() => navigation.navigate('extendLease')}
                >
                  <Text style={styles.extendText}>Extend Lease</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.leaseModel}>No active lease</Text>
            </View>
          ) : (
            <FlatList
              data={LeaseWithTimer}
              keyExtractor={item => item?._id.toString()}
              renderItem={leaseDataCallBack}
              horizontal={true}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            />
          )}
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

        {isLoadingBrands ? (
          <View style={styles.centered}>
            <ActivityIndicator
              style={styles.indicator}
              size="large"
              color="#000"
            />
          </View>
        ) : !Brands?.brands || Brands.brands.length === 0 || isErrorBrands ? (
          <View style={styles.centered}>
            <Text style={{ margin: 20, fontFamily: FONTS.medium }}>
              No brands available
            </Text>
          </View>
        ) : (
          <FlatList
            horizontal
            data={Brands.brands}
            keyExtractor={item => item.brand.toString()}
            renderItem={brandsCallBack}
            ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        )}

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Available For You</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('searchCarCards')}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {isLoadingCars ? (
          <View style={styles.centered}>
            <ActivityIndicator
              style={styles.indicator}
              size="large"
              color="#000"
            />
          </View>
        ) : !Cars?.data || Cars?.data?.length === 0 || isErrorCars ? (
          <View style={styles.centered}>
            <Text style={{ fontFamily: FONTS.medium, margin: 20 }}>
              No cars available
            </Text>
          </View>
        ) : (
          <FlatList
            horizontal
            data={Cars?.data?.slice(0, 10)}
            keyExtractor={item => item._id.toString()}
            renderItem={({ item }) => carsCallBack(item)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        )}
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
    paddingVertical: 5,
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
    fontSize: 14,
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
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#e5e5e5ff',
    borderRadius: 10,
  },
  brandImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 10,
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
    fontFamily: FONTS.demiBold,
  },
  carRating: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    fontFamily: FONTS.demiBold,
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
    marginHorizontal: 20,
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
    fontFamily: FONTS.demiBold,
  },
  charAt: {
    color: '#fff',
    width: 40,
    height: 40,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 50,
    textAlign: 'center',
  },
  indicator: {
    marginTop: 30,
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
  message: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    fontFamily: FONTS.medium,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: 'red',
    fontFamily: FONTS.bold,
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

export default HomeScreen;
