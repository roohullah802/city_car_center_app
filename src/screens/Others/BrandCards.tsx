import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ImageSourcePropType,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import BrandCard from '../../components/BrandCard';
import Icon from 'react-native-vector-icons/Ionicons';


const brandData: { name: string; image: ImageSourcePropType }[] = [
  { name: 'BMW', image: require('../../assests/bmwlogo.jpeg') },
  { name: 'Tesla', image: require('../../assests/bmwlogo.jpeg') },
  { name: 'Ford', image: require('../../assests/bmwlogo.jpeg') },
  { name: 'Mazda', image: require('../../assests/bmwlogo.jpeg') },
  { name: 'Toyota', image: require('../../assests/bmwlogo.jpeg') },
  { name: 'Subaru', image: require('../../assests/bmwlogo.jpeg') },
  { name: 'Audi', image: require('../../assests/bmwlogo.jpeg') },
  { name: 'Jeep', image: require('../../assests/bmwlogo.jpeg')  },
  { name: 'Porsche', image: require('../../assests/bmwlogo.jpeg') },
  { name: 'Ferrari', image: require('../../assests/bmwlogo.jpeg') },
  { name: 'Lamborghini', image:require('../../assests/bmwlogo.jpeg') },
  { name: 'Nissan', image: require('../../assests/bmwlogo.jpeg') },
  { name: 'Bugatti', image:require('../../assests/bmwlogo.jpeg')  },
  { name: 'Kia', image:require('../../assests/bmwlogo.jpeg') },
  { name: 'Mercedes', image: require('../../assests/bmwlogo.jpeg') },
  { name: 'Volkswagen', image: require('../../assests/bmwlogo.jpeg') },
];

const TopBrandsScreen = ({navigation}:any) => {
  const [search, setSearch] = useState('');

  const filteredBrands = brandData.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Top Brands</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Icon name="search" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Search with brand name..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      {/* Grid */}
     {brandData.length > 0 ? ( <FlatList
        data={filteredBrands}
        numColumns={4}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => <BrandCard image={item.image} />}
        showsVerticalScrollIndicator={false}
      />) : (
        <View style={styles.noData}>
            <Icon name="car-sport" size={30} color="#000" />
            <Text style={{width: 150}}>No Results Found</Text>
            <Text style={{fontSize:12, color:"gray", width:300}}>`We currently have no Search Results for “{search}”. Please try with different search text`</Text>
        </View>
      ) }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F1E2D',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  grid: {
    paddingBottom: 16,
    justifyContent: 'center',
  },
  noData:{
    flex:1,
    justifyContent: "center",
    alignItems:"center"
  }
});

export default TopBrandsScreen;
