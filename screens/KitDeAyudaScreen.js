import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";
import api from "../services/api";

// Imágenes únicas para cada recurso
const resourceImages = {
  "Respiración Profunda": require("../assets/breathing.jpg"),
  "Meditación Guiada": require("../assets/meditation.jpg"),
  "Texto Motivacional": require("../assets/motivation.jpg"),
  "Imagen Relajante": require("../assets/relaxing-image.jpg"),
};

export default function KitDeAyudaScreen({ navigation }) {
  const [kitResources, setKitResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnxietyKit = async () => {
      try {
        const response = await api.get("/anxiety-kit");
        setKitResources(response.data);
      } catch (error) {
        console.error("Error al obtener los recursos del kit:", error);
        Alert.alert("Error", "No se pudo cargar el Kit de Ayuda.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnxietyKit();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Control de Ansiedad</Text>
      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : (
        <View style={styles.gridContainer}>
          {kitResources.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gridItem}
              onPress={() =>
                item.type === "audio"
                  ? navigation.navigate("Reproductor", {
                      audioUrl: item.content,
                    })
                  : null
              }
            >
              <Image
                source={
                  resourceImages[item.title] ||
                  require("../assets/meditation.jpg") // Imagen única o predeterminada
                }
                style={styles.image}
              />
              {item.type === "audio" && (
                <View style={styles.icon}>
                  <Ionicons
                    name="musical-notes"
                    size={20}
                    color={colors.primary}
                  />
                </View>
              )}
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9", // Color de fondo suave
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.text,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  gridItem: {
    width: "48%", // Ajuste de dos elementos por fila
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 120,
  },
  textContainer: {
    padding: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#6F6F6F",
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 5,
  },
});
