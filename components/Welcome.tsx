import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../public/style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Welcome = ({ navigation }: any) => {
  return (
    <SafeAreaView className="flex-1 justify-evenly">
      <View>
        <Text
          style={style.textShadow}
          className="text-center text-3xl font-bold text-priClr "
        >
          Fun <Text className="text-blue-500">Chat !</Text>
        </Text>
        <Text className="mt-3 px-4  text-center text-base opacity-60">
          Enter a world of laughter, conversations, and endless fun. Welcome to
          FunChat! 🎉
        </Text>
        {/* <Text className="text-center text-base  opacity-60"> */}
        {/* </Text> */}
      </View>

      <View className=" h-[45vh] w-full items-center justify-center">
        <Image
          resizeMode="contain"
          className="w-full"
          source={require("../assets/wel(7).png")}
        />
      </View>

      <View className="borde  border-priClr">
        <TouchableOpacity
          onPress={() => navigation.replace("login")}
          className="mx-3 mt-16  flex-row justify-between rounded-lg bg-priClr  p-3 px-4"
        >
          <Text className="text-lg font-bold text-white">Get Started</Text>
          <View className="my-auto">
            <FontAwesome5 name="angle-right" color={"white"} size={25} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
