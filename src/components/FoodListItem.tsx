import { StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { s, vs } from "react-native-size-matters";


const FoodListItem = ({item}) => {
  return (
    <View style={styles.foodComponent}>
      <View style={{ flex: 1, gap: s(5) }}>
        <Text style={styles.foodTitle}>{item.label}</Text>
        <Text style={styles.foodText}>
          {item.cal} cal, {item.brand}
        </Text>
      </View>
      <AntDesign name="plus-circle" size={24} color="royalblue" />
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
  },
  foodText: {
    color: "dimgray",
  },
});
