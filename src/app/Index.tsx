import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { s, vs } from "react-native-size-matters";
import FoodListItem from "../components/FoodListItem";
import { useState } from "react";

const foodItems = [
  { label: "Pizza", cal: 75, brand: "Dominos" },
  { label: "Apple", cal: 50, brand: "Generic" },
  { label: "Coffee", cal: 100, brand: "Americano" },
];

export default function App() {
  const [search, setSearch] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
        style={styles.input}
      />
      {/* Food List View */}
      <FlatList
        data={foodItems}
        renderItem={({ item }) => <FoodListItem item={item} />}
        contentContainerStyle={{ gap: s(5) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f8",
    padding: s(10),
    gap: s(10),
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: s(10),
    borderRadius: s(20),
  },
});
