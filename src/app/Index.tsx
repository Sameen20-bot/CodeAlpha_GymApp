import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { s, vs } from "react-native-size-matters";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Food Item View */}
      <View style={styles.foodComponent}>
        <Text style={styles.foodTitle}>Pizza</Text>
        <Text style={styles.foodText}>350 cal, Dominos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: s(10),
  },
  foodComponent: {
    backgroundColor: "gainsboro",
    padding: s(10),
    borderRadius: s(5),
    gap: s(5),
  },
  foodTitle: {
    fontWeight: "bold",
    fontSize: s(16),
  },
  foodText: {
    color: "dimgray",
  },
});
