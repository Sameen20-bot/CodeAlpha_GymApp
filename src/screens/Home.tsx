import { StyleSheet, Text, View, FlatList } from "react-native";
import { s, vs } from "react-native-size-matters";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Home = () => {
  const { steps, calories, exercises, foodItems } = useContext(AppContext);

  const combinedData = [
    { type: "steps" },
    { type: "exercises", data: exercises },
    { type: "food", data: foodItems },
  ];

  const renderItem = ({ item }: any) => {
    if (item.type === "steps") {
      return (
        <View style={styles.cardHighlight}>
          <Text style={styles.cardTitle}>Today Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{steps}</Text>
              <Text style={styles.statLabel}>Steps</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{calories.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>
        </View>
      );
    }

    if (item.type === "exercises") {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏋️ Logged Exercises</Text>
          {item.data.length === 0 ? (
            <Text style={styles.emptyText}>No exercises logged yet</Text>
          ) : (
            <FlatList
              data={item.data}
              keyExtractor={(_, index) => index.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  <Text style={styles.itemSub}>
                    {item.muscles} • {item.type}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      );
    }

    if (item.type === "food") {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍎 Logged Food</Text>
          {item.data.length === 0 ? (
            <Text style={styles.emptyText}>No food logged yet</Text>
          ) : (
            <FlatList
              data={item.data}
              keyExtractor={(_, index) => index.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.itemLabel}>
                    {item.label} ({item.cal} cal)
                  </Text>
                  <Text style={styles.itemSub}>{item.brand}</Text>
                </View>
              )}
            />
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <FlatList
      style={styles.container}
      data={combinedData}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{
        padding: s(15),
        gap: vs(20),
        paddingBottom: vs(30),
      }}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: s(16),
    padding: s(16),
    borderWidth: 1,
    borderColor: "#000",
  },
  cardHighlight: {
    backgroundColor: "#000",
    borderRadius: s(20),
    padding: s(18),
  },
  cardTitle: {
    fontSize: s(18),
    fontWeight: "700",
    marginBottom: vs(12),
    color: "#000",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    backgroundColor: "#fff",
    borderRadius: s(14),
    padding: s(14),
    width: "48%",
    alignItems: "center",
  },
  statNumber: {
    fontSize: s(22),
    fontWeight: "bold",
    color: "#000",
  },
  statLabel: {
    fontSize: s(14),
    color: "#555",
  },
  emptyText: {
    fontSize: s(14),
    color: "#888",
    fontStyle: "italic",
  },
  listItem: {
    paddingVertical: vs(8),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemLabel: {
    fontSize: s(16),
    fontWeight: "600",
    color: "#000",
  },
  itemSub: {
    fontSize: s(13),
    color: "#666",
  },
});
