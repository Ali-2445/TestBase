import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import COLORS from "../consts/colors";
import styles from "../styles";
import { TabView, SceneMap } from "react-native-tab-view";
import { TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from "react-native-vector-icons";
import authContext from "../Context/context";
import { io } from "socket.io-client";

const socket = io("http://192.168.18.62:3001");

export default function Ingredients({ route, navigation }) {
  const [track, setTrack] = useState();
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchData(2);
    fetchIceCoffeData();
    socket.on("trackCreated", (data) => {
      setTitle(data["title"]);
    });
    socket.on("trackUpdated", (data) => {
      setTrack(data);
      setTitle(data["title"]);
    });
    return () => socket.removeListener("counter");
  }, []);

  const [data, setData] = useState({
    ingredients: [],
  });
  const [icedList, setIcedList] = useState();
  const { userData, setUserData } = useContext(authContext);

  const layout = useWindowDimensions();

  const fetchData = async (id) => {
    const resp = await fetch(`https://api.sampleapis.com/coffee/hot/${id}`);
    const data = await resp.json();
    console.log(data);
    setData(data);
  };

  const fetchIceCoffeData = async () => {
    const resp = await fetch(`https://api.sampleapis.com/coffee/iced`);
    const data = await resp.json();
    console.log(data);
    setIcedList(data);
  };
  useEffect(() => {
    fetchData(2);
    fetchIceCoffeData();
  }, [userData]);
  const renderScene = SceneMap({
    hot: () => <IngredientList data={data.ingredients} />,
    cold: () => <IcedMenu data={icedList} />,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "hot", title: "Hot Coffee" },
    { key: "cold", title: "Cold Coffee" },
  ]);
  const _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{
                flex: 1,
                alignItems: "center",
                padding: 16,
                backgroundColor: index == i ? COLORS.dark : COLORS.playing,
              }}
              onPress={() => setIndex(i)}
            >
              <Text
                style={{
                  color: index == i ? COLORS.white : COLORS.black,
                  fontSize: 20,
                }}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  var radio_props = [{ value: 0 }];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          paddingTop: 20,
          flexDirection: "row",
          paddingBottom: 20,
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <AntDesign
          name="left"
          color={COLORS.playing}
          size={20}
          style={{ marginLeft: 10 }}
        />
        <Text
          style={{
            ...styles.primaryText,
            textAlign: "center",
            flexBasis: "90%",
          }}
        >
          Coffee Bar
        </Text>
      </View>
      <View style={styles.headerTitle}>
        <Text style={{ fontSize: 20, color: COLORS.white }}>{data.title}</Text>
      </View>
      <TabView
        style={{ width: "100%" }}
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={_renderTabBar}
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.dark,
          paddingLeft: 50,
          paddingTop: 10,
          paddingBottom: 10,
          bottom: 0,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            flexBasis: "50%",
            textAlign: "left",
          }}
        >
          Serving
        </Text>
        <Text
          style={{
            color: COLORS.white,
            flexBasis: "40%",
            textAlign: "right",
          }}
        >
          {data.title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.dark,
          paddingLeft: 50,
          paddingTop: 15,
          marginTop: 1,
          paddingBottom: 15,
          bottom: 0,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            flexBasis: "70%",
            textAlign: "left",
          }}
        >
          {title}
        </Text>
        <TouchableOpacity
          style={{ flexBasis: "13%", alignItems: "flex-start" }}
        >
          <Text style={{ color: COLORS.white }}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexBasis: "12%", alignItems: "flex-end" }}>
          <Text style={{ color: COLORS.white }}>Play</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
}

function IcedMenu({ data }) {
  const renderItem = ({ item }) => (
    <View style={{ ...styles.channelList, backgroundColor: COLORS.playing }}>
      <Text style={styles.channelListText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.channelcontainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, i) => i.toString()}
        ></FlatList>
      </View>
    </View>
  );
}

function IngredientList({ onPress, data }) {
  const renderItem = ({ item }) => (
    <View style={styles.channelList}>
      <Text style={styles.channelListText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.channelcontainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, i) => i.toString()}
        ></FlatList>
      </View>
    </View>
  );
}
