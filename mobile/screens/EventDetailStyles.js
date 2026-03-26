import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 24,
    paddingTop: 55,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  badge: {
    backgroundColor: "#312e81",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: "#a5b4fc",
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    lineHeight: 32,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  infoText: {
    color: "#94a3b8",
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#334155",
    marginVertical: 20,
  },
  descriptionLabel: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonDisabled: {
    backgroundColor: "#374151",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
