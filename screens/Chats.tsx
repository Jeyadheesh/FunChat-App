import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { userSchema } from "../types";
import {
  and,
  collection,
  getDoc,
  getDocs,
  limit,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import useUser from "../store/useUser";
import { Pressable } from "react-native";
import ImageViewer from "../components/ImageViewer";
import ImageView from "react-native-image-viewing";
import { useIsFocused } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import ChatLoadingSkeleton from "../components/ChatLoadingSkeleton";
// import { isString } from "formik";

const Chats = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [users, setUsers] = useState<userSchema[] | any[]>([]);
  // const [updatedUser, setUpdatedUser] = useState<any[]>([]);
  const [lastMsgs, setLastMsgs] = useState<any[]>([]);
  const { userData } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<any>([]);

  const getUserDataHome = async () => {
    // console.log("in");
    try {
      setIsLoading(true);
      const usersQuery = query(
        collection(db, "users"),
        where("uid", "!=", userData?.uid)
      );

      const querySnapshot1 = await getDocs(usersQuery);
      let userArray: any[] = [];
      querySnapshot1.forEach(async (doc) => {
        doc.data().checkFriends?.forEach(async (e: any) => {
          if (e.herId == userData?.uid && e.type == "friend") {
            userArray.push(doc.data());
          }
        });
      });

      // console.log("userArray : ", userArray);

      setUsers(userArray);
      await getLastMsgs();
      // setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const getLastMsgs = async () => {
    setIsLoading(true);
    try {
      setLastMsgs([]);
      // let newUserArray: any[] = [];
      users.forEach(async (user) => {
        const lastMsgQuery = query(
          collection(db, "messages"),
          or(
            and(
              where("receiverUid", "==", user?.uid),
              where("senderUid", "==", userData?.uid)
            ),
            and(
              where("receiverUid", "==", userData?.uid),
              where("senderUid", "==", user?.uid)
            )
          ),
          orderBy("createdAt", "desc"),
          limit(1)
        );

        const lastMsgData = await getDocs(lastMsgQuery);

        if (lastMsgData.size == 0) {
          setLastMsgs((prev) => {
            // console.log("prev : ", prev);

            return [...prev, { lMsg: "noMsg" }];
          });
          // return "noMsg";
        } else {
          var lMsg = "";
          var lDate: any = "";
          var lTime = "";
          const last = lastMsgData.docs[0].data();
          // console.log("last : ", last);
          if (last.isString) {
            // console.log(last.message);
            lDate = moment(last.createdDate, "MMM DD, YYYY").format("DD/MM/YY");
            lTime = moment(last.createdTime, "hh:mm:ss a").format("hh:mm a");
            lMsg = last.message;
            // newUserArray.push({ lMsg, lDate, lTime });
            setLastMsgs((prev) => {
              // console.log("prev : ", prev);

              return [...prev, { lMsg: lMsg, lDate: lDate, lTime: lTime }];
            });
          } else {
            // lDate = new Date(last.createdDate).toDateString();
            lDate = moment(last.createdDate, "MMM DD, YYYY").format("DD/MM/YY");
            lTime = moment(last.createdTime, "hh:mm:ss a").format("hh:mm a");
            // newUserArray.push({ lMsg: "img", lDate, lTime });
            // return {
            //   ...user,
            //   lastMsg: {
            //     msg: last.message,
            //     date: last.createdDate,
            //     time: last.createdTime,
            //   },
            // };
            setLastMsgs((prev) => {
              // console.log("prev : ", prev);

              return [...prev, { lMsg: "img", lDate: lDate, lTime: lTime }];
            });
          }
        }
        // setLastMsgs(newUserArray);
        // setUpdatedUser(newUserArray);
        setIsLoading(false);
      });
      // console.log("newUserArray : ", newUserArray);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const handleImageView = (urii: any) => {
    console.log(urii);
    setVisible(true);
    setImages([
      {
        uri: urii,
      },
    ]);
  };

  useEffect(() => {
    getUserDataHome();

    // console.log("users ", users);
  }, [userData?.uid, isFocused]);

  // useEffect(() => {
  //   //  getLastMsgs();
  //   console.log("newUserArray : ", lastMsgs);
  // }, [lastMsgs]);

  useEffect(() => {
    // getLastMsgs();
  }, [userData?.uid, isFocused]);

  useEffect(() => {
    // console.log("last msgs : ", lastMsgs);
  }, [lastMsgs]);

  const todayDate = moment(new Date()).format("DD/MM/YY");
  const yesterdayDate = moment(new Date())
    .subtract(1, "days")
    .format("DD/MM/YY");

  useEffect(() => {
    // console.log(users);
    // console.log(yesterdayDate);
  }, []);

  return (
    <ScrollView className="borde mb-20 border-priClr  p-2.5">
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />

      {isLoading ? (
        // <ActivityIndicator
        //   size={"large"}
        //   color={"#A033CE"}
        //   className="mt-10 items-center justify-center"
        // />
        <ChatLoadingSkeleton />
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
              className=" flex-row rounded-lg mt-2.5 border border-gray-400 py-2.5"
            >
              <View className=" borde w-[20vw] border-black">
                {user?.photoUrl ? (
                  <TouchableOpacity
                    onPress={() => handleImageView(user.photoUrl)}
                    className=" m-auto h-16 w-16 rounded-full border border-gray-400 "
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
                  </TouchableOpacity>
                ) : (
                  <View className=" m-auto h-16 w-16 rounded-full border border-gray-400 ">
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

              <View className="ml-3 w-[55vw] overflow-hidden ">
                <Text className="mt-0 borde border-black text-lg font-bold text-blue-500">
                  {user.name}
                </Text>
                {lastMsgs[i]?.lMsg == "noMsg" ? (
                  ""
                ) : lastMsgs[i]?.lMsg == "img" ? (
                  <View className="flex-row gap-0.5">
                    <Text>
                      <MaterialIcons name="image" color={"gray"} size={20} />
                    </Text>
                    <Text className="w-full text-ellipsis text-sm text-gray-600">
                      Photo
                    </Text>
                  </View>
                ) : (
                  <Text className="w-full borde border-black text-ellipsis text-sm ">
                    {lastMsgs[i]?.lMsg}
                  </Text>
                )}
              </View>

              <View className="borde my-auto border-black">
                {lastMsgs[i]?.lDate && (
                  <Text className="text-xs">
                    {lastMsgs[i]?.lDate == todayDate
                      ? lastMsgs[i].lTime
                      : lastMsgs[i].lDate == yesterdayDate
                      ? "Yesterday"
                      : lastMsgs[i].lDate}
                  </Text>
                )}
                <Text className="mx-auto mt-2 rounded-full bg-green-400 p-1 px-2 text-xs text-white">
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
