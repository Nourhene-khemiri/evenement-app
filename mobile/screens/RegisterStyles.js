import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1e293b",
    color: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#334155",
  },
  button: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#6366f1",
    textAlign: "center",
    fontSize: 14,
  },
});
