import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
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

import { colors, fontType } from "../theme";
import BlogCard from "../components/BlogCard";
import { blogs } from "../data";

export default function Homepage() {
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Z-Vibe</Text>

        <View style={styles.favoriteContainer}>
          <Heart size={26} color="#EF4444" fill="#EF4444" />

          {favorites.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{favorites.length}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.judul}>Menu</Text>
      </View>
      <View style={styles.menu}>
        <View style={styles.menuButton}>
          <Footprints color={colors.textPrimary()} size={36} />
          <Text style={styles.menuText}>Sport</Text>
        </View>
        <View style={styles.menuButton}>
          <Calendar color={colors.textPrimary()} size={36} />
          <Text style={styles.menuText}>Date</Text>
        </View>
        <View style={styles.menuButton}>
          <Activity color={colors.textPrimary()} size={36} />
          <Text style={styles.menuText}>Activ</Text>
        </View>
        <View style={styles.menuButton}>
          <Apple color={colors.textPrimary()} size={36} />
          <Text style={styles.menuText}>Food</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={[styles.judul, { paddingBottom: 10 }]}>Disarankan</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background(),
    paddingTop: 16,
  },
  content: {
    backgroundColor: colors.background(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: colors.white(),
  },
  headerText: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: colors.textPrimary(),
    backgroundColor: colors.white(),
  },
  menu: {
    paddingHorizontal: 24,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: colors.white(),
    alignItems: "center",
    height: 60,
    padding: 12,
    borderRadius: 10,
  },
  menuText: {
    fontFamily: "Poppins",
    marginTop: 16,
  },

  judul: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
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
    color: "#FFF",
    fontSize: 10,
    fontFamily: "Poppins-Bold",
  },

  judul: {
    fontFamily: "Poppins-Bold",

    fontSize: 24,

    margin: 16,
  },

  menu: {
    flexDirection: "row",

    justifyContent: "space-around",

    marginBottom: 20,
  },

  menuButton: {
    alignItems: "center",
  },
});
