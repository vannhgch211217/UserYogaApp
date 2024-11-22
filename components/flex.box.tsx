import React from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet } from "react-native";
const FlexBox = () => {
  return (
    <ThemedView style={styles.containter}>
      <ThemedView style={styles.item1}>
        <ThemedText>item 1</ThemedText>
      </ThemedView>
      <ThemedView style={styles.item2}>
        <ThemedText>item 2</ThemedText>
      </ThemedView>
      <ThemedView style={styles.item3}>
        <ThemedText>item 3</ThemedText>
      </ThemedView>
      <ThemedView style={styles.item4}>
        <ThemedText>item 4</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  containter: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    flex: 1,
  },
  item1: {
    backgroundColor: "blue",
    padding: 30,
    width: 40,
    height: 40,
  },
  item2: {
    backgroundColor: "green",
    padding: 30,
    height: 200,
  },
  item3: {
    backgroundColor: "yellow",
    padding: 30,
  },
  item4: {
    backgroundColor: "violet",
    padding: 30,
    width: 40,
    height: 100,
  },
});
export default FlexBox;
