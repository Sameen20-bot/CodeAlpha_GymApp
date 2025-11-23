import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Exercise = {
  label: string;
  muscles: string;
  type: string;
  difficulty: string;
  force: string;
};

type Food = {
  label: string;
  cal: number;
  brand: string;
};

type AppContextType = {
  steps: number;
  calories: number;
  exercises: Exercise[];
  foodItems: Food[];
  setSteps: (steps: number) => void;
  setCalories: (calories: number) => void;
  addExercise: (exercise: Exercise) => void;
  addFood: (food: Food) => void;
  resetSteps: () => void;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [foodItems, setFoodItems] = useState<Food[]>([]);

  const EXERCISES_KEY = "@exercises";
  const FOOD_KEY = "@foodItems";
  const STEPS_KEY = "@steps";
  const CALORIES_KEY = "@calories";

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedExercises = await AsyncStorage.getItem(EXERCISES_KEY);
        const savedFood = await AsyncStorage.getItem(FOOD_KEY);
        const savedSteps = await AsyncStorage.getItem(STEPS_KEY);
        const savedCalories = await AsyncStorage.getItem(CALORIES_KEY);

        if (savedExercises) setExercises(JSON.parse(savedExercises));
        if (savedFood) setFoodItems(JSON.parse(savedFood));
        if (savedSteps) setSteps(Number(savedSteps));
        if (savedCalories) setCalories(Number(savedCalories));
      } catch (e) {
        console.log("Error loading saved data:", e);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveExercises = async () => {
      try {
        await AsyncStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
      } catch (e) {
        console.log("Error saving exercises:", e);
      }
    };
    saveExercises();
  }, [exercises]);

  useEffect(() => {
    const saveFood = async () => {
      try {
        await AsyncStorage.setItem(FOOD_KEY, JSON.stringify(foodItems));
      } catch (e) {
        console.log("Error saving food items:", e);
      }
    };
    saveFood();
  }, [foodItems]);

  useEffect(() => {
    const saveSteps = async () => {
      try {
        await AsyncStorage.setItem(STEPS_KEY, steps.toString());
      } catch (e) {
        console.log("Error saving steps:", e);
      }
    };
    saveSteps();
  }, [steps]);

  useEffect(() => {
    const saveCalories = async () => {
      try {
        await AsyncStorage.setItem(CALORIES_KEY, calories.toString());
      } catch (e) {
        console.log("Error saving calories:", e);
      }
    };
    saveCalories();
  }, [calories]);

  const addExercise = (exercise: Exercise) =>
    setExercises((prev) => [exercise, ...prev]);

  const addFood = (food: Food) => setFoodItems((prev) => [food, ...prev]);

  const resetSteps = () => {
    setSteps(0);
    setCalories(0);
  };

  return (
    <AppContext.Provider
      value={{
        steps,
        calories,
        exercises,
        foodItems,
        setSteps,
        setCalories,
        addExercise,
        addFood,
        resetSteps,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
