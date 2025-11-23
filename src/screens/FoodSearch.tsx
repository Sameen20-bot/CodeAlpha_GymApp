import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FoodListItem from "../components/FoodListItem";
import { s } from "react-native-size-matters";
import { useState } from "react";

const FoodSearch = () => {
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async () => {
    if (!search.trim()) return;

    const calories = parseInt(search);
    if (!calories || calories <= 0) {
      alert("Please enter a valid number!");
      return;
    }

    setLoading(true);

    try {
      const minCalories = calories - 50;
      const maxCalories = calories + 50;

      const url = `https://api.spoonacular.com/recipes/findByNutrients?minCalories=${minCalories}&maxCalories=${maxCalories}&number=10&apiKey=cc94cb6cb54a43969cebd408a3ebc84a`;
      console.log("Fetching URL:", url);

      const response = await fetch(url);
      const result = await response.json();
      console.log("API RESULT:", result);

      if (!Array.isArray(result) || result.length === 0) {
        alert("No recipes found in this range!");
        setFoodItems([]);
      } else {
        const mapped = result.map((item) => ({
          label: item.title,
          cal: item.calories,
          brand: `${item.carbs} carbs • ${item.fat} fat • ${item.protein} protein`,
        }));
        setFoodItems(mapped);
      }
    } catch (error) {
      console.error("API ERROR:", error);
      alert("Something went wrong, try again!");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Enter Calories Example: 250"
        style={styles.input}
        keyboardType="numeric"
      />

      {search !== "" && (
        <Button color={"black"} title="Search" onPress={performSearch} />
      )}

      {loading && <Text>Loading...</Text>}
      <FlatList
        data={foodItems}
        renderItem={({ item }) => <FoodListItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ gap: s(5) }}
      />
    </View>
  );
};

export default FoodSearch;

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
