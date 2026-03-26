import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getEventById, registerToEvent } from "../../../services/eventService";
import styles from "../../../screens/EventDetailStyles";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        Alert.alert("Erreur", "Impossible de charger cet événement");
        router.back();
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  const handleRegister = async () => {
    try {
      setRegistering(true);
      await registerToEvent(id);
      setIsRegistered(true);
      Alert.alert("✅ Succès", "Vous êtes inscrit à cet événement !");
    } catch (err) {
      Alert.alert(
        "Erreur",
        err.response?.data?.message || "Inscription échouée",
      );
    } finally {
      setRegistering(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginBottom: 16 }}
      >
        <Text style={{ color: "#6366f1", fontSize: 15 }}>← Retour</Text>
      </TouchableOpacity>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Événement</Text>
      </View>

      <Text style={styles.title}>{event.title}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoIcon}>📅</Text>
        <Text style={styles.infoText}>{formatDate(event.date)}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoIcon}>📍</Text>
        <Text style={styles.infoText}>{event.location}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoIcon}>👥</Text>
        <Text style={styles.infoText}>{event.capacity} places disponibles</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.descriptionLabel}>Description</Text>
      <Text style={styles.description}>{event.description}</Text>

      <TouchableOpacity
        style={[styles.button, isRegistered && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={registering || isRegistered}
      >
        {registering ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isRegistered ? "✅ Inscrit" : "S'inscrire à l'événement"}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
