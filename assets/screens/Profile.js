import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { DirectInbox, Home, SearchNormal } from "iconsax-react-native";

import { colors, fontType } from "../theme";
import { blogs } from "../data";
import BlogCard from "../components/BlogCard";

const photos = [
  {
    id: "1",
    uri: "https://www.bettasplendid.com/wp-content/uploads/2017/09/Razer-Koi-Betta_8921-1.jpg",
  },
  {
    id: "2",
    uri: "https://www.bettasplendid.com/wp-content/uploads/2017/09/Razer-Koi-Betta_8911-1.jpg",
  },
  {
    id: "3",
    uri: "https://aquariumfishindia.com/wp-content/uploads/2023/03/Betta-crowntail-super-red-having-tags-of-Betta_yyth.jpg",
  },
];

const products = [
  {
    id: "1",
    title: "Cupang Koi Galaxy",
    price: "150.000",
    quantity: 12,
    image:
      "https://www.bettasplendid.com/wp-content/uploads/2017/09/Razer-Koi-Betta_8921-1.jpg",
  },
  {
    id: "2",
    title: "Cupang Super Red",
    price: "200.000",
    quantity: 8,
    image:
      "https://aquariumfishindia.com/wp-content/uploads/2023/03/Betta-crowntail-super-red-having-tags-of-Betta_yyth.jpg",
  },
  {
    id: "3",
    title: "Cupang Nemo Galaxy",
    price: "175.000",
    quantity: 5,
    image:
      "https://www.bettasplendid.com/wp-content/uploads/2017/09/Razer-Koi-Betta_8911-1.jpg",
  },
];

export default function Profile() {
  const [loaded] = useFonts(fontType);

  const [favorites, setFavorites] = useState([]);

  if (!loaded) return null;

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  const renderProduct = ({ item }) => (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.productCard}>
        <Image source={{ uri: item.image }} style={styles.productImage} />

        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>

          <Text style={styles.productPrice}>Rp {item.price}</Text>

          <Text style={styles.productStock}>Stok {item.quantity}</Text>
        </View>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://blog.photofeeler.com/wp-content/uploads/2017/02/flattering-pose-profile-pics.jpeg",
            }}
            style={styles.cover}
            blurRadius={2}
          />

          <Text style={styles.headerTitle}>My Profile</Text>

          <SearchNormal size={22} color="#FFFFFF" style={styles.searchIcon} />

          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://blog.photofeeler.com/wp-content/uploads/2017/02/flattering-pose-profile-pics.jpeg",
              }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Statistik */}
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>518.3K</Text>

            <Text style={styles.statsLabel}>Followers</Text>
          </View>

          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>54.2K</Text>

            <Text style={styles.statsLabel}>Following</Text>
          </View>
        </View>

        {/* Profile */}
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Albert Ross</Text>

          <Text style={styles.role}>Cupang Kontes</Text>
        </View>

        {/* Kontak */}
        <View style={styles.contactContainer}>
          <View style={styles.contactRow}>
            <DirectInbox size={24} color="#666" />

            <Text style={styles.contactText}>realalbertross@hotmail.com</Text>
          </View>

          <View style={styles.contactRow}>
            <Home size={24} color="#666" />

            <Text style={styles.contactText}>6.894 Produk Terjual</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.sectionTitle, { paddingBottom: 10 }]}>Blogmu</Text>
          <FlatList
            data={blogs}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 20,
            }}
            renderItem={({ item }) => (
              <BlogCard
                blog={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={toggleFavorite}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background(),
  },

  header: {
    height: 220,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  cover: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  headerTitle: {
    position: "absolute",
    top: 20,
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },

  searchIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },

  avatarContainer: {
    position: "absolute",
    bottom: -60,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    borderRadius: 100,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },

  statsContainer: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  statsBox: {
    alignItems: "center",
  },

  statsNumber: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },

  statsLabel: {
    fontFamily: "Poppins-Regular",
    color: "#777",
  },

  profileInfo: {
    alignItems: "center",
    marginTop: 20,
  },

  name: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },

  role: {
    fontFamily: "Poppins-Regular",
    color: "#777",
  },

  contactContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  contactText: {
    marginLeft: 12,
    fontFamily: "Poppins-Medium",
    color: "#444",
  },

  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    marginHorizontal: 24,
    marginHorizontal:18,
  },

  photo: {
    width: 110,
    height: 110,
    borderRadius: 12,
    marginRight: 12,
  },

  productCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },

  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  productInfo: {
    marginLeft: 12,
    justifyContent: "center",
  },

  productTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },

  productPrice: {
    fontFamily: "Poppins-Regular",
    color: "#777",
    marginTop: 4,
  },

  productStock: {
    fontFamily: "Poppins-Medium",
    marginTop: 4,
    color: colors.primary(),
  },
});
