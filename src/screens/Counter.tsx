import { StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState, useContext } from "react";
import { Accelerometer } from "expo-sensors";
import { s } from "react-native-size-matters";
import { AppContext } from "../../context/AppContext";
import LottieView from "lottie-react-native";

const Counter = () => {
  const CALORIES_PER_STEP = 0.05;

  const { steps, calories, setSteps, setCalories } = useContext(AppContext);

  const [isCounting, setCounting] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [lastTimeStamp, setLastTimeStamp] = useState(0);

  const animationRefRunning = useRef(null);
  const animationRefSitting = useRef(null);

  useEffect(() => {
    let subscription;
    Accelerometer.isAvailableAsync().then((result) => {
      if (result) {
        subscription = Accelerometer.addListener(({ y }) => {
          const threshold = 0.1;
          const timestamp = new Date().getTime();

          if (
            Math.abs(y - lastY) > threshold &&
            !isCounting &&
            timestamp - lastTimeStamp > 800
          ) {
            setCounting(true);
            setLastY(y);
            setLastTimeStamp(timestamp);

            const newSteps = steps + 1;
            setSteps(newSteps);
            setCalories(newSteps * CALORIES_PER_STEP);

            setTimeout(() => setCounting(false), 1200);
          }
        });
      } else {
        console.log("Accelerometer not available on this device");
      }
    });

    return () => {
      if (subscription) subscription.remove();
    };
  }, [isCounting, lastTimeStamp, lastY, steps, setSteps, setCalories]);

  const resetSteps = () => {
    setSteps(0);
    setCalories(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step Counter</Text>

      <View style={styles.infoContainer}>
        <View style={styles.stepsContainer}>
          <Text style={styles.stepsText}>{steps}</Text>
          <Text style={styles.stepsLabel}>Steps</Text>
        </View>

        <View style={styles.caloriesContainer}>
          <Text style={styles.caloriesLabel}>Estimated Calories Burned: </Text>
          <Text style={styles.caloriesText}>{calories.toFixed(2)} cal</Text>
        </View>
      </View>

      <Text style={styles.resetText} onPress={resetSteps}>
        Reset Steps
      </Text>
      <View style={styles.animationContainer}>
        {isCounting ? (
          <LottieView
            autoPlay
            ref={animationRefRunning}
            style={styles.animation}
            source={require("../../assets/Sweet run cycle.json")}
          />
        ) : (
          <LottieView
            autoPlay
            ref={animationRefSitting}
            style={styles.animation}
            source={require("../../assets/A dog was sitting wagging its tail..json")}
          />
        )}
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: s(28),
    marginBottom: s(20),
    fontWeight: "bold",
    color: "#333",
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: s(20),
  },
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: s(20),
  },
  stepsText: {
    fontSize: s(36),
    color: "#3498db",
    fontWeight: "bold",
    marginRight: s(8),
  },
  stepsLabel: {
    fontSize: s(24),
    color: "#555",
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: s(20),
  },
  caloriesLabel: {
    fontSize: s(20),
    color: "#555",
    marginRight: s(6),
  },
  caloriesText: {
    fontSize: s(18),
    color: "#e74c3c",
    fontWeight: "bold",
  },
  resetText: {
    fontSize: s(18),
    color: "#3498db",
    textDecorationLine: "underline",
    marginTop: s(20),
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: s(15),
    padding: s(20),
    marginBottom: s(20),
    elevation: 5,
    marginTop: s(20),
  },
  animation: {
    backgroundColor: "transparent",
    width: s(200),
    height: s(200),
  },
});


