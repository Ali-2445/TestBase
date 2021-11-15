import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import Channel from "./screens/Channel";
import BarScr from "./screens/Coffeebar";
import Ingredient from "./screens/Ingredients";

import authContext from "./Context/context";

const Stack = createStackNavigator();

export default function App() {
  const [userData, setUserData] = useState();
  return (
    <authContext.Provider value={{ userData, setUserData }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Ingredient"}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Channel"
            component={Channel}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BarScr"
            component={BarScr}
          />
          <Stack.Screen
            options={{ headerShorwn: false }}
            name="Ingredient"
            component={Ingredient}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </authContext.Provider>
  );
}
