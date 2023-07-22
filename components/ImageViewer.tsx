import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import ImageView from "react-native-image-viewing";
const Image1 = require("../assets/logo.png");

const ImageViewer = ({ visible, setVisible, uri }: any) => {
  // const [visible, setVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log("ImageViewer : ", uri);
  const images = [
    {
      uri: uri,
    },
  ];
  return (
    <View className="absolute top-0 z-10 h-full w-full items-center justify-center bg-white ">
      <View className="w-full ">
        {/* <Image
          resizeMode="contain"
          className=" h-full w-full"
          source={require("../assets/wel(2).png")}
        /> */}
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      </View>
    </View>
  );
};

export default ImageViewer;
