// HomeScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/Ionicons";
import { FONTS } from "../../fonts/fonts";

const categories = [
  { id: "1", name: "Cadillac", logo: "car" },
  { id: "2", name: "Tesla", logo: "rocket" },
  { id: "3", name: "BMW", logo: "gear" },
  { id: "4", name: "Mazda", logo: "circle-o" },
];

const cars = [
  { id: "1", name: "Tesla Model 3", price: "$45,590", rating: 4.5, image: "https://i.imgur.com/7QY0sWQ.png" },
  { id: "2", name: "Tesla Model X", price: "$25,680", rating: 4.8, image: "https://i.imgur.com/V8jJ0QO.png" },
  { id: "3", name: "White Sedan", price: "$20,000", rating: 4.2, image: "https://i.imgur.com/a7lX7zM.png" },
  { id: "4", name: "Black SUV", price: "$30,000", rating: 4.6, image: "https://i.imgur.com/f5k8QGb.png" },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.welcome}>Welcome 👋</Text>
          <Text style={styles.username}>Shahinur Rahman</Text>
        </View>
        <Icon name="notifications-outline" size={24} color="#000" style={styles.bell} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search your car" style={styles.searchInput} />
        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="options-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.category}>
            <View style={styles.categoryIcon}>
              <FontAwesome name={item.logo} size={24} color="#fff" />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        )}
        style={{ marginVertical: 15 }}
      />

      {/* Popular Cars */}
      <View style={styles.popularHeader}>
        <Text style={styles.popularTitle}>Popular Car</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>

      <FlatList
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.carCard}>
            <TouchableOpacity style={styles.heartIcon}>
              <Icon name="heart-outline" size={20} color="#000" />
            </TouchableOpacity>
            <Image source={require('../../assests/images.jpeg')} style={styles.carImage} />
            <Text style={styles.carName}>{item.name}</Text>
            <Text style={styles.carPrice}>{item.price}</Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={14} color="orange" />
              <Text style={styles.carRating}>{item.rating}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  welcome: { fontSize: 14, color: "black", fontFamily:FONTS.demiBold },
  username: { fontSize: 16, fontFamily:FONTS.bold,color:"black" },
  bell: { marginLeft: "auto" },

  searchContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  searchInput: { flex: 1, padding: 10 },
  filterBtn: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
  },

  category: { alignItems: "center", marginHorizontal: 10 },
  categoryIcon: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 50,
  },
  categoryText: { marginTop: 5, fontSize: 12 },

  popularHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  popularTitle: { fontWeight: "bold", fontSize: 16, color:"black", fontFamily:FONTS.bold },
  viewAll: { color: "gray", fontFamily:FONTS.demiBold },

  carCard: {
    borderTopRightRadius: 10,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    marginBottom: 15,
    flex: 0.48,
    backgroundColor: "#e7eaee60",
    paddingBottom:10
  },
  carImage: { width: "100%",height: 100, resizeMode: "cover", borderTopRightRadius:10, borderTopLeftRadius:10 },
  carName: { fontWeight: "bold", marginTop: 5, color:"black", fontFamily:FONTS.bold, marginLeft: 8 },
  carPrice: { color: "black", fontSize: 10, fontFamily:FONTS.demiBold, marginLeft: 8 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 3, fontFamily:FONTS.demiBold, marginLeft: 8 },
  carRating: { marginLeft: 4, fontSize: 10, fontFamily:FONTS.medium },

  heartIcon: { position: "absolute", top: 8, right: 8, zIndex: 1 },

});
