import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  Image,
  View,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
import styles from "../styles";
import COLORS from "../consts/colors";
import { AntDesign } from "react-native-vector-icons";
import authContext from "../Context/context";

export default function Login({ navigation }) {
  const [data, setData] = useState({
    username: "",
    password: "",
    error_message: "",
  });

  const { setUserData } = useContext(authContext);

  const fetchLoginData = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.username, password: data.password }),
    };
    fetch("http://192.168.1.244:3000/authenticate/login", requestOptions)
      .then((response) => response.json())
      .then((resp) => {
        if (resp && resp.user) {
          console.log(resp.user);
          setUserData(resp.user);
          navigation.navigate("BarScr");
        } else {
          
           setData({
             ...data,
             error_message: resp.user,
           });
        }
      })
      .catch((ex) => {
        setData({
          ...data,
          error_message: ex.message || "Something went wrong. Try again later",
        });
      });
  };

  const textInputChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const loginSubmit = () => {
    if (data.password.length > 4 && data.username.length > 4) fetchLoginData();
    else {
      setData({
        ...data,
        error_message: "Invalid Username or Password",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 34,
            color: COLORS.white,
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 34,
            color: COLORS.white,
          }}
        >
          React Native
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.logincontainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="USER NAME"
                style={styles.input}
                onChangeText={(val) => textInputChange("username", val)}
              />
              {data.username && data.username.length > 4 ? (
                <AntDesign name="check" color="green" size={20} />
              ) : null}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="PASSWORD"
                style={styles.input}
                secureTextEntry
                onChangeText={(val) => textInputChange("password", val)}
              />
              {data.password && data.password.length > 4 ? (
                <AntDesign name="check" color="green" size={20} />
              ) : null}
            </View>
          </View>
          <View
            style={
              data.password.length > 4 && data.username.length > 4
                ? styles.btnActive
                : styles.btnPrimary
            }
          >
            <Text
              style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}
              onPress={() => loginSubmit()}
            >
              LOGIN
            </Text>
          </View>
          <View style={styles.center}>
            <Text style={{ color: "red" }}>{data.error_message}</Text>
          </View>
          <View style={styles.center}>
            <Text style={{ color: COLORS.black, paddingTop: 10 }}>
              Forgot Password?
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
