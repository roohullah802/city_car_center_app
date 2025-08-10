import React, { forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import Slider from '@react-native-community/slider';


interface FilterModalProps {
  onApply: () => void;
}

const brands = ['Mazda', 'Dodge', 'Ferrari', 'Nissan'];

const BottomSheetFilterModal = forwardRef<Modalize, FilterModalProps>(
  ({ onApply }, ref) => {
    const [selectedBrand, setSelectedBrand] = React.useState<string | null>('Mazda');
    const [priceRange, setPriceRange] = React.useState<[number, number]>([1, 500]);
    const [location, setLocation] = React.useState<number>(30);

    const clearFilter = ()=>{
        setSelectedBrand("Mazda");
        setPriceRange([1,50]);
    }

    return (
      <Modalize
        ref={ref}
        adjustToContentHeight
        handlePosition="inside"
        modalStyle={styles.modal}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <ScrollView style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={()=> clearFilter()}>
              <Text style={styles.clearText}>Clear filter</Text>
            </TouchableOpacity>
          </View>

          {/* Brand */}
          <Text style={styles.label}>Brand</Text>
          <View style={styles.brandContainer}>
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand}
                style={[
                  styles.brandButton,
                  selectedBrand === brand && styles.brandButtonSelected,
                ]}
                onPress={() => setSelectedBrand(brand)}
              >
                <Text
                  style={[
                    styles.brandText,
                    selectedBrand === brand && styles.brandTextSelected,
                  ]}
                >
                  {brand}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Range */}
          <Text style={styles.label}>Price Range</Text>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderValue}>${priceRange[0]}</Text>
            <Text style={styles.sliderValue}>${priceRange[1]}</Text>
          </View>
          <Slider
            style={{ width: '100%' }}
            minimumValue={1}
            maximumValue={1000}
            step={1}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#ccc"
            value={priceRange[1]}
            onValueChange={(value) => setPriceRange([1, value])}
          />

          {/* Location */}
          <Text style={[styles.label, { marginTop: 20 }]}>Location</Text>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderValue}>1km</Text>
            <Text style={styles.sliderValue}>100km</Text>
          </View>
          <Slider
            style={{ width: '100%' }}
            minimumValue={1}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#ccc"
            value={location}
            onValueChange={setLocation}
          />
          <Text style={styles.sliderCenterLabel}>{location}km</Text>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton} onPress={onApply}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modalize>
    );
  }
);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  clearText: {
    width: 100,
    color: '#007AFF',
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  brandButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  brandButtonSelected: {
    backgroundColor: '#000',
  },
  brandText: {
    fontSize: 14,
    color: '#333',
  },
  brandTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  sliderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sliderValue: {
    fontSize: 12,
    color: '#555',
  },
  sliderCenterLabel: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
    color: 'gray',
  },
  searchButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 30,
    marginTop: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default BottomSheetFilterModal;
