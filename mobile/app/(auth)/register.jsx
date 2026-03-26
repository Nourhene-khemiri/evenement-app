import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { register } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import RegisterStyles from "../../screens/RegisterStyles";

export default function RegisterScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return Alert.alert("Erreur", "Veuillez remplir tous les champs");
    }
    try {
      setLoading(true);
      const { user } = await register(name, email, password);
      signIn(user);
      router.replace("/(app)/events");
    } catch (err) {
      Alert.alert(
        "Erreur",
        err.response?.data?.message || "Inscription échouée",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={RegisterStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={RegisterStyles.title}>Créer un compte</Text>

      <TextInput
        style={RegisterStyles.input}
        placeholder="Nom complet"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={RegisterStyles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={RegisterStyles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={RegisterStyles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={RegisterStyles.buttonText}>S'inscrire</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={RegisterStyles.link}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
