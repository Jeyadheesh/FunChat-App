import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc as fireDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import useUser from "../store/useUser";
import { userSchema } from "../types";
import UserRelation from "../components/UserRelation";

const Explore = ({ navigation }: any) => {
  const [users, setUsers] = useState<Array<userSchema | []>>([]);
  const [curUser, setCurUser] = useState<Array<userSchema | []>>([]);
  const { userData, setUserData } = useUser();
  const [friendsStatus, setFriendsStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const usersRef = collection(db, "users");

  const getUserData = async () => {
    console.log("in in");
    try {
      // setUsers([])
      setIsLoading(true);
      const q = query(
        collection(db, "users")
        // where("uid", "!=", userData?.uid)
      );
      const querySnapshot = await getDocs(q);
      let userArray: any = [];

      let userFriendsStatus: any = [];
      // onSnapshot(q, (snapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log("check : ", doc.id, " => ", doc.data());
        if (userData?.uid != doc.data().uid) userArray.push(doc.data());
        else setCurUser(doc.data());
        // if(doc.data().c)
        // doc.data().checkFriends?.forEach((e: any) => {
        //   if (e.userId == userData?.uid) {
        //     console.log("works")
        //     userFriendsStatus.push(e);
        //   } else {
        //     userFriendsStatus.push({
        //       type: "none"
        //     })
        //   }
        // })
      });
      // })
      setUsers(userArray);
      setFriendsStatus(userFriendsStatus);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // setUsers([]);
    if (users.length == 0) getUserData();
    // console.log("friends Status :", users);
    console.log("CurUser :", curUser);
    // users.map((user) => {
    //   return console.log(user.name)
    // })
  }, [curUser]);

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
            <View
              key={i}
              className="h-20 flex-row  border-b border-b-priClr px-1"
            >
              <View className=" borde w-[20vw] border-black">
                <View className=" m-auto h-16 w-16 rounded-full border border-priClr ">
                  {user?.photoUrl ? (
                    <Image
                      style={{
                        borderRadius: 50,
                        borderWidth: 1,
                        // borderColor: "#5EBAB0",
                      }}
                      className="h-full w-full "
                      source={{ uri: user?.photoUrl }}
                    />
                  ) : (
                    <Image
                      style={{
                        borderRadius: 50,
                        borderWidth: 1,
                        // borderColor: "#5EBAB0",
                      }}
                      className="h-full w-full "
                      source={require("../assets/profile.png")}
                    />
                  )}
                </View>
              </View>

              <View className="borde  ml-3 w-[45vw] overflow-hidden border-black">
                <Text className="mt-5 text-lg font-bold text-blue-500">
                  {user?.name}
                </Text>
              </View>

              <UserRelation
                user={user}
                userData={userData}
                friendsStatus={friendsStatus}
                getUserData={getUserData}
                curUser={curUser}
                navigation={navigation}
              />

              {/* <TouchableOpacity className="m-auto flex-row rounded bg-green-500 p-1.5 px-2.5">
      <Text className="mr-1  font-bold text-white">Friends</Text>
      <View className="my-auto">
        <MaterialCommunityIcons
          name="account-check"
          color={"white"}
          size={18}
        />
      </View>
    </TouchableOpacity> */}
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

export default Explore;
