import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../config/firebase";

const UserRelation = ({
  navigation,
  user,
  userData,
  friendsStatus,
  getUserData,
  curUser,
}: any) => {
  const [friendsUid, setFriendsUid] = useState([]);
  const [requestUid, setRequestUid] = useState([]);
  let filteredUsers;
  const manageUserStatus = () => {
    try {
      // console.log("User : ", user.checkFriends);
      // console.log(userData.uid)
      let arr = [];
      let filteredUsers = user?.checkFriends?.filter((e: any) => {
        // console.log(e.userId, " -> ", userData?.uid);
        return e.herId == userData?.uid;
        // console.log(e.userId, " -> ", userData?.uid);

        // console.log(e)
        // if (e.userId == userData?.uid && e.type == "request") {
        //   console.log(e.userId, " -> ", userData?.uid);
        //   // setRequestUid((prev) => [...prev, e.userId]);
        //   console.log("request");
        // } else if (e.userId == userData?.uid && e.type == "friend") {
        //   console.log(e.userId, " -> ", userData?.uid);
        //   // setFriendsUid((prev) => [...prev, e.userId]);
        //   console.log("friend");
        // } else {
        //   console.log("false");
        // }
      });
      // console.log("Array : ", filteredUsers)
      setFriendsUid(filteredUsers);
      // setFriendsUid((prev) => [...prev, ...arr])
    } catch (error) {
      console.log("mus : ", error.message);
    }
  };

  const handleTest = () => {
    navigation.navigate("chat");
  };

  const handleAccept = async (user: any) => {
    try {
      const userDoc = doc(db, "users", user.uid);
      const curUserDoc = doc(db, "users", curUser.uid);
      console.log(user);
      // await updateDoc(docRef, {
      //   // checkFriend:
      // })

      const userFilterData = user.checkFriends.filter((e: any) => {
        return e.herId != curUser.uid;
      });
      console.log(userFilterData);

      const curUserFilterData = curUser.checkFriends.filter((e: any) => {
        return e.herId != user.uid;
      });
      console.log(curUserFilterData);

      await updateDoc(userDoc, {
        checkFriends: [
          ...userFilterData,
          {
            type: "friend",
            herId: curUser.uid,
            index: user.checkFriends?.length,
          },
        ],
      });

      await updateDoc(curUserDoc, {
        checkFriends: [
          ...curUserFilterData,
          {
            type: "friend",
            herId: user.uid,
            index: curUser.checkFriends?.length,
          },
        ],
      });

      getUserData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const receiverDataChange = async (user: any) => {
    try {
      const docRef = doc(db, "users", curUser.uid);
      if (
        curUser.checkFriends?.length != 0 &&
        curUser.checkFriends != undefined
      ) {
        console.log("irukku new");
        await updateDoc(docRef, {
          checkFriends: arrayUnion({
            type: "request",
            herId: user.uid,
            index: curUser.checkFriends?.length,
          }),
        });
      } else {
        console.log(user);
        await updateDoc(docRef, {
          checkFriends: [
            {
              type: "request",
              herId: user.uid,
              index: 0,
            },
          ],
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSendRequest = async (user: any) => {
    try {
      const docRef = doc(db, "users", user.uid);
      console.log(
        user.checkFriends?.length != 0 && user.checkFriends != undefined
      );
      if (user.checkFriends?.length != 0 && user.checkFriends != undefined) {
        console.log("irukku");
        await updateDoc(docRef, {
          checkFriends: arrayUnion({
            type: "fromRequest",
            herId: userData.uid,
            index: user.checkFriends?.length,
          }),
        });
      } else {
        console.log(user);
        await updateDoc(docRef, {
          checkFriends: [
            {
              type: "fromRequest",
              herId: userData.uid,
              index: 0,
            },
          ],
        });
      }
      await receiverDataChange(user);
      getUserData();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // setFriendsUid([]);
    // setRequestUid([]);
    manageUserStatus();
    // console.log("Friends Array : ", friendsStatus);
  }, []);

  return (
    <View>
      {user?.checkFriends ? (
        <View className="my-auto w-full">
          {friendsUid.length != 0 ? (
            friendsUid.map((ee: any, i) => {
              return (
                <View key={i} className="w-full">
                  {ee.type == "friend" && (
                    <TouchableOpacity
                      onPress={handleTest}
                      key={i}
                      className="m-auto text-center flex-row w-[100px] rounded bg-green-500 p-1.5 px-2.5"
                    >
                      <Text className="mr-1 mx-auto font-bold text-white">
                        Friends
                      </Text>
                      <View className="my-auto mx-auto">
                        <Ionicons name="checkmark" color={"white"} size={18} />
                      </View>
                    </TouchableOpacity>
                  )}

                  {ee.type == "fromRequest" && (
                    <View className="m-auto  w-[100px] flex-row rounded bg-secClr p-1.5 px-2.5">
                      <Text className="mr-1 text-xs font-bold text-white">
                        Requested
                      </Text>
                      <View className="my-auto">
                        <Ionicons name="share" color={"white"} size={15} />
                      </View>
                    </View>
                  )}

                  {ee.type == "request" && (
                    <TouchableOpacity
                      onPress={() => handleAccept(user)}
                      className="m-auto  w-[100px] flex-row rounded  bg-green-400 p-1.5 px-2.5"
                    >
                      <Text className="mr-1 text-xs font-bold text-white">
                        Accept ?
                      </Text>
                      <View className="my-auto">
                        <FontAwesome
                          name="thumbs-up"
                          color={"white"}
                          size={15}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          ) : (
            <TouchableOpacity
              onPress={() => handleSendRequest(user)}
              className="m-auto  w-[100px] flex-row rounded bg-actClr p-1.5 px-2.5"
            >
              <Text className="mr-1 font-bold text-white">Request</Text>
              <View className="my-auto">
                <Ionicons name="add-sharp" color={"white"} size={19} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => handleSendRequest(user)}
          className="m-auto  w-[100px] flex-row rounded bg-actClr p-1.5 px-2.5"
        >
          <Text className="mr-1 font-bold text-white">Request</Text>
          <View className="my-auto">
            <Ionicons name="add-sharp" color={"white"} size={19} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserRelation;
