import { View, Text, Pressable, Image } from "react-native";
import React, { useRef } from "react";
import style from "../public/style";

const Messages = ({ message, i, who, whoSpan }: any) => {
  //   const who = style.me;

  return (
    <View key={i}>
      {message.isString ? (
        <View
          //   ref={(el) => (refs.current[i] = el)}
          key={i}
          style={who}
          className="relative my-1 max-w-[70vw] rounded-lg bg-sky-300 p-2 shadow shadow-black"
        >
          <Text className="">{message.message}</Text>

          <View style={whoSpan} className=""></View>
          <Text style={style.time} className="text-right">
            {message.createdTime}
          </Text>
        </View>
      ) : (
        <Pressable
          //   ref={(el) => (refs.current[i] = el)}
          // onPress={() => setVisible(true)}
          key={i}
          style={who}
          className="relative my-1 max-h-56 w-[72vw]  rounded-lg p-2 pb-5"
        >
          <Image
            className="h-full w-full"
            resizeMode="cover"
            style={{
              borderRadius: 5,
              //   borderWidth: 1,
              //   borderColor: "red",
              //   marginBottom: 0,
            }}
            source={{
              uri: message.message,
            }}
          />

          {/* {visible && (
        <ImageViewer visible={visible} setVisible={setVisible} />
      )} */}
          <View style={whoSpan} className=""></View>
          <Text style={style.time} className="mt-0.5 text-right">
            {message.createdTime}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default Messages;
