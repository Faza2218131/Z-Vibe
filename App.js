import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Activity, Apple, Bell, Calendar, Footprints, Heart } from "lucide-react-native";
import { colors, fontType } from "./assets/theme";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

const blogs = [
  {
    id: "1",
    title: "Manfaat Lari Pagi untuk Kesehatan Tubuh",
    description:
      "Lari pagi secara rutin dapat meningkatkan kebugaran jantung, membakar kalori, dan menjaga kesehatan mental sepanjang hari.",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800",
    date: "21 Mei 2026",
  },
  {
    id: "2",
    title: "5 Latihan Sederhana untuk Membentuk Otot di Rumah",
    description:
      "Tidak perlu pergi ke gym, beberapa latihan seperti push-up, squat, dan plank dapat membantu membangun kekuatan otot.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    date: "20 Mei 2026",
  },
  {
    id: "3",
    title: "Pentingnya Pemanasan Sebelum Berolahraga",
    description:
      "Pemanasan membantu meningkatkan fleksibilitas otot dan mengurangi risiko cedera saat melakukan aktivitas fisik.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
    date: "19 Mei 2026",
  },
  {
    id: "4",
    title: "Strategi Latihan untuk Meningkatkan Stamina",
    description:
      "Kombinasi latihan kardio, pola makan sehat, dan istirahat yang cukup dapat meningkatkan daya tahan tubuh secara optimal.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    date: "18 Mei 2026",
  },
  {
    id: "5",
    title: "Tips Menjaga Konsistensi Olahraga Setiap Minggu",
    description:
      "Menentukan target yang realistis dan membuat jadwal latihan dapat membantu menjaga motivasi berolahraga.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    date: "17 Mei 2026",
  },
  {
    id: "6",
    title: "Mengenal Latihan HIIT dan Keunggulannya",
    description:
      "High Intensity Interval Training (HIIT) menjadi pilihan populer karena efektif membakar kalori dalam waktu singkat.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    date: "16 Mei 2026",
  },
];

export default function HomeScreen() {
  const [loaded] = useFonts(fontType);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.date}>{item.date}</Text>

        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <Text style={styles.readMore}>Baca Selengkapnya →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white()} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Z-Vibe</Text>
        <Heart color={colors.textPrimary()} size={24} />
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
        <Text style={[styles.judul, {paddingBottom: 10}]} >Disarankan</Text>
        <FlatList
          data={blogs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background(),
  },
  content: {
    backgroundColor: colors.background(),
    paddingHorizontal: 16,
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

  content: {
    padding: 15,
  },

  date: {
    fontFamily: "Poppins-Light",
    fontSize: 12,
    color: colors.textMuted(),
    marginBottom: 8,
  },

  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary(),
    marginBottom: 8,
  },

  description: {
    fontFamily: "Poppins-Light",
    fontSize: 14,
    color: colors.textMuted(),
    lineHeight: 22,
    marginBottom: 12,
  },

  readMore: {
    fontFamily: "Poppins-SemiBold",
    color: colors.primary(),
    fontWeight: "600",
  },
});
