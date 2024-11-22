import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#50C2C9",
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  headerText: {
    marginLeft: 0,
    flex: 1,
    textAlign: "center",
    fontSize: 25,
    fontWeight: 600,
  },
});

const AppHeader = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.headerText}>Yoga Class</ThemedText>
    </ThemedView>
  );
};

export default AppHeader;
