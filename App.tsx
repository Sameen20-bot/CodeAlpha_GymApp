import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppProvider>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
