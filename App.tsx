import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Auth from "./screens/Auth";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useColorScheme } from "nativewind";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import Dark from "react-native-vector-icons/Fontisto";
import Light from "react-native-vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";

import { io } from "socket.io-client";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
// const socket: any = io("http://192.168.43.188:9000", {
//   transports: ["websocket"],
// });

const App = () => {
  const Stack = createNativeStackNavigator();
  // console.log(socket.id);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        setUserId(user.uid);
        console.log("From App : ", user.uid);
      } else {
        setUserId(null);
        console.log("User Not Valid");
      }
      setIsLoading(true);
    });
  }, []);

  // const user = false;

  return (
    <NavigationContainer>
      {isLoading ? (
        userId ? (
          <Home userId={userId} />
        ) : (
          <Auth />
        )
      ) : (
        <ActivityIndicator
          className="m-auto h-32 w-32 text-xl"
          size={"large"}
          color={"#A033CE"}
        />
      )}

      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
