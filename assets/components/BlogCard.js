import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Heart } from "lucide-react-native";
import { colors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function BlogCard({ blog, isFavorite, onToggleFavorite, item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Blogdetail", {
          blogId: blog.id,
        })
      }
    >
      <Image source={{ uri: blog.image }} style={styles.image} />

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(blog.id)}
      >
        <Heart
          size={22}
          color={isFavorite ? "#EF4444" : "#FFFFFF"}
          fill={isFavorite ? "#EF4444" : "transparent"}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.date}>{blog.date}</Text>

        <Text style={styles.title}>{blog.title}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {blog.description}
        </Text>

        <Text style={styles.readMore}>Baca Selengkapnya →</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white(),
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 200,
  },

  favoriteButton: {
    position: "absolute",
    right: 15,
    bottom: 15,

    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0,0,0,0.4)",

    zIndex: 99,
  },

  content: {
    padding: 15,
  },

  date: {
    fontFamily: "Poppins-Light",
    color: colors.textMuted(),
    fontSize: 12,
    marginBottom: 8,
  },

  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: colors.textPrimary(),
    marginBottom: 8,
  },

  description: {
    fontFamily: "Poppins-Regular",
    color: colors.textSecondary(),
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },

  readMore: {
    fontFamily: "Poppins-SemiBold",
    color: colors.primary(),
  },
});
