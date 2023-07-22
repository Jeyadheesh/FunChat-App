import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Keyboard } from "react-native";
import Login from "../components/Login";
import Register from "../components/Register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import Chats from "./Chats";
import Explore from "./Explore";
import Profile from "./Profile";

import TabBar from "../components/TabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabDatas } from "../utils/jsonDatas";
import TabBarButton from "../components/TabBarButton";
import TabBarHeader from "../components/TabBarHeader";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import useUser from "../store/useUser";
import useLoader from "../store/useLoaders";
// import { getUserData } from "../utils/functions";

const Tab = createBottomTabNavigator();

const Home = ({ userId }: any) => {
  console.log("From Home : ", userId);
  const { userData, setUserData } = useUser();
  const { imgLoading, setImgLoading } = useLoader();

  function getHeaderTitle(route: any) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
    // console.log(routeName);

    switch (routeName) {
      case "Feed":
        return "flex";
      case "chat":
        return "flex";
      case "chatbox":
        return "none";
      case "imageViewer":
        return "none";
    }
  }

  const getUserData = async () => {
    try {
      console.log("in");
      // setImgLoading(true);
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
      console.log(docSnap.data());
      // setImgLoading(false);
    } catch (error) {
      console.log(error.message);
      setImgLoading(false);
    }
  };

  useEffect(() => {
    if (userData == null) getUserData();
    console.log("UserData :", userData?.name);
    // setImgLoading(false);
  }, [userData]);

  return (
    <Tab.Navigator
      initialRouteName="chats"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        // headerShown: false,
        tabBarStyle: {
          // backgroundColor: "#e5e7eb",
          display: getHeaderTitle(route),
          position: "absolute",
          bottom: 20,
          width: "90%",
          height: 55,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // padding: 2,
          left: "5%",
          right: "5%",
          // marginVertical: "auto",
          borderRadius: 20,
        },
      })}
    >
      {TabDatas.map((data, i) => {
        return (
          <Tab.Screen
            key={i}
            options={{
              header: (props) =>
                getHeaderTitle(props.route) == "flex" ? (
                  <TabBarHeader {...props} />
                ) : null,
              title: data.title,
              // tabBarLabelPosition: "beside-icon",
              // tabBarButton: (props) => <TabBarButton {...props} data={data} />,
              tabBarIcon: ({ focused, color, size }) => (
                <data.icon
                  name={focused ? data.activeIcon : data.inActiveIcon}
                  color={focused ? color : color}
                  size={25}
                  // style={}
                />
              ),
            }}
            name={data.name}
            component={data.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default Home;
