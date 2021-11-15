import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Dimensions,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import AuthService from "../../service/AuthService";
import TrackService from "../../service/TrackService";
import Button from "../../components/Button";
import Item from "../../components/Item";

import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
const Height = Dimensions.get("window").height;

const Track = ({ route, navigation }) => {
  const [track, setTrack] = useState(route.params);
  const [isPlay, setIsPlay] = useState(true);

  useEffect(() => {
    socket.on("trackUpdated", (data) => {
      console.log(data);
      setTrack(data);
    });
    socket.on("trackCreated", (data) => {
      console.log(data);
    });
    return () => socket.removeListener("counter");
  }, []);

  const onPause = useCallback(
    () =>
      TrackService.pause(track.playlist_uid).then((data) =>
        setIsPlay(!data.pause)
      ),
    [track]
  );
  const onSkip = useCallback(
    () => TrackService.skip(track.playlist_uid),
    [track]
  );

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            flex: 1,
          }}
        >
          <View onPress={() => {}} style={styles.sectionContainer}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "brown" }}>
                {track.location}
              </Text>
            </View>
            <Item heading={"Track Title"} text={track.title} />
            <Item heading={"Track Position"} text={track.position} />
            <Item heading={"Track Duration"} text={track.duration} />

            <Button onPress={onPause} text={isPlay ? "Pause" : "Play"} />
            <Button onPress={onSkip} text={"Skip"} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    height: Height * 0.82,
    margin: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Track;
