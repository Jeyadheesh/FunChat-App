import React, { useEffect, useState } from "react";
import {
  Button,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import Register from "./Register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
// import {} from "react-native-screens";
import { styled } from "nativewind";
import style from "../public/style";
import DarkBtn from "./DarkBtn";
import Email from "react-native-vector-icons/Entypo";
// import Pass from "react-native-vector-icons/MaterialIcons";
import Pass from "react-native-vector-icons/Entypo";
import User from "react-native-vector-icons/FontAwesome";
import { Pressable } from "react-native";
import { Formik } from "formik";
import { object, string, ref as yupRef } from "yup";
import InputField from "./InputField";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../config/firebase";
import { ActivityIndicator } from "react-native";
import { collection, doc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const Register = ({ navigation }: any) => {
  // const navigation = useNavigation();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null | any>(null);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = object({
    name: string()
      .min(3, "Name must have atleast 3 letters")
      .required("Name is required"),
    email: string().email("Invalid Email").required("Email is required"),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: string()
      .equals([yupRef("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const userCollectionRef = collection(db, "users");

  const checkAuth = async () => {
    const userName = await AsyncStorage.getItem("userName");

    setUser(userName);
    if (userName != null) navigation.navigate("home");
  };
  useEffect(() => {
    // checkAuth();
  }, []);

  const handleProfileImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      // base64: true,
    });

    if (!result.canceled) {
      console.log(result.assets[0]);
      setImageUri(result.assets[0].uri);

      // console.log()
    } else {
      console.log("Image Picker Canceled");
    }
  };

  const handleOnSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      console.log(values.email, ":", values.password);
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(user.user.email);
      const docRef = doc(db, "users", user.user.uid);

      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const imagesRef = ref(storage, "profileImages/" + values.email);
        const uploadTask = uploadBytesResumable(imagesRef, blob);

        uploadTask.on("state_changed", (snapshot) => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // console.log("File available at", downloadURL);
            const docData = await setDoc(docRef, {
              name: values.name,
              email: values.email,
              // password: values.password,
              uid: user.user.uid,
              photoUrl: downloadURL,
            });
          });
        });
      } else {
        const docData = await setDoc(docRef, {
          name: values.name,
          email: values.email,
          // password: values.password,
          uid: user.user.uid,
          photoUrl: null,
        });
      }

      // const docReff = doc(db, `messages`, user.user.uid);
      // const docSet = await setDoc(docReff, {});

      // alert("You Registered Successfully");
    } catch (error) {
      alert(error.code);
    }
    setIsLoading(false);
  };

  // const handleError = (errors: any) => {
  //   console.log(Object.keys(errors).length);
  // };

  return (
    <SafeAreaView className="h-full items-center justify-center  gap-y-2  dark:bg-darkBgClr">
      <ScrollView className="borde-2 border-priClr">
        <View className="borde ">
          <DarkBtn isAuth={true} />
        </View>

        <View className={``}>
          <View className={`w-[100vw] px-2`}>
            <Image
              style={{
                resizeMode: "cover",
                // borderWidth: 1,
                // borderColor: "red",
                // borderRadius: 10,
              }}
              className="mx-auto h-[18vh] w-[70vw] "
              // style={{ resizeMode: "contain" }}
              source={require("../assets/auth(18).png")} // 18,21
            />
          </View>
        </View>

        <View className=" borde mx-auto mt-2.5 w-full  border-black px-4">
          <Text
            style={style.textShadow}
            className="text-center text-3xl font-bold text-priClr "
          >
            Register
          </Text>

          {/* Profile Img */}
          <View className="mt-2.5">
            <TouchableOpacity
              style={{
                // borderStyle: "dotted",
                borderColor: "#5EBAB0",
                borderWidth: 2,
              }}
              className="mx-auto h-20 w-20 overflow-hidden rounded-full"
              onPress={() => handleProfileImg()}
            >
              <Image
                style={{
                  resizeMode: "cover",
                }}
                className="h-full w-full "
                // resizeMode="cover"
                source={
                  imageUri
                    ? { uri: imageUri }
                    : require("../assets/profile.png")
                }
              />
            </TouchableOpacity>
          </View>

          {/*  */}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <InputField
                  fieldName="name"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.name}
                  keyboardType="default"
                  error={touched.name && errors.name}
                  errorValue={errors.name}
                  secureTextEntry={false}
                  iconName="user"
                  Icon={User}
                  isName={true}
                  placeholder="Name ..."
                />

                <InputField
                  fieldName="email"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.email}
                  keyboardType="email-address"
                  error={touched.email && errors.email}
                  errorValue={errors.email}
                  secureTextEntry={false}
                  iconName="email"
                  Icon={Email}
                  autoCapitalize={"none"}
                  placeholder="Email ..."
                />

                <InputField
                  fieldName="password"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.password}
                  keyboardType="default"
                  error={touched.password && errors.password}
                  errorValue={errors.password}
                  secureTextEntry={true}
                  iconName="shield"
                  Icon={Pass}
                  placeholder="Password ..."
                />

                <InputField
                  fieldName="confirmPassword"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.confirmPassword}
                  keyboardType="default"
                  error={touched.confirmPassword && errors.confirmPassword}
                  errorValue={errors.confirmPassword}
                  secureTextEntry={true}
                  iconName="shield"
                  Icon={Pass}
                  placeholder="Confirm Password ..."
                />

                <TouchableOpacity
                  disabled={isLoading}
                  className={`
                    
                   mt-4 rounded-lg bg-actClr shadow shadow-black `}
                  onPress={() => handleSubmit()}
                >
                  {!isLoading ? (
                    <Text className="p-2 text-center text-lg font-bold text-white">
                      Submit
                    </Text>
                  ) : (
                    <ActivityIndicator
                      className="p-3"
                      // size={"large"}
                      color={"white"}
                    />
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>

          {/*  */}
          <View>
            <Text className="mt-2.5 flex-row gap-x-3  text-center opacity-50">
              <Text>------------------- </Text>
              <Text> or, Register with </Text>
              <Text> -------------------</Text>
            </Text>

            <View className="borde mt-4 flex-row justify-evenly border-black">
              <TouchableOpacity className="mx-auto my-auto w-[40vw] flex-row rounded-lg bg-white p-2 shadow shadow-black">
                <Image
                  className="h-10 w-10 "
                  source={require("../assets/google.png")}
                />
                <Text className="my-auto ml-3 font-bold">Google</Text>
              </TouchableOpacity>

              {/* IconColor : bg-[#1877f2] */}
              <TouchableOpacity className="mx-auto  my-auto w-[40vw] flex-row rounded-lg bg-white  p-2  shadow shadow-black">
                <Image
                  // style={{
                  //   shadowColor: "#000",
                  //   shadowOffset: { width: 0, height: 2 },
                  //   shadowOpacity: 0.4,
                  //   shadowRadius: 4,
                  // }}
                  className="h-10 w-10 rounded-full bg-white"
                  source={require("../assets/fb.png")}
                />
                <Text className="text-whit my-auto ml-3 font-bold">
                  FaceBook
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="borde mt-3 w-full flex-row border-black text-center text-sm font-bold">
              <Text>Already Have Account? </Text>
              <Text
                className="text-actClr underline "
                onPress={() => navigation.goBack()}
              >
                Log In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
