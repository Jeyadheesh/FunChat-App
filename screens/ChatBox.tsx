import {
  View,
  Text,
  TextInput,
  TextInputComponent,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native";
import style from "../public/style";
import { Image } from "react-native";
import ImageViewer from "../components/ImageViewer";
import {
  addDoc,
  and,
  collection,
  doc,
  onSnapshot,
  or,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { ActivityIndicator } from "react-native";
import { handleUploadImg } from "../utils/functions";
import Messages from "../components/Messages";
import moment from "moment";
// import {
//   wrapScrollView,
//   useScrollIntoView,
// } from "react-native-scroll-into-view";
// import { wrapScrollViewHOC } from "react-native-scroll-into-view/build/hoc";
// const CustomScrollView = wrapScrollView(ScrollView);

const ChatBox = ({ navigation, route }: any) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [msgLoading, setMsgLoading] = useState(true);
  const [imageUri, setImageUri] = useState<string | null | any>(null);
  const [visible, setVisible] = useState(false);
  const {
    receiverName,
    receiverPhotoUrl,
    receiverUid,
    curUserUid,
    curUserName,
  } = route.params;
  const messagesRef = collection(db, `messages`);

  // console.log("Rec:", route.params.receiverUid);
  // console.log("Sen:", route.params.curUserUid);

  // console.log(new Date(Date.now()).toLocaleDateString());
  // console.log(new Date(Date.now()).toLocaleTimeString());
  let a: string;
  const handleUpload = async () => {
    // setSending(true);
    const val = await handleUploadImg(curUserUid, receiverUid);
    // setSending(val);
  };
  // const scrollIntoView = useScrollIntoView();
  const scrollViewRef = useRef<ScrollView>();
  const viewRef = useRef<View>();

  const scrollToBottom = () => {
    try {
      // console.log(messages.length);
      scrollViewRef?.current?.scrollToEnd({ animated: true });
      // viewRef?.current?.scrollIntoView({ animated: true });
      // scrollIntoView(viewRef.current);
    } catch (error) {
      console.log("scroll err : ", error.message);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollViewRef.current]);

  const handleSend = async () => {
    try {
      if (message != "") {
        setMessage("");
        // setSending(true);
        // const docRef = collection(db, `messages/${curUserUid}/userMsgs`);
        // const messageRef = collection(db, "messages");
        const docData = await addDoc(messagesRef, {
          senderUid: curUserUid,
          receiverUid: receiverUid,
          message: message,
          isString: true,
          createdAt: serverTimestamp(),
          createdDate: new Date(Date.now()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          createdTime: new Date(Date.now()).toLocaleTimeString(),
        });

        // const docSet = await setDoc(docRef, {});

        setSending(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMessage = async () => {
    try {
      console.log("getMessage");
      setMsgLoading(true);
      const q = query(
        messagesRef,
        or(
          and(
            where("senderUid", "==", receiverUid),
            where("receiverUid", "==", curUserUid)
          ),
          and(
            where("senderUid", "==", curUserUid),
            where("receiverUid", "==", receiverUid)
          )
        ),
        orderBy("createdAt")
      );
      onSnapshot(q, (snapshot) => {
        let msgArray: any = [];
        snapshot.forEach((doc) => {
          msgArray.push(doc.data());
        });
        setMessages(msgArray);
        setMsgLoading(false);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const todayDate = moment(new Date()).format("MMM DD, YYYY");
  const yesterdayDate = moment(new Date())
    .subtract(1, "days")
    .format("MMM DD, YYYY");

  useEffect(() => {
    getMessage();
    // console.log(messages);
  }, []);

  return (
    <View className="borde-2 h-full border-priClr ">
      <ImageBackground
        className="mb-16 overflow-hidden"
        resizeMode="cover"
        style={{ opacity: 1 }}
        source={require("../assets/chatbg2.jpg")}
      >
        <ScrollView
          ref={scrollViewRef}
          className="borde mb-16 mt-2 h-full border-priClr"
        >
          {!msgLoading ? (
            messages.map((message: any, i) => {
              return (
                <View key={i}>
                  <Text
                    className={`${
                      a == message.createdDate
                        ? "hidden"
                        : (a = message.createdDate)
                    } mx-auto my-1 mb-2.5 w-fit rounded bg-purple-500 p-1 px-4 text-center font-semibold text-slate-200`}
                  >
                    {message.createdDate == todayDate
                      ? "Today"
                      : message.createdDate == yesterdayDate
                      ? "Yesterday"
                      : message.createdDate}
                  </Text>
                  {message.senderUid == curUserUid ? (
                    <Messages
                      // refs={refs}
                      message={message}
                      i={i}
                      who={style.me}
                      whoSpan={style.meSpan}
                    />
                  ) : (
                    <Messages
                      // refs={refs}
                      message={message}
                      i={i}
                      who={style.you}
                      whoSpan={style.youSpan}
                    />
                  )}
                </View>
              );
            })
          ) : (
            <ActivityIndicator
              size={"large"}
              color={"#A033CE"}
              className="mt-10"
            />
          )}

          {/* <View
            style={style.you}
            className="relative  my-1 w-[60vw] rounded-lg bg-violet-300 p-2 shadow shadow-black "
          >
            <Text>TextMe</Text>

            <View style={style.youSpan} className=""></View>
          </View> */}
          {/* <View ref={viewRef} className="bg-red-800">
            <Text>hai</Text>
          </View> */}
        </ScrollView>
      </ImageBackground>

      <View className="min-h-12 absolute bottom-1 mx-auto max-h-28 w-full flex-row bg-transparent ">
        {/* <View className="mb-3 mt-auto">
          <MaterialCommunityIcons name="message" color={"black"} size={22} />
        </View> */}

        <View className="relative mt-2 w-[85vw] px-2">
          <TextInput
            value={message}
            onChangeText={(value) => setMessage(value)}
            className="relative  h-[90%] w-full  rounded-lg border-2
           border-gray-400 bg-gray-50  p-2 px-10 pl-10 text-base  leading-5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700    dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Enter Message ..."
            multiline={true}
          />

          <View className="absolute bottom-4 left-4 ">
            <MaterialCommunityIcons
              name="android-messages"
              color={"gray"}
              size={22}
            />
          </View>

          <TouchableOpacity
            onPress={() => handleUpload()}
            className={` absolute bottom-4 right-5 `}
          >
            <MaterialCommunityIcons
              name="file-image-plus"
              color={"gray"}
              size={23}
            />
          </TouchableOpacity>
        </View>
        <View className="">
          <TouchableOpacity
            disabled={sending}
            onPress={handleSend}
            className={`mb-2 mt-auto rounded-full bg-actClr  p-3 px-3`}
          >
            {!sending ? (
              <MaterialCommunityIcons name="send" color={"white"} size={22} />
            ) : (
              <ActivityIndicator
                className="w-full"
                size={"small"}
                color={"#A033CE"}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatBox;
