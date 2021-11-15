import React from "react";
import { SafeAreaView, FlatList, View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import COLORS from "../consts/colors";
import styles from "../styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScr from "../screens/Settings";
import HelpScr from "../screens/Help";
import { FontAwesome } from "react-native-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Ingredients from "./Ingredients";
const Tab = createBottomTabNavigator();

export default function Channel() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require("../images/icons/home.png")}
              style={styles.icon}
            />
          ),
        }}
        name="Home"
        component={ChannelRoutes}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Help",
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require("../images/icons/help.png")}
              style={styles.icon}
            />
          ),
        }}
        name="Help"
        component={HelpScr}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require("../images/icons/settings.png")}
              style={styles.icon}
            />
          ),
        }}
        name="Settings"
        component={SettingsScr}
      />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();

function ChannelRoutes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Channel"
          component={ChannelScr}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Ingredient"
          component={Ingredients}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function ChannelScr({ navigation }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const resp = await fetch("https://api.sampleapis.com/coffee/hot");
    const data = await resp.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.channelList}>
      <Text
        style={styles.channelListText}
        onPress={() => navigation.navigate("Ingredient", { id: item.id })}
      >
        {item.title}
      </Text>

      {item.id == 2 ? (
        <FontAwesome name="check-circle" color="green" size={20} />
      ) : (
        <></>
      )}
      {item.id == 4 ? (
        <FontAwesome name="times-circle-o" color="red" size={20} />
      ) : (
        <></>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.siteName}>
        <Text style={styles.primaryText}>Coffee Bar</Text>
      </View>
      <View style={styles.headerTitle}>
        <Text style={{ fontSize: 20, color: COLORS.white }}>TYPES</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.channelcontainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          ></FlatList>
        </View>
      </View>
    </SafeAreaView>
  );
}
