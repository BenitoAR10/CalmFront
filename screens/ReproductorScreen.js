import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";

export default function ReproductorScreen({ navigation }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const audioUrl =
    "https://drive.google.com/uc?export=download&id=1k6SlZKOCA0GbUu3utyfg15E6aQTZHzeP";

  // Función para manejar el estado de reproducción/pausa
  const playPauseAudio = async () => {
    try {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true },
        );
        setSound(newSound);
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setIsPlaying(true);
      } else if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo reproducir el audio. Verifica la URL.");
    }
  };

  // Función para actualizar la posición y duración del audio
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
    } else {
      Alert.alert("Error", "Error al cargar el audio.");
    }
  };

  // Función para manejar el desplazamiento del slider
  const handleSeek = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  // Limpiar el audio al desmontar el componente
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      {/* Botón de cerrar */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={24} color={colors.text} />
      </TouchableOpacity>

      {/* Título y subtítulo */}
      <Text style={styles.title}>Presta Atención</Text>
      <Text style={styles.subtitle}>7 días para la calma</Text>

      {/* Controles de reproducción */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => handleSeek(Math.max(position - 15000, 0))}
        >
          <Ionicons name="play-back" size={40} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={playPauseAudio}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={80}
            color={colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSeek(Math.min(position + 15000, duration))}
        >
          <Ionicons name="play-forward" size={40} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Slider de progreso */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={handleSeek}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor={colors.primary}
      />

      {/* Tiempo transcurrido y total */}
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {new Date(position).toISOString().substr(14, 5)}
        </Text>
        <Text style={styles.time}>
          {new Date(duration).toISOString().substr(14, 5)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF5F0",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    index: 10,
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
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  slider: {
    width: "80%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  time: {
    fontSize: 14,
    color: "#555",
  },
});
