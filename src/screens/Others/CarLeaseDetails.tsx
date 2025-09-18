import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { BounceIn } from 'react-native-reanimated';
import { useGetCarDetailsQuery } from '../../redux.toolkit/rtk/apis';
import { FONTS } from '../../fonts/fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux.toolkit/store';
import { addFavCar, removeFavCar } from '../../redux.toolkit/slices/userSlice';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT_RATIO = 0.38; // 38% of screen height

const CarDetails: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { _id } = route.params;
  const { data: Cars, isLoading } = useGetCarDetailsQuery(_id);
  const car = Cars?.data;

  const favouriteCars = useSelector((state: RootState) => state.user.favouriteCars);
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const HEADER_HEIGHT = height * HEADER_HEIGHT_RATIO;

  // Parse images safely
  const images = useMemo(() => {
    if (!car?.images) return [];
    if (Array.isArray(car.images)) return car.images;
    if (typeof car.images === 'string') {
      try {
        const parsed = JSON.parse(car.images);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }, [car?.images]);

  // Memoized favorite state
  const isFav = useMemo(
    () => favouriteCars?.some(items => items._id === car?._id),
    [favouriteCars, car?._id]
  );

  // Handle favorite toggle
  const handleFav = useCallback(
    (item: any) => {
      const isFavCar = favouriteCars?.some(items => items._id === item?._id);
      if (isFavCar) {
        dispatch(removeFavCar(item._id));
      } else {
        dispatch(addFavCar(item));
      }
    },
    [favouriteCars, dispatch]
  );

  // Viewable item callback for dots
  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index);
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // Render car image
  const renderImage = useCallback(
    ({ item }: { item: string }) => (
      <ImageBackground
        source={{ uri: item }}
        style={[styles.carImage, { height: HEADER_HEIGHT }]}
        resizeMode="cover"
      />
    ),
    [HEADER_HEIGHT]
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Icon name="car-sport-outline" size={40} color="#73C2FB" />
        <Text style={styles.loadingText}>Fetching Car Details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header with Image Slider */}
      <View style={[styles.header, { height: HEADER_HEIGHT }]}>
        {images.length > 0 ? (
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderImage}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            ref={flatListRef}
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Icon name="image-outline" size={40} color="#ccc" />
            <Text style={styles.noImageText}>No images available</Text>
          </View>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <View style={[styles.dotsContainer, { bottom: 40 }]}>
            {images.map((_: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: index === activeIndex ? 1 : 0.3,
                    transform: [{ scale: index === activeIndex ? 1.2 : 1 }],
                  },
                ]}
              />
            ))}
          </View>
        )}

        {/* Overlay Header Icons */}
        <SafeAreaView style={styles.overlayHeader}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
          >
            <Icon name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => handleFav(car)}
            accessibilityLabel="Toggle favorite"
          >
            <Animated.View entering={BounceIn}>
              <Icon name={isFav ? 'heart' : 'heart-outline'} size={22} color="#fff" />
            </Animated.View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* Scrollable Details Section */}
      <ScrollView
        style={styles.detailsSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Title & Rating */}
        <View style={styles.titleRow}>
          <Text style={styles.carTitle} numberOfLines={1}>
            {car?.modelName || 'N/A'}
          </Text>
          <View style={styles.ratingRow}>
            <Icon name="star" size={15} color="#f5a623" />
            <Text style={styles.rating}>({car?.totalReviews || 0})</Text>
          </View>
        </View>

        {/* Car Info */}
        <Text style={styles.sectionTitle}>Car Info:</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Brand:</Text>
          <Text style={styles.priceValue}>{car?.brand || 'N/A'}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Car:</Text>
          <Text style={styles.priceValue}>{car?.modelName || 'N/A'}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Price/Day:</Text>
          <Text style={styles.priceValue}>${car?.pricePerDay || 0}</Text>
        </View>
        <View style={styles.line} />

        {/* Features */}
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresRow}>
          <View style={styles.featureCard}>
            <View style={styles.featureIconWrapper}>
              <MaterialIcon name="chair-rolling" size={25} color="#1F305E" />
            </View>
            <Text style={styles.featureLabel}>Seats</Text>
            <Text style={styles.featureValue}>{car?.passengers || 0}</Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIconWrapper}>
              <MaterialIcon name="speedometer" size={25} color="#1F305E" />
            </View>
            <Text style={styles.featureLabel}>Top Speed</Text>
            <Text style={styles.featureValue}>{car?.topSpeed || 'N/A'} km/h</Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIconWrapper}>
              <MaterialIcon name="car-shift-pattern" size={25} color="#1F305E" />
            </View>
            <Text style={styles.featureLabel}>Transmission</Text>
            <Text style={styles.featureValue}>{car?.transmission || 'N/A'}</Text>
          </View>
        </View>

        {/* Price + Buy Button */}
        <Text style={styles.priceText}>Price:</Text>
        <View style={styles.footerRow}>
          <Text style={styles.price}>${car?.pricePerDay || 0}/day</Text>
          <TouchableOpacity
            style={styles.buyBtn}
            onPress={() => navigation.navigate('dateAndTime', { carId: car?._id })}
            accessibilityLabel="Book this car"
          >
            <Text style={styles.buyText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CarDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#666', fontFamily: FONTS.demiBold, marginTop: 10 },

  header: { width: '100%', backgroundColor: 'green', overflow: 'hidden' },
  carImage: { width, objectFit: 'cover' },
  noImageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noImageText: { marginTop: 10, fontSize: 14, color: '#aaa', fontFamily: FONTS.demiBold },

  overlayHeader: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBtn: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 20 },

  detailsSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },

  titleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  carTitle: { fontSize: 22, fontWeight: '700', color: '#1F305E', fontFamily: FONTS.bold },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  rating: { marginLeft: 5, fontSize: 14, color: '#1F305E', fontFamily: FONTS.demiBold },

  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: RFValue(12),
    marginTop: RFValue(10),
    marginBottom: RFValue(10),
    color: '#1F305E',
  },

  featuresRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureCard: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 15,
    margin: 5,
    backgroundColor: '#eef5ff',
    gap: 5,
    borderRadius: 10,
  },
  featureIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#FEFEFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureValue: { fontSize: 13, fontWeight: '600', color: '#1F305E', fontFamily: FONTS.bold },
  featureLabel: { fontSize: 10, color: '#666', marginTop: 3, fontFamily: FONTS.demiBold },

  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: RFValue(10) },
  priceLabel: { fontSize: RFValue(10), fontFamily: FONTS.demiBold, color: '#1F305E' },
  priceValue: { fontSize: RFValue(10), fontFamily: FONTS.demiBold, color: '#1F305E' },
  priceText: { color: '#1F305E', marginTop: 15, fontSize: 10, fontFamily: FONTS.demiBold },

  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: -10 },
  price: { fontSize: 13, fontWeight: '700', color: '#1F305E', fontFamily: FONTS.bold },
  buyBtn: { backgroundColor: '#73C2FB', paddingVertical: 12, paddingHorizontal: 80, borderRadius: 30 },
  buyText: { color: '#fff', fontSize: 12, fontWeight: '600', fontFamily: FONTS.demiBold },

  dotsContainer: { position: 'absolute', bottom: 20, alignSelf: 'center', flexDirection: 'row' },
  dot: { width: 13, height: 3, borderRadius: 2, backgroundColor: '#fff', margin: 2 },

  line: { borderBottomWidth: 0.5, borderBottomColor: '#ccc', marginVertical: RFValue(8) },
});
