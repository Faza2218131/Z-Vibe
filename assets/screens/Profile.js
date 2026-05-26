import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { DirectInbox, Home, SearchNormal } from "iconsax-react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useActionSheet } from "@expo/react-native-action-sheet";

import { colors, fontType } from "../theme";
import BlogCard from "../components/BlogCard";
import { supabase } from "../libs/supabase";

export default function Profile({ navigation }) {
  const [loaded] = useFonts(fontType);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [profileData, setProfileData] = useState(null);
  const [blogData, setBlogData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { showActionSheetWithOptions } = useActionSheet();

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

  const getDataProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setProfileData(data);
    } catch (error) {
      console.log("Profile Error:", error);
    }
  };

  const getDataBlog = async () => {
    try {
      const { data, error } = await supabase
        .from("article")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setBlogData(data || []);
    } catch (error) {
      console.log("Blog Error:", error);
    }
  };

  const loadData = async () => {
    setLoading(true);

    await Promise.all([getDataProfile(), getDataBlog()]);

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);

    await loadData();

    setRefreshing(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();

      await AsyncStorage.removeItem("userData");

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Login",
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openActionSheet = () => {
    const options = ["Logout", "Cancel"];

    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        if (selectedIndex === 0) {
          handleLogout();
        }
      },
    );
  };

  if (!loaded) return null;

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={{
              uri: profileData?.photo_url || "https://blog.photofeeler.com/wp-content/uploads/2017/02/flattering-pose-profile-pics.jpeg",
            }}
            style={styles.cover}
            blurRadius={2}
          />

          <Text style={styles.headerTitle}>My Profile</Text>

          <TouchableOpacity onPress={openActionSheet}>
            <SearchNormal size={22} color="#FFF" style={styles.searchIcon} />
          </TouchableOpacity>

          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: profileData?.photo_url || "https://blog.photofeeler.com/wp-content/uploads/2017/02/flattering-pose-profile-pics.jpeg",
              }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* STATISTIK */}
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>{blogData.length}</Text>

            <Text style={styles.statsLabel}>Blog</Text>
          </View>

          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>{favorites.length}</Text>

            <Text style={styles.statsLabel}>Favorite</Text>
          </View>
        </View>

        {/* PROFILE */}
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{profileData?.fullname || "User"}</Text>

          <Text style={styles.role}>{profileData?.username || "-"}</Text>
        </View>

        {/* CONTACT */}
        <View style={styles.contactContainer}>
          <View style={styles.contactRow}>
            <DirectInbox size={24} color="#666" />

            <Text style={styles.contactText}>{profileData?.email || "-"}</Text>
          </View>

          <View style={styles.contactRow}>
            <Home size={24} color="#666" />

            <Text style={styles.contactText}>
              Total Blog : {blogData.length}
            </Text>
          </View>
        </View>

        {/* BUTTON TAMBAH BLOG */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => navigation.navigate("UploadBlog")}
        >
          <Text style={styles.uploadButtonText}>+ Tambah Blog</Text>
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={openActionSheet}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* BLOG LIST */}
        <View style={styles.content}>
          <Text
            style={[
              styles.sectionTitle,
              {
                paddingBottom: 10,
              },
            ]}
          >
            Blogmu
          </Text>

          {blogData.map((item) => (
            <View
              key={item.id}
              style={{
                marginHorizontal: 12,
              }}
            >
              <BlogCard
                blog={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={toggleFavorite}
                onDeleted={handleDeleteSuccess}
              />
            </View>
          ))}
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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },

  cover: {
    ...StyleSheet.absoluteFillObject,
  },

  headerTitle: {
    position: "absolute",
    top: 20,
    color: "#FFF",
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
    borderColor: "#FFF",
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
    fontFamily: "Poppins-Bold",
  },

  logoutButton: {
    marginHorizontal: 20,
    marginTop: 10,
    height: 50,
    backgroundColor: "#EF4444",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  logoutButtonText: {
    color: "#FFF",
    fontFamily: "Poppins-Bold",
  },

  content: {
    marginTop: 20,
    marginBottom: 30,
  },

  sectionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    marginHorizontal: 18,
  },
});
