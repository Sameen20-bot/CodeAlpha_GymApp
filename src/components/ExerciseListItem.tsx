import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { s } from "react-native-size-matters";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ExerciseListItem = ({ item }: any) => {
  const { addExercise } = useContext(AppContext);

  const handleAddExercise = () => {
    addExercise(item); 
    alert(`${item.label} added!`); 
  };

  return (
    <View style={styles.exerciseCard}>
      <View style={{ flex: 1, gap: s(4) }}>
        <Text style={styles.title}>{item.label}</Text>
        <Text style={styles.text}>🎯 Muscles: {item.muscles}</Text>
        <Text style={styles.text}>⚙️ Type: {item.type}</Text>
        <Text style={styles.text}>📊 Difficulty: {item.difficulty}</Text>
        <Text style={styles.text}>💪 Force: {item.force}</Text>
      </View>

      <TouchableOpacity onPress={handleAddExercise}>
        <AntDesign name="plus-circle" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default ExerciseListItem;

const styles = StyleSheet.create({
  exerciseCard: {
    backgroundColor: "#e5e5e5",
    padding: s(12),
    borderRadius: s(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: s(16),
  },
  text: {
    color: "dimgray",
    fontSize: s(12),
  },
});


