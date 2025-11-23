import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { s } from "react-native-size-matters";
import { useState } from "react";
import ExerciseListItem from "../components/ExerciseListItem";

const ExerciseSearch = () => {
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);

    try {
      const url = `https://musclewiki-api.p.rapidapi.com/search?q=${encodeURIComponent(
        search
      )}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "67179275d0msh6f3f9e14dc24dd3p18ce1ejsn66b0ebdd4054",
          "X-RapidAPI-Host": "musclewiki-api.p.rapidapi.com",
        },
      });

      const result = await response.json();
      console.log("API RESULT:", result);

      if (!Array.isArray(result) || result.length === 0) {
        alert("No exercises found!");
        setExercises([]);
      } else {
        const mapped = result.map((item) => ({
          label: item.name,
          muscles: item.primary_muscles?.join(", ") || "N/A",
          type: item.mechanic,
          difficulty: item.difficulty,
          force: item.force,
        }));

        setExercises(mapped);
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
        placeholder="Enter Exercise (e.g squat)"
        style={styles.input}
      />

      {search !== "" && (
        <Button color="black" title="Search" onPress={performSearch} />
      )}

      {loading && <Text>Loading...</Text>}

      <FlatList
        data={exercises}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ gap: s(8) }}
      />
    </View>
  );
};

export default ExerciseSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f8",
    padding: s(10),
    gap: s(10),
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: s(12),
    borderRadius: s(20),
  },
});
