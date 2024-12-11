import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
export default function CalmaAhoraScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        {/* Título y descripción */}
        <View style={styles.header}>
          <Text style={styles.title}>Calma Ahora</Text>
          <Text style={styles.subtitle}>
            Aquí encontrarás ejercicios y técnicas para calmarte durante
            momentos de ansiedad y estrés, y mantener tu bienestar emocional.
          </Text>
        </View>

        {/* Categorías */}
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton}>
            <Ionicons name="apps" size={24} color={colors.primary} />
            <Text style={styles.categoryText}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() =>
              navigation.navigate("ListaEjercicios", { tipo: "Favoritos" })
            }
          >
            <Ionicons name="heart" size={24} color={colors.primary} />
            <Text style={styles.categoryText}>Mis ejercicios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() =>
              navigation.navigate("ListaEjercicios", { tipo: "Ansiedad" })
            }
          >
            <Ionicons name="happy" size={24} color={colors.primary} />
            <Text style={styles.categoryText}>Ansiedad</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() =>
              navigation.navigate("ListaEjercicios", { tipo: "Estrés" })
            }
          >
            <Ionicons name="sad" size={24} color={colors.primary} />
            <Text style={styles.categoryText}>Estrés</Text>
          </TouchableOpacity>
        </View>

        {/* Bloques de contenido */}
        <View style={styles.content}>
          {/* Calma Diaria - Bloque con contenido centrado */}
          <TouchableOpacity
            style={[styles.exerciseCard, styles.largeCard]}
            onPress={() => navigation.navigate("Reproductor")}
          >
            <ImageBackground
              source={{
                uri: "https://i.pinimg.com/736x/d0/29/04/d02904d6a1ad2180c942be51f5b786f6.jpg",
              }}
              style={styles.imageBackgroundLarge}
              imageStyle={{ borderRadius: 10 }}
            >
              <Text style={styles.exerciseTitleAligned}>Calma Diaria</Text>
              <Ionicons
                name="play-circle"
                size={40}
                color="3F414E"
                style={styles.playIconAligned}
              />
            </ImageBackground>
            <Text style={styles.exerciseSubtitleAligned}>
              Ejercicio de respiración para hoy
            </Text>
          </TouchableOpacity>

          {/* Otros bloques */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.exerciseCard, styles.blockWithImage]}
              onPress={() => navigation.navigate("KitDeAyuda")} // Navegar al Kit de Ayuda
            >
              <ImageBackground
                source={{
                  uri: "https://i.pinimg.com/736x/c9/c9/80/c9c98026acb7d9161e42daad494fafa0.jpg",
                }}
                style={styles.imageBackground}
                imageStyle={{ borderRadius: 10 }}
              >
                <Text style={styles.exerciseTitleLeft}>
                  Desafío: 7 Días para la Calma
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.exerciseCard, styles.blockWithImage]}
              onPress={() => navigation.navigate("KitDeAyuda")} // Navegar al Kit de Ayuda
            >
              <ImageBackground
                source={{
                  uri: "https://i.pinimg.com/736x/ad/6b/c7/ad6bc78eaa6525cbe4c0c3cb795842a0.jpg",
                }}
                style={styles.imageBackground}
                imageStyle={{ borderRadius: 10 }}
              >
                <Text style={styles.exerciseTitleLeft}>
                  Control de Ansiedad
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    lineHeight: 22,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    flex: 1,
    marginHorizontal: 5,
  },
  selectedCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    color: colors.text,
    textAlign: "center",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  content: {
    marginTop: 20,
  },
  exerciseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 15,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
    borderRadius: 10,
    overflow: "hidden",
    minHeight: 200,
  },
  imageBackgroundLarge: {
    flex: 1,
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseTitleAligned: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3F414E",
    marginRight: 10,
  },
  exerciseSubtitleAligned: {
    fontSize: 14,
    color: colors.text,
    marginTop: 10,
    textAlign: "left",
  },
  exerciseTitleLeft: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  playIconAligned: {
    marginLeft: 10,
  },
});
