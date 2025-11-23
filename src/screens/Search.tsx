import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { s, vs } from "react-native-size-matters";

const Search = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={100} color="black" />
      <Text style={styles.iconText}>What do you want to find?</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("FoodSearch")}
      >
        <Ionicons name="fast-food" color="white" size={26} />

        <Text style={styles.text}>Food</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("ExerciseSearch")}
      >
        <Ionicons name="barbell" color="white" size={26} />
        <Text style={styles.text}>Exercise</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: s(10),
  },
  btn: {
    flexDirection: "row",
    gap: s(10),
    backgroundColor: "black",
    height: s(50),
    width: s(130),
    borderRadius: s(10),
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  text: {
    color: "white",
    fontSize: s(18),
  },
  iconText: {
    fontSize: s(18),
    color: "#555",
    textAlign: "center",
    marginBottom: s(20),
    fontWeight: "500",
  },
});

