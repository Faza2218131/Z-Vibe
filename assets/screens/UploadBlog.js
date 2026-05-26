import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Image as ImageIcon } from "lucide-react-native";
import { supabase } from "../libs/supabase";

export default function UploadBlog({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Izinkan akses galeri terlebih dahulu",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    if (!title || !description) {
      Alert.alert("Validasi", "Judul dan isi artikel wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("article")
        .insert([
          {
            title,
            description,
            image: imageUri,
            author: user?.email || "Unknown User",
          },
        ])
        .select()
        .single();

      if (error) throw error;

      Alert.alert("Berhasil", "Artikel berhasil dipublikasikan", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("BlogDetail", {
              blogId: data.id,
            }),
        },
      ]);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Gagal menambahkan artikel");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#111" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Upload Blog</Text>
        </View>

        {/* IMAGE PICKER */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <>
              <ImageIcon size={40} color="#777" />
              <Text style={styles.imageText}>Pilih Cover Blog</Text>
            </>
          )}
        </TouchableOpacity>

        {/* TITLE */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Judul Blog</Text>

          <TextInput
            placeholder="Masukkan judul blog"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        </View>

        {/* DESCRIPTION */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Isi Artikel</Text>

          <TextInput
            placeholder="Tulis artikel..."
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            style={[styles.input, { height: 220 }]}
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Publikasikan Blog</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
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

  imagePicker: {
    height: 220,
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    overflow: "hidden",
  },

  previewImage: {
    width: "100%",
    height: "100%",
  },

  imageText: {
    marginTop: 10,
    color: "#777",
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
