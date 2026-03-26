import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    paddingTop: 55,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  welcome: {
    color: "#94a3b8",
    fontSize: 14,
  },
  logout: {
    color: "#f87171",
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  cardDate: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 4,
  },
  cardLocation: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 10,
  },
  capacityBadge: {
    backgroundColor: "#312e81",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  capacityText: {
    color: "#a5b4fc",
    fontSize: 12,
    fontWeight: "600",
  },
});
