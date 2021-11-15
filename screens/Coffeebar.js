import React, { useContext } from "react";
import { SafeAreaView, FlatList, View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import COLORS from "../consts/colors";
import styles from "../styles";
import { FontAwesome } from "react-native-vector-icons";

import authContext from "../Context/context";

export default function Coffeebar({ navigation, users: user }) {
  const [data, setData] = useState([]);

  const { userData, setUserData } = useContext(authContext);
  useEffect(() => {
    if (userData.user_id) {
      fetchData(userData.user_id);
    }
  }, [userData]);

  const fetchData = async (userid) => {
    const resp = await fetch(
      `https://my-json-server.typicode.com/kristalis/db/coffeebar?userid=${userid}`
    );
    const data = await resp.json();
    setData(data);
  };

  const renderItem = ({ item }) => (
    <View style={styles.channelList}>
      <Text
        style={styles.channelListText}
        onPress={() => navigation.navigate("Channel")}
      >
        {item.name}
      </Text>

      {item.status == 1 ? (
        <FontAwesome name="check-circle" color="green" size={20} />
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.siteName}>
        <Text style={styles.primaryText}>WELCOME</Text>
      </View>
      <View style={styles.headerTitle}>
        <Text style={{ fontSize: 20, color: COLORS.white }}>COFFEE BAR</Text>
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
