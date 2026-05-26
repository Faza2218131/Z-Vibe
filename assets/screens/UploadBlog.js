import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import axios from "axios";

export default function UploadBlog({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !description) {
      Alert.alert(
        "Validasi",
        "Judul dan isi artikel wajib diisi"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://6a15bc5d91ff9a63de08b2a8.mockapi.io/article",
        {
          title,
          description,
          image,
          author: "Admin",
          date: new Date().toLocaleDateString("id-ID"),
        }
      );

      Alert.alert(
        "Berhasil",
        "Artikel berhasil ditambahkan",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("BlogDetail", {
                blogId: response.data.id,
              }),
          },
        ]
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Gagal menambahkan artikel"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#111" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Upload Blog
          </Text>
        </View>

        {/* Judul */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Judul Blog
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Masukkan judul blog"
            style={styles.input}
          />
        </View>

        {/* Isi Artikel */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Isi Artikel
          </Text>

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Tulis artikel..."
            multiline
            textAlignVertical="top"
            style={[styles.input, { height: 220 }]}
          />
        </View>

        {/* URL Gambar */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            URL Gambar
          </Text>

          <TextInput
            value={image}
            onChangeText={setImage}
            placeholder="https://..."
            style={styles.input}
          />
        </View>

        {/* Button Upload */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpload}
        >
          <Text style={styles.buttonText}>
            Publikasikan Blog
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },

  headerTitle: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
  },

  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  label: {
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 15,
    borderWidth: 1,
    borderColor: "#EEE",
  },

  button: {
    margin: 20,
    height: 55,
    borderRadius: 14,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});