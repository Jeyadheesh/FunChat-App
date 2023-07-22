import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";

const ChatBoxHeader = (props: any) => {
  //   console.log(props);
  const { navigation, route } = props;
  const { receiverName, receiverPhotoUrl } = route.params;
  // console.log("ChatBox : ", receiverName);

  return (
    <SafeAreaView className="h-[12vh] flex-row items-center  bg-white px-2 shadow shadow-black">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" color={"black"} size={22} />
      </TouchableOpacity>

      <View className="ml-2">
        {receiverPhotoUrl ? (
          <Image
            style={{
              borderWidth: 1,
              borderColor: "#5EBAB0",
            }}
            className="h-10 w-10  rounded-full bg-slate-200"
            source={{ uri: receiverPhotoUrl }}
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
      </View>
      <View className="ml-3 items-center">
        <Text className="text-xl font-bold text-blue-500">{receiverName} </Text>
      </View>
    </SafeAreaView>
  );
};

export default ChatBoxHeader;
