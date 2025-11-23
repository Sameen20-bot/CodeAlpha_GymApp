import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { vs, s } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import Counter from "../screens/Counter";
import Search from "../screens/Search";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          paddingBottom: s(14),
          height: s(70),
        },
        tabBarLabelStyle: {
          fontSize: s(12),
          marginTop: vs(4),
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
          title: "Search",
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          title: "Home",
        }}
        name="Home"
        component={Home}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" color={color} size={size} />
          ),
          title: "Counter",
        }}
        name="Counter"
        component={Counter}
      />
    </Tab.Navigator>
  );
};
