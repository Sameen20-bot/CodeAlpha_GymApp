import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { s } from "react-native-size-matters";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const FoodListItem = ({ item }) => {
  const { addFood } = useContext(AppContext);

  const handleAddFood = () => {
    addFood(item);
    alert(`${item.label} added!`);
  };

  return (
    <View style={styles.foodComponent}>
      <View style={{ flex: 1, gap: s(5) }}>
        <Text numberOfLines={1} style={styles.foodTitle}>
          {item.label}
        </Text>
        <Text style={styles.foodText}>
          {item.cal} cal, {item.brand}
        </Text>
      </View>

      <TouchableOpacity onPress={handleAddFood}>
        <AntDesign name="plus-circle" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default FoodListItem;

const styles = StyleSheet.create({
  foodComponent: {
    backgroundColor: "gainsboro",
    padding: s(10),
    borderRadius: s(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodTitle: {
    fontWeight: "bold",
    fontSize: s(16),
    width: s(250),
  },
  foodText: {
    color: "dimgray",
  },
});
