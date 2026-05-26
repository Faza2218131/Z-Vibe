import React, { useState, useCallback } from "react";
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

import { useFocusEffect } from "@react-navigation/native";
import { supabase } from "../libs/supabase";

export default function BlogDetail({ navigation, route }) {
  const { blogId } = route.params;

  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const getBlogById = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("article")
        .select("*")
        .eq("id", blogId)
        .single();

      if (error) throw error;

      setSelectedBlog(data);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Gagal mengambil data artikel");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBlogById();
    }, [blogId]),
  );

  const navigateEdit = () => {
    navigation.navigate("EditBlog", {
      blogId,
    });
  };

  const handleDelete = () => {
    Alert.alert("Hapus Blog", "Apakah Anda yakin ingin menghapus blog ini?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);

            const { error } = await supabase
              .from("article")
              .delete()
              .eq("id", blogId);

            if (error) throw error;

            Alert.alert("Berhasil", "Artikel berhasil dihapus");

            navigation.goBack();
          } catch (error) {
            console.log(error);

            Alert.alert("Error", "Gagal menghapus artikel");
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
        <ActivityIndicator size="large" color="#3B82F6" />
      </SafeAreaView>
    );
  }

  if (!selectedBlog) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Artikel tidak ditemukan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={{
              uri: selectedBlog.image || "https://picsum.photos/800/500",
            }}
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

        <View style={styles.content}>
          <Text style={styles.title}>{selectedBlog.title}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <User size={16} color="#6B7280" />

              <Text style={styles.infoText}>
                {selectedBlog.author || "Admin"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Calendar size={16} color="#6B7280" />

              <Text style={styles.infoText}>
                {selectedBlog.created_at
                  ? new Date(selectedBlog.created_at).toLocaleDateString(
                      "id-ID",
                    )
                  : "-"}
              </Text>
            </View>
          </View>

          <Text style={styles.articleText}>{selectedBlog.description}</Text>

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

              <Text style={styles.buttonText}>Hapus</Text>
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
