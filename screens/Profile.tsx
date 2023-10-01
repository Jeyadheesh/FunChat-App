import {
  View,
  Text,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import style from "../public/style";
import DarkBtn from "../components/DarkBtn";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ProfileModal from "../components/ProfileModal";
import useUser from "../store/useUser";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../config/firebase";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import useLoader from "../store/useLoaders";
import profile from "../assets/profile.png";
import Toast from "react-native-toast-message";

// import KeyboardSpacer from 'react-native-keyboard-spacer';

const Profile = () => {
  const [showModal, setShowModel] = useState<boolean>(false);
  const { userData, setUserData } = useUser();
  const { imgLoading, setImgLoading } = useLoader();

  const showToast = () => {
    Toast.show({
      type: "info", // Can be 'success', 'error', 'info', or 'custom'
      text1: "Hello", // The main text of the toast
      text2: "This is a toast message", // Optional secondary text
      visibilityTime: 3000, // Duration in milliseconds
      autoHide: true, // Auto-hide the toast
      position: "top",
    });
  };
  //

  const handleLogout = async () => {
    console.log("Pressed");
    try {
      await signOut(auth);
      setUserData(null);
    } catch (err) {
      console.warn(err.code);
    }
  };

  const handleProfileImg = async () => {
    let val: boolean;
    // setImgLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      // base64: true,
    });

    if (!result.canceled) {
      console.log(result);
      const docRef = doc(db, "users", userData.uid);

      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      const imagesRef = ref(storage, "profileImages/" + userData?.email);
      const uploadTask = uploadBytesResumable(imagesRef, blob);

      uploadTask.on("state_changed", (snapshot) => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // console.log("File available at", downloadURL);
          const docData = await updateDoc(docRef, {
            photoUrl: downloadURL,
          });

          setUserData({
            email: userData?.email,
            name: userData?.name,
            photoUrl: downloadURL,
            uid: userData?.uid,
          });
          setImgLoading(false);

          // val = true;
          // return val;
        });
      });
    } else {
      console.log("Image Picker Canceled");
      setImgLoading(false);
      // val = false;
      // return val;
    }
  };

  const handleImageLoader = async () => {
    setImgLoading(true);
    await handleProfileImg();
    // console.log("Value", val);
    // setImgLoading(val);
  };

  useEffect(() => {
    console.log(imgLoading);
  }, [imgLoading]);

  return (
    // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
    <View>
      {showModal && <ProfileModal setShowModel={setShowModel} />}
      {/* <Text className="text-2xl font-bold text-priClr">Your Details</Text> */}
      <TouchableOpacity
        onPress={() => handleImageLoader()}
        disabled={imgLoading}
        style={{
          // borderStyle: "dotted",
          borderColor: "#5EBAB0",
          borderWidth: 2,
        }}
        className="relative mx-auto mt-7 h-32 w-32  rounded-full"
        // onPress={() => handleProfileImg()}
      >
        {!imgLoading ? (
          userData?.photoUrl ? (
            <Image
              // onLoadStart={() => setImgLoading(true)}
              // onLoadEnd={() => setImgLoading(false)}
              style={{
                resizeMode: "contain",
                // borderColor: "#5EBAB0",
                // borderWidth: 2,
              }}
              className="h-full w-full  rounded-full"
              // resizeMode="cover"
              source={{ uri: userData?.photoUrl }}
            />
          ) : (
            <Image
              style={{
                resizeMode: "contain",
              }}
              className="h-full w-full  rounded-full"
              source={require("../assets/profile.png")}
            />
          )
        ) : (
          <ActivityIndicator size={"large"} className="h-full w-full" />
        )}
        <FontAwesome5
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            padding: 7,
            borderRadius: 50,
            backgroundColor: "#5EBAB0",
            // zIndex: 100,
          }}
          name="user-edit"
          size={15}
          color={"white"}
        />
      </TouchableOpacity>

      <View className="px-4">
        <View className="mt-5  flex-row">
          <Text className="w-[30vw] text-center  text-base font-bold text-sky-400">
            Name
          </Text>
          <Text className="w-[70vw] text-base font-bold text-blue-600">
            : {userData?.name}
          </Text>
        </View>

        <View className="mt-1 flex-row">
          <Text className=" w-[30vw] text-center text-base font-bold text-sky-400">
            Email
          </Text>
          <Text className=" w-[70vw] text-base font-bold text-blue-600">
            : {userData?.email}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setShowModel(true)}
          className="mx-auto mt-4 flex-row rounded-lg bg-actClr p-2 px-4"
        >
          <FontAwesome5
            style={{ marginTop: 3 }}
            name="user-edit"
            className=""
            size={20}
            color={"white"}
          />
          <Text className="pl-2 text-lg font-bold text-white">
            Edit Profile
          </Text>
        </TouchableOpacity>

        <View>
          <Text className="mt-8 text-2xl font-bold text-priClr">Settings</Text>
          <View className="mt-1">
            <DarkBtn isAuth={false} />
          </View>
        </View>

        <View className="px-1">
          <TouchableOpacity
            onPress={handleLogout}
            className="mt-4  flex-row justify-between rounded-lg bg-actClr p-3 px-4"
          >
            <Text className="text-base font-bold text-white">Sign Out</Text>
            <Entypo name="log-out" className="mr-5" size={23} color={"white"} />
          </TouchableOpacity>
        </View>

        {/* <Toast /> */}
        {/* <TouchableOpacity onPress={showToast} className="p-5 mt-5 bg-red-300">
          <Text>Button</Text>
        </TouchableOpacity> */}
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
};

export default Profile;
