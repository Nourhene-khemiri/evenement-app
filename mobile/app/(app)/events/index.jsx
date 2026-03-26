import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { getAllEvents } from "../../../services/eventService";
import { useAuth } from "../../../context/AuthContext";
import styles from "../../../screens/EventListStyles";

export default function EventListScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        Alert.alert("Erreur", "Impossible de charger les événements");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bonjour, {user?.name} 👋</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Événements</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/(app)/events/${item.id}`)}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDate}>📅 {formatDate(item.date)}</Text>
            <Text style={styles.cardLocation}>📍 {item.location}</Text>
            <View style={styles.capacityBadge}>
              <Text style={styles.capacityText}>👥 {item.capacity} places</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
