import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import api from "../services/api";
import colors from "../utils/colors";

export default function ListaEjerciciosScreen({ route, navigation }) {
  const { tipo } = route.params;
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        let response;
        if (tipo === "Favoritos") {
          // Llamada al endpoint de favoritos
          response = await api.get("/exercises/favorites");
        } else {
          // Llamada al endpoint de categoría
          response = await api.get("/exercises/category", {
            params: { category: tipo },
          });
        }
        setExercises(response.data || []); // Aseguramos que sea un array
      } catch (error) {
        console.error("Error al obtener ejercicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [tipo]);

  const keyExtractor = (item, index) =>
    item?.id?.toString() || index.toString();

  const renderExercise = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() =>
        navigation.navigate("Reproductor", {
          exerciseId: item.id,
        })
      }
    >
      <Image
        source={{
          uri: item.imageUrl || "https://via.placeholder.com/150", // Usar el campo imageUrl del backend
        }}
        style={styles.exerciseImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.exerciseTitle}>{item.title || "Sin título"}</Text>
        <Text style={styles.exerciseDescription}>
          {item.description || "Sin descripción"}
        </Text>
      </View>
      <Ionicons name="play-circle" size={30} color={colors.primary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botón de regresar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>

      <Text style={styles.title}>{tipo}</Text>
      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : exercises.length > 0 ? (
        <FlatList
          data={exercises}
          keyExtractor={keyExtractor}
          renderItem={renderExercise}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>
          No hay ejercicios disponibles para esta categoría.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF5F0",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "#FFFFFF", // Botón con fondo blanco
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
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.text,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.text,
    marginTop: 50,
  },
  exerciseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: "#EAEAEA",
  },
  textContainer: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  exerciseDescription: {
    fontSize: 14,
    color: colors.text,
    marginTop: 5,
  },
});
