import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as SystemUI from "expo-system-ui";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Auth from "./screens/Auth";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useColorScheme } from "nativewind";
import {
  ActivityIndicator,
  Button,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Dark from "react-native-vector-icons/Fontisto";
import Light from "react-native-vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";

import { io } from "socket.io-client";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { ScrollView } from "react-native-gesture-handler";
import style from "./public/style";
// const socket: any = io("http://192.168.43.188:9000", {
//   transports: ["websocket"],
// });

const App = () => {
  const Stack = createNativeStackNavigator();
  // console.log(socket.id);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        setUserId(user.uid);
        console.log("From App : ", user.uid);
      } else {
        setUserId(null);
        console.log("User Not Valid");
        // const color = await SystemUI.getBackgroundColorAsync();
        // console.log(color);
      }
      setIsLoading(true);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    // console.log("App : ", colorScheme);
    // setColorScheme("dark");`
  }, [colorScheme]);

  // useEffect(() => {
  //   // controlTheme();
  //   console.log(colorScheme);
  // }, [colorScheme]);

  // const user = false;

  return (
    <NavigationContainer>
      {/* <ScrollView className="flex flex-col flex-1"> */}
      {/* <View className={`${colorScheme == "dark" ? style.dark : style.light}`}>
        <Text
          className={`${
            colorScheme === "dark" ? style.dark : style.light
          } text-2xl mt-10`}
        >
          Hai bro
        </Text>
      </View>
      <Switch onChange={toggleColorScheme} value={colorScheme == "dark"} /> */}

      {isLoading ? (
        userId ? (
          <Home userId={userId} />
        ) : (
          // <SafeAreaView>
          //   <View className=" bg-red-600 text-red-500 dark:bg-blue-500">
          //     <View className="h-10">
          //       <Button onPress={toggleColorScheme} title="btn" />
          //     </View>
          //     <Auth />
          //   </View>
          // </SafeAreaView>
          <Auth />
        )
      ) : (
        <ActivityIndicator
          className="m-auto h-32 w-32 text-xl"
          size={"large"}
          color={"#A033CE"}
        />
      )}
      {/* </ScrollView> */}

      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
