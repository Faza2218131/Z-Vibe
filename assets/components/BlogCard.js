import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Heart } from "lucide-react-native";
import { colors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";

export default function BlogCard({ blog, isFavorite, onToggleFavorite, item }) {
  const navigation = useNavigation();

  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handleFavorite = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();

    onToggleFavorite(blog.id);
  };

  const shakeStyle = {
    transform: [
      {
        rotate: shakeAnim.interpolate({
          inputRange: [-1, 1],
          outputRange: ["-15deg", "15deg"],
        }),
      },
    ],
  };
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

      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
        <Animated.View style={shakeStyle}>
          <Heart
            size={22}
            color={isFavorite ? "#EF4444" : "#FFFFFF"}
            fill={isFavorite ? "#EF4444" : "transparent"}
          />
        </Animated.View>
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
