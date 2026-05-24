import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { ArrowLeft, Heart, Calendar, User } from "lucide-react-native";

import { colors } from "../theme";
import { blogs } from "../data";

export default function BlogDetail({ navigation, route }) {
  const [liked, setLiked] = useState(false);

  const { blogId } = route.params;

  const article = blogs.find((item) => item.id === blogId);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View>
          <Image source={{ uri: article.image }} style={styles.coverImage} />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
          >
            <ArrowLeft size={22} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => setLiked(!liked)}
          >
            <Heart
              size={22}
              color="#FFF"
              fill={liked ? "#EF4444" : "transparent"}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{article.title}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <User size={16} color={colors.textMuted()} />
              <Text style={styles.infoText}>{article.author}</Text>
            </View>

            <View style={styles.infoItem}>
              <Calendar size={16} color={colors.textMuted()} />
              <Text style={styles.infoText}>{article.date}</Text>
            </View>
          </View>

          <Text style={styles.articleText}>{article.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  coverImage: {
    width: "100%",
    height: 280,
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 16,

    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: "rgba(0,0,0,0.4)",

    justifyContent: "center",
    alignItems: "center",
  },

  likeButton: {
    position: "absolute",
    top: 20,
    right: 16,

    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: "rgba(0,0,0,0.4)",

    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#111827",
    marginBottom: 12,
  },

  infoContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },

  infoText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#6B7280",
    fontFamily: "Poppins-Regular",
  },

  articleText: {
    fontSize: 15,
    lineHeight: 28,
    color: "#374151",
    fontFamily: "Poppins-Regular",
    textAlign: "justify",
  },
});
