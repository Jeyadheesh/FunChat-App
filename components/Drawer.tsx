import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Explore from "../screens/Explore";
import Profile from "../screens/Profile";

const Drawerr = createDrawerNavigator();

const Drawer = () => {
  return (
    <Drawerr.Navigator>
      <Drawerr.Screen name="Explore" component={Explore} />
      <Drawerr.Screen name="Profile" component={Profile} />
    </Drawerr.Navigator>
  );
};

export default Drawer;
