import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import useUser from "../store/useUser";
// import Drawer from "./Drawer";

const TabBarHeader = (props: any) => {
  const { navigation, route, options } = props;
  const { userData } = useUser();

  // console.log(route);

  function getHeaderTitle(route: any) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
    // console.log(routeName);

    switch (routeName) {
      case "chat":
        console.log("chat da");
        options.tabBarStyle.display = "flex";
        break;
      case "chatbox":
        console.log("chatbox da");
        options.tabBarStyle.display = "none";
        break;
      default:
        console.log("flex");
        options.tabBarStyle.display = "flex";

        break;
    }
  }

  // useEffect(() => {
  //   getHeaderTitle(route);
  // }, [route]);
  // console.log(options.tabBarStyle.display);

  return (
    <SafeAreaView className="h-[12vh] flex-row items-center justify-between bg-white px-5 shadow shadow-black">
      <View className="flex-row items-center gap-x-2 ">
        {/* <Drawer /> */}
        <Text className="text-2xl font-bold text-priClr">{route.name}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        {userData?.photoUrl ? (
          <Image
            style={{
              borderWidth: 1,
              borderColor: "#5EBAB0",
            }}
            className="h-10 w-10  rounded-full bg-slate-200"
            source={{ uri: userData?.photoUrl }}
          />
        ) : (
          <Image
            style={{
              borderWidth: 1,
              borderColor: "#5EBAB0",
            }}
            className="h-10 w-10  rounded-full bg-slate-200"
            source={require("../assets/profile.png")}
          />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TabBarHeader;
