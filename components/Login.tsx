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
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import style from "../public/style";
import DarkBtn from "./DarkBtn";
import Email from "react-native-vector-icons/Entypo";
import Pass from "react-native-vector-icons/MaterialIcons";
import { Formik } from "formik";
import { object, string, ref } from "yup";
import InputField from "./InputField";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
// GoogleSignin.configure();

const Login = ({ navigation }: any) => {
  // const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     setUserInfo({ userInfo });
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = object({
    email: string().email("Invalid Email").required("Email is required"),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleOnSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      console.log(values);
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("Profile : ", user.user.uid);
    } catch (error) {
      alert(error.code);
    }
    setIsLoading(false);
  };

  const googleSignIn = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      console.log("Google : ", user);
    } catch (err) {
      console.log(err);
      // alert(err);
    }
  };

  return (
    <SafeAreaView className="h-full items-center justify-center  gap-y-2  dark:bg-darkBgClr">
      <ScrollView className="borde-2 border-priClr">
        <View className="borde ">
          <DarkBtn isAuth={true} />
        </View>
        {/* <ActivityIndicator size={"large"} color={"black"} /> */}
        <View className={`h-[40vh]`}>
          <View className={`h-full w-[100vw] px-2`}>
            <Image
              borderRadius={10}
              style={{
                resizeMode: "cover",
                // borderWidth: 1,
                // borderColor: "red",
                // borderRadius: 10,
              }}
              className="mx-auto h-full w-[90vw] "
              // style={{ resizeMode: "contain" }}
              source={require("../assets/auth(17).png")} // 1,
            />
          </View>
        </View>

        <View className=" borde mx-auto w-full   border-black px-4">
          <Text
            style={style.textShadow}
            className="text-center text-3xl font-bold text-priClr "
          >
            Login
          </Text>

          {/*  */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
          >
            {({
              handleBlur,
              handleChange,
              touched,
              values,
              errors,
              handleSubmit,
            }) => (
              <>
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
                  iconName="security"
                  Icon={Pass}
                  placeholder="Password ..."
                />

                <TouchableOpacity
                  disabled={isLoading}
                  className={`
                    
                   mt-4 rounded-lg bg-actClr shadow shadow-black `}
                  onPress={() => handleSubmit()}
                >
                  {!isLoading ? (
                    <Text className="p-2 text-center text-lg font-bold text-white">
                      Login
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
            <Text className="mt-4 flex-row gap-x-3  text-center opacity-50">
              <Text>------------------- </Text>
              <Text> or, Login with </Text>
              <Text> -------------------</Text>
            </Text>

            <View className="borde mt-6 flex-row justify-evenly border-black">
              <TouchableOpacity
                // onPress={() => signIn()}
                className="mx-auto my-auto w-[40vw] flex-row rounded-lg bg-white p-2 shadow shadow-black"
              >
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

            <Text className="borde mt-4 w-full flex-row border-black text-center text-sm font-bold">
              <Text>New User ? </Text>
              {/* <TouchableOpacity> */}
              <Text
                className="text-actClr underline"
                onPress={() => navigation.navigate("register")}
              >
                Sign Up
              </Text>
              {/* </TouchableOpacity> */}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
