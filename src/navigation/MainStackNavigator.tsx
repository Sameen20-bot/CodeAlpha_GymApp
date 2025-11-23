import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabs } from "./BottomTab";
import ExerciseSearch from "../screens/ExerciseSearch";
import FoodSearch from "../screens/FoodSearch";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="ExerciseSearch" component={ExerciseSearch} />
      <Stack.Screen name="FoodSearch" component={FoodSearch} />
    </Stack.Navigator>
  );
}


