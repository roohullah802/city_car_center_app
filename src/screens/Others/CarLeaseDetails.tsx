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
import { FONTS } from '../../fonts/fonts';

const { width, height } = Dimensions.get('window');

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
    { label: 'Max Power', value: 44.40, type:"hp" },
    { label: '0-60 mph',  value: 295.00, type: "sec" },
    { label: 'Top Speed',  value: 880.60, type:"mph" },
  ], []);
  const [activeImage, setActiveImage] = useState<number>(0);

  const carImagesCallBack = useCallback((item: any) => {
    return (
      <View style={styles.carWrapper}>
        <Image source={item.image} style={styles.carImage} resizeMode="cover" />
      </View>
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.subContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.title}>
          <Text style={styles.titleText}> Mercedes-Benz EQC 300kW </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 4 }}>
          <View style={styles.box}>
            <View style={styles.dot}></View>
            <Text style={{ fontSize: 8, width: 60, fontFamily:FONTS.demiBold }}>Available</Text>
          </View>
          <View style={styles.secondBox}>
            <Text style={{ fontSize: 8, width: 80,fontFamily:FONTS.demiBold }}>Fully featured</Text>
          </View>
        </View>

        {/* Car Images FlatList */}
        <FlatList
          data={carImages}
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => carImagesCallBack(item)}
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setActiveImage(Number((Number(x) / width).toFixed(0)));
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 4,
            alignSelf: 'center',
            marginTop: -30,
            backgroundColor: 'white',
            paddingLeft: 11,
            paddingRight: 11,
            paddingTop: 4,
            paddingBottom: 4,
            borderRadius: 10,
          }}
        >
          {carImages.map((_, index) => {
            return (
              <View>
                <View
                  style={[
                    styles.secondDot,
                    activeImage === index ? { width: 25 } : { width: 7 },
                  ]}
                ></View>
              </View>
            );
          })}
        </View>
        <View style={styles.reviewCon}>
          <Text style={styles.review}>
            ⭐ 5.0{' '}
            {<Text style={{ color: 'gray', fontSize: 8,fontFamily:FONTS.demiBold }}>(100+ Reviews)</Text>}
          </Text>
        </View>

        <View style={styles.carInfo}>
          <Text style={{fontFamily:FONTS.demiBold}}>Car Info</Text>
          <View style={styles.carInfoDataCon}>
            <View style={{ gap: 10 }}>
              <View style={styles.carInfoData}>
                <Icon name="person" size={16} />
                <Text
                  style={{
                    fontSize: 10,
                    color:"#5e5e5eff",
                    width: '100%',
                    marginTop: -3,
                    fontFamily:FONTS.demiBold
                  }}
                >
                  2 Passengers
                </Text>
              </View>

              <View style={styles.carInfoData}>
                <Icon name="snow" size={16} />
                <Text
                  style={{
                    fontSize: 10,
                    color:"#5e5e5eff",
                    width: '100%',
                    marginTop: -3,
                    fontFamily:FONTS.demiBold
                  }}
                >
                  Air Conditioning
                </Text>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <View style={styles.carInfoData}>
                <MaterialCommunityIcons name="car-door" size={16} />
                <Text
                  style={{
                    fontSize: 10,
                    color:"#5e5e5eff",
                    width: '100%',
                    marginTop: -3,
                    fontFamily:FONTS.demiBold
                  }}
                >
                  2 Doors
                </Text>
              </View>

              <View style={styles.carInfoData}>
                <MaterialCommunityIcons name="gas-station" size={16} />
                <Text
                  style={{
                    fontSize: 10,
                    width: '100%',
                    color: "#5e5e5eff",
                    marginTop: -3,
                    fontFamily:FONTS.demiBold
                  }}
                >
                  Fuel Info
                </Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: "row", gap: 5, marginTop: 10}}>
            <MaterialCommunityIcons name="car-shift-pattern" size={16} />
            <Text style={{fontSize:10, color:"#5e5e5eff", fontFamily:FONTS.demiBold}}>Manual</Text>
          </View>
        </View>


        <View style={styles.carSpecs}>
          <Text style={{fontFamily:FONTS.demiBold}}>Car Specs</Text>
          <View style={styles.rateOptions}>
                    {rateOptions.map((option) => {
                      return (
                        <View style={styles.rateCard}>
                           <Text style={styles.rateLabel}>
                            {option.label}
                          </Text>
                          <Text style={styles.rateValue}>{option.value.toFixed(2)}{<Text style={{fontSize: 8, color: "gray", fontFamily:FONTS.demiBold}}>{option.type}</Text>}</Text>
                        </View>
                      );
                    })}
                  </View>
        </View>


        <View>
          <Text style={{fontFamily:FONTS.demiBold}}>
            Price & Lease Info:12345
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CarLeaseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height + 500,
  },
  subContainer: {
    width: width - 30,
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    zIndex: 2,
  },
  title: {
    marginTop: 50,
  },
  titleText: {
    fontSize: 15,
    fontFamily:FONTS.bold
  },
  box: {
    width: 90,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    marginTop: 5,
    paddingLeft: 10,
    marginLeft: 5,
  },
  secondBox: {
    width: 90,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    marginTop: 5,
    paddingLeft: 10,
    marginLeft: 5,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  carWrapper: {
    width: width - 38,
    height: 200,
    marginTop: 15,
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  secondDot: {
    width: 4,
    height: 6,
    backgroundColor: 'black',
    borderRadius: 20,
    alignSelf: 'center',
  },
  review: {
    fontSize: 10,
    fontFamily:FONTS.demiBold
  },
  reviewCon: {
    marginTop: 18,
  },
  carInfo: {
    marginTop: 20,
  },
  carInfoDataCon: {
    flexDirection: 'row',
    gap: 20,
    width: 100,
    marginTop: 20,
  },
  carInfoData: {
    flexDirection: 'row',
    gap: 5,
  },
  carSpecs:{
    marginTop: 20
  },
   rateOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 20
  },
   rateCard: {
    width: (width - 60) / 3,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
    rateLabel: {
    width:"100%",
    fontSize: 8,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 8,
  },
    rateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily:FONTS.demiBold
  },
});
