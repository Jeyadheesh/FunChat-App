import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { userSchema } from "../types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import useUser from "../store/useUser";
import { Pressable } from "react-native";
import ImageViewer from "../components/ImageViewer";
import { v4 } from "uuid";
import ImageView from "react-native-image-viewing";

const Chats = ({ navigation }: any) => {
  const [users, setUsers] = useState<Array<userSchema | []>>([]);
  const { userData, setUserData } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const usersRef = collection(db, "users");

  const getUserData = async () => {
    console.log("in");
    try {
      setIsLoading(true);
      const q1 = query(
        collection(db, "users"),
        where("uid", "!=", userData.uid)
      );

      const querySnapshot1 = await getDocs(q1);
      // const querySnapshot2 = await getDocs(q2);
      let userArray: any = [];
      querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        userArray.push(doc.data());
      });
      setUsers(userArray);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  let images: any;
  const showImage = (imageUrl) => {
    try {
      images = [
        {
          uri: imageUrl,
        },
      ];
      // imgUri = imageUrl;
      setVisible(true);
      console.log(imgUri);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLastMsg = () => {
    try {
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserData();
    // console.log(v4());
  }, [userData?.uid]);

  return (
    <ScrollView className="borde mb-20 border-priClr">
      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          color={"#A033CE"}
          className="mt-10 items-center justify-center"
        />
      ) : (
        users.map((user, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() =>
                navigation.navigate("chatbox", {
                  receiverName: user.name,
                  receiverPhotoUrl: user.photoUrl,
                  receiverUid: user.uid,
                  curUserUid: userData?.uid,
                  curUserName: userData?.name,
                })
              }
              className="h-20 flex-row  border-b border-b-priClr px-1"
            >
              <View className=" borde w-[20vw] border-black">
                {user?.photoUrl ? (
                  <Pressable
                    // onPress={() => showImage(user.photoUrl)}
                    className=" m-auto h-16 w-16 rounded-full border border-priClr "
                  >
                    <Image
                      style={{
                        borderRadius: 50,
                        borderWidth: 1,
                        // borderColor: "#5EBAB0",
                      }}
                      className="h-full w-full "
                      source={{ uri: user?.photoUrl }}
                    />
                    <ImageView
                      images={[{ uri: user.photoUrl }]}
                      imageIndex={0}
                      visible={visible}
                      onRequestClose={() => setVisible(false)}
                    />
                  </Pressable>
                ) : (
                  <View className=" m-auto h-16 w-16 rounded-full border border-priClr ">
                    <Image
                      style={{
                        borderRadius: 50,
                        borderWidth: 1,
                        // borderColor: "#5EBAB0",
                      }}
                      className="h-full w-full "
                      source={require("../assets/profile.png")}
                    />
                  </View>
                )}
              </View>

              <View className="ml-3 w-[60vw] overflow-hidden ">
                <Text className="mt-2 text-lg font-bold text-blue-500">
                  {user.name}
                </Text>
                <Text className="w-full text-ellipsis text-sm">
                  Lorem ipsum dolor sit, ametLorem ipsum dolor sit
                </Text>
              </View>

              <View className="borde my-auto border-black">
                <Text className="text-xs">12:03 Pm</Text>
                <Text className="mx-auto mt-1 rounded-full bg-green-400 p-1 px-2 text-xs text-white">
                  3
                </Text>
              </View>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );
};

export default Chats;
