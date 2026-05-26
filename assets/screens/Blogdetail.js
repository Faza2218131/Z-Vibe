import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  Heart,
  Calendar,
  User,
  Pencil,
  Trash2,
} from "lucide-react-native";

import axios from "axios";
import { colors } from "../theme";

export default function BlogDetail({ navigation, route }) {
  const { blogId } = route.params;

  const [liked, setLiked] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogById();
  }, []);

  const getBlogById = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://6a15bc5d91ff9a63de08b2a8.mockapi.io/article/${blogId}`,
      );

      setSelectedBlog(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load blog data");
    } finally {
      setLoading(false);
    }
  };

  const navigateEdit = () => {
    navigation.navigate("EditBlog", {
      blogId: blogId,
    });
  };

  const handleDelete = () => {
    Alert.alert("Delete Blog", "Are you sure you want to delete this blog?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);

            await axios.delete(
              `https://6a15bc5d91ff9a63de08b2a8.mockapi.io/article/${blogId}`,
            );

            Alert.alert("Success", "Blog deleted successfully");

            navigation.navigate("MainApp", {
              screen: "Profile",
            });
          } catch (error) {
            console.log(error);

            Alert.alert("Error", "Failed to delete blog");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  if (!selectedBlog) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Blog not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover */}
        <View>
          <Image
            source={{ uri: selectedBlog.image }}
            style={styles.coverImage}
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
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
          <Text style={styles.title}>{selectedBlog.title}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <User size={16} color="#6B7280" />
              <Text style={styles.infoText}>{selectedBlog.author}</Text>
            </View>

            <View style={styles.infoItem}>
              <Calendar size={16} color="#6B7280" />
              <Text style={styles.infoText}>{selectedBlog.date}</Text>
            </View>
          </View>

          <Text style={styles.articleText}>{selectedBlog.description}</Text>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.editButton} onPress={navigateEdit}>
              <Pencil size={18} color="#FFF" />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Trash2 size={18} color="#FFF" />
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "bold",
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
  },

  articleText: {
    fontSize: 15,
    lineHeight: 28,
    color: "#374151",
    textAlign: "justify",
  },

  actionContainer: {
    flexDirection: "row",
    marginTop: 30,
    gap: 12,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    marginLeft: 8,
    fontWeight: "600",
  },
});
