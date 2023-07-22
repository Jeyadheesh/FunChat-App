import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chats from "../screens/Chats";
import ChatBox from "../screens/ChatBox";
import ChatBoxHeader from "./ChatBoxHeader";
import ImageViewer from "./ImageViewer";

const ChattStack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <ChattStack.Navigator>
      <ChattStack.Screen
        options={{ headerShown: false }}
        name="chat"
        component={Chats}
      />
      <ChattStack.Screen
        options={{
          header: (props) => <ChatBoxHeader {...props} />,
        }}
        name="chatbox"
        component={ChatBox}
      />
      {/* <ChattStack.Screen
        options={{
          header: (props) => <ChatBoxHeader {...props} />,
        }}
        name="imageViewer"
        component={ImageViewer}
      /> */}
    </ChattStack.Navigator>
  );
};

export default ChatStack;
