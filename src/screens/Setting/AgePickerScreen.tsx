import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../fonts/fonts';



const { width } = Dimensions.get('window');
const ITEM_WIDTH = 220;

const SinglePageProfile: React.FC<{navigation: any}> = ({navigation}) => {
  const [selectedAge, setSelectedAge] = useState<number>(21);
  const ages = Array.from({ length: 100 }, (_, i) => i + 1);
  const listRef = useRef<FlatList>(null);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const adjustOffset = offsetX + width * 0.15
    const index = Math.round(adjustOffset / ITEM_WIDTH);
    console.log(selectedAge+1);
    
    const age = ages[index];
    setSelectedAge(age);
  };

  const renderItem = ({ item }: { item: number }) => {
    const isSelected = item === selectedAge;
    return (
      <View style={styles.ageItemContainer}>
        <Text style={[styles.ageText, isSelected && styles.selectedAgeText]}>
          {item}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      {/* Age Picker */}
        <TouchableOpacity
                   style={styles.backButton}
                   onPress={() => navigation.goBack()}
                 >
                   <Icon name="chevron-back" size={24} color="#000" />
                 </TouchableOpacity>
      <Text style={styles.questionText}>What is your Age?</Text>
      <FlatList
        ref={listRef}
        data={ages}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        horizontal
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        contentContainerStyle={styles.listContent}
        style={styles.ageList}
      />

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => console.log("Selected Age:", selectedAge)}
      >
        <Text style={styles.saveText}>Save change</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    backgroundColor: '#fff',
    marginTop:200
  },
 
  value: {
    fontSize: 18,
    color: '#000',
    marginBottom: 12,
  },
  questionText: {
    fontSize: width * 0.06,
    textAlign: 'center',
    marginVertical: 16,
    fontFamily:FONTS.bold
  },
  listContent: {
    paddingHorizontal: width * 0.15,
  },
  ageItemContainer: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageText: {
    width:90,
    fontSize: 24,
    color: '#aaa',
  },
  selectedAgeText: {
    width: 100,
    fontSize: 32,
    color: '#fff',
    backgroundColor: '#0A56D4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  ageList: {
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily:FONTS.demiBold
  },
   backButton: {
      marginBottom:70,
      position: 'relative',
      top: Platform.OS === 'ios' ? 50 : 20,
      zIndex: 2,
    },
});

export default SinglePageProfile;
