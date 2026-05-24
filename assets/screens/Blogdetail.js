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

import {
  ArrowLeft,
  Heart,
  Calendar,
  User,
} from "lucide-react-native";

import { colors } from "../theme";

export default function BlogDetail({ navigation }) {
  const [liked, setLiked] = useState(false);

  const article = {
    title: "Manfaat Lari Pagi untuk Kesehatan Tubuh",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200",
    author: "Admin Z-Vibe",
    date: "21 Mei 2026",
    content: `Lari pagi merupakan salah satu olahraga sederhana yang memiliki banyak manfaat bagi kesehatan tubuh.

Aktivitas ini dapat meningkatkan kesehatan jantung, memperkuat otot, serta membantu membakar kalori secara efektif. Selain itu, lari pagi juga dapat meningkatkan suasana hati karena tubuh melepaskan hormon endorfin yang memberikan rasa bahagia.

Melakukan lari pagi secara rutin selama 20–30 menit setiap hari dapat membantu menjaga kebugaran tubuh dan meningkatkan kualitas tidur. Untuk hasil yang optimal, pastikan menggunakan alas kaki yang nyaman dan melakukan pemanasan sebelum berlari.

Selain manfaat fisik, lari pagi juga memberikan dampak positif bagi kesehatan mental. Udara segar dan paparan sinar matahari pagi dapat membantu mengurangi stres serta meningkatkan konsentrasi sepanjang hari.`,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View>
          <Image
            source={{ uri: article.image }}
            style={styles.coverImage}
          />

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
          <Text style={styles.title}>
            {article.title}
          </Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <User
                size={16}
                color={colors.textMuted()}
              />
              <Text style={styles.infoText}>
                {article.author}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Calendar
                size={16}
                color={colors.textMuted()}
              />
              <Text style={styles.infoText}>
                {article.date}
              </Text>
            </View>
          </View>

          <Text style={styles.articleText}>
            {article.content}
          </Text>
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