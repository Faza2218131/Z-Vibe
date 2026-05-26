import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import {
  Activity,
  Apple,
  Calendar,
  Footprints,
  Heart,
} from "lucide-react-native";

import axios from "axios";

import { colors, fontType } from "../theme";
import BlogCard from "../components/BlogCard";

export default function Homepage() {
  const [loaded] = useFonts(fontType);

  const [blogs, setBlogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://6a15bc5d91ff9a63de08b2a8.mockapi.io/article"
      );

      setBlogs(response.data);
    } catch (error) {
      console.log("Error Get Blog :", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getBlogs();
    setRefreshing(false);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  const handleDeleteSuccess = (id) => {
    setBlogs((prevBlogs) =>
      prevBlogs.filter((item) => item.id !== id)
    );
  };

  if (!loaded) {
    return null;
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={colors.primary()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Z-Vibe
        </Text>

        <View style={styles.favoriteContainer}>
          <Heart
            size={26}
            color="#EF4444"
            fill="#EF4444"
          />

          {favorites.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {favorites.length}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* MENU */}
      <View style={styles.content}>
        <Text style={styles.judul}>Menu</Text>
      </View>

      <View style={styles.menu}>
        <View style={styles.menuButton}>
          <Footprints
            color={colors.textPrimary()}
            size={32}
          />
          <Text style={styles.menuText}>
            Sport
          </Text>
        </View>

        <View style={styles.menuButton}>
          <Calendar
            color={colors.textPrimary()}
            size={32}
          />
          <Text style={styles.menuText}>
            Date
          </Text>
        </View>

        <View style={styles.menuButton}>
          <Activity
            color={colors.textPrimary()}
            size={32}
          />
          <Text style={styles.menuText}>
            Activity
          </Text>
        </View>

        <View style={styles.menuButton}>
          <Apple
            color={colors.textPrimary()}
            size={32}
          />
          <Text style={styles.menuText}>
            Food
          </Text>
        </View>
      </View>

      {/* BLOG */}
      <View style={styles.blogContainer}>
        <Text style={styles.judul}>
          Disarankan
        </Text>

        <FlatList
          data={blogs}
          keyExtractor={(item) =>
            item.id.toString()
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 30,
          }}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Tidak ada blog tersedia
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <BlogCard
              blog={item}
              isFavorite={favorites.includes(
                item.id
              )}
              onToggleFavorite={
                toggleFavorite
              }
              onDeleted={
                handleDeleteSuccess
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background(),
    paddingTop: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 24,
    paddingVertical: 12,

    backgroundColor: colors.white(),
  },

  headerText: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: colors.textPrimary(),
  },

  favoriteContainer: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -8,

    minWidth: 18,
    height: 18,

    borderRadius: 9,

    backgroundColor: "#EF4444",

    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "Poppins-Bold",
  },

  content: {
    paddingHorizontal: 16,
    marginTop: 10,
  },

  judul: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: colors.textPrimary(),
  },

  menu: {
    flexDirection: "row",
    justifyContent: "space-around",

    marginTop: 16,
    marginBottom: 20,
  },

  menuButton: {
    alignItems: "center",

    backgroundColor: colors.white(),

    paddingVertical: 12,
    paddingHorizontal: 14,

    borderRadius: 12,

    elevation: 2,
  },

  menuText: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: colors.textPrimary(),
  },

  blogContainer: {
    flex: 1,
  },

  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  emptyText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: colors.textMuted(),
  },
});