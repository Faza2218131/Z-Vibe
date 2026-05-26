import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { DirectInbox, Home, SearchNormal } from "iconsax-react-native";

import { colors, fontType } from "../theme";
import BlogCard from "../components/BlogCard";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

export default function Profile({ navigation }) {
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

  const handleDeleteSuccess = (id) => {
    setBlogData((prev) => prev.filter((item) => item.id !== id));
  };

  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getDataBlog = async () => {
    try {
      const response = await axios.get(
        "https://6a15bc5d91ff9a63de08b2a8.mockapi.io/article",
      );
      setBlogData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getDataBlog();
      setRefreshing(false);
    }, 1500);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDataBlog();
    }, []),
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

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => navigation.navigate("UploadBlog")}
        >
          <Text style={styles.uploadButtonText}>+ Tambah Blog</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={[styles.sectionTitle, { paddingBottom: 10 }]}>
            Blogmu
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontal}
          >
            {blogData.map((item) => (
              <View key={item.id} style={{ marginRight: 10 }}>
                <BlogCard
                  blog={item}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={toggleFavorite}
                  onDeleted={handleDeleteSuccess}
                />
              </View>
            ))}
          </ScrollView>
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
    marginHorizontal: 18,
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
  horizontal: {
    margin: 10,
  },
  uploadButton: {
    marginHorizontal: 20,
    marginTop: 20,
    height: 50,
    backgroundColor: "#3B82F6",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  uploadButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "Poppins-Bold",
  },
});
