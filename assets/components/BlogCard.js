import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
} from "react-native";

import { Heart, Pencil, Trash2 } from "lucide-react-native";
import { colors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function BlogCard({
  blog,
  isFavorite,
  onToggleFavorite,
  onDeleted,
}) {
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

  const handleEdit = () => {
    navigation.navigate("EditBlog", {
      blogId: blog.id,
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Hapus Blog",
      "Apakah Anda yakin ingin menghapus blog ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(
                `https://6a15bc5d91ff9a63de08b2a8.mockapi.io/article/${blog.id}`
              );

              Alert.alert(
                "Berhasil",
                "Blog berhasil dihapus"
              );

              if (onDeleted) {
                onDeleted(blog.id);
              }
            } catch (error) {
              console.log(error);

              Alert.alert(
                "Error",
                "Gagal menghapus blog"
              );
            }
          },
        },
      ]
    );
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
        navigation.navigate("BlogDetail", {
          blogId: blog.id,
        })
      }
    >
      <Image
        source={{ uri: blog.image }}
        style={styles.image}
      />

      {/* Favorite */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleFavorite}
      >
        <Animated.View style={shakeStyle}>
          <Heart
            size={22}
            color={isFavorite ? "#EF4444" : "#FFFFFF"}
            fill={isFavorite ? "#EF4444" : "transparent"}
          />
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.date}>
          {blog.date}
        </Text>

        <Text style={styles.title}>
          {blog.title}
        </Text>

        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {blog.description}
        </Text>

        <Text style={styles.readMore}>
          Baca Selengkapnya →
        </Text>

        {/* CRUD Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEdit}
          >
            <Pencil size={16} color="#FFF" />
            <Text style={styles.buttonText}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Trash2 size={16} color="#FFF" />
            <Text style={styles.buttonText}>
              Hapus
            </Text>
          </TouchableOpacity>
        </View>
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
    top: 15,

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
    marginBottom: 15,
  },

  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  editButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#2563EB",
    paddingVertical: 10,
    borderRadius: 10,
  },

  deleteButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#DC2626",
    paddingVertical: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: "#FFF",
    marginLeft: 6,
    fontFamily: "Poppins-SemiBold",
  },
});