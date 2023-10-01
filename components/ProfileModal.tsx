import {
  View,
  Pressable,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { object, string } from "yup";
import InputField from "./InputField";
import Email from "react-native-vector-icons/Entypo";
import User from "react-native-vector-icons/FontAwesome";
import Close from "react-native-vector-icons/FontAwesome";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import useUser from "../store/useUser";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ProfileModal = ({ setShowModel }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData } = useUser();

  const initialValues = {
    name: "",
    // email: "",
  };

  const validationSchema = object({
    name: string().required("Name is required"),
    // email: string().email("Invalid Email").required("Email is required"),
  });

  const handleOnSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      console.log(values);
      const docRef = doc(db, "users", userData.uid);
      const docData = await updateDoc(docRef, {
        name: values.name,
      });

      setUserData({
        email: userData?.email,
        name: values.name,
        photoUrl: userData?.photoUrl,
        uid: userData?.uid,
      });

      setIsLoading(false);
      setShowModel(false);
      Alert.alert("Success", "Name Updated Successfully 😉");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="borde-2 absolute z-10 h-[98vh] w-screen items-center justify-start border-priClr bg-black/50 pt-10">
        <View className="relative w-[90vw] rounded-lg bg-white p-5 py-6 shadow-md shadow-black">
          <Text className="text-center text-2xl font-bold text-priClr">
            Edit Profile
          </Text>
          <Pressable
            onPress={() => setShowModel(false)}
            className="absolute right-4 top-3"
          >
            <Close name="close" color={"#5EBAB0"} size={27} />
          </Pressable>
          <View>
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
                  {/* <InputField
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
                  /> */}

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

                  <TouchableOpacity
                    disabled={isLoading}
                    className={`
                    
                   mt-4 rounded-lg bg-actClr shadow shadow-black `}
                    onPress={() => handleSubmit()}
                  >
                    {!isLoading ? (
                      <Text className="p-2 text-center text-lg font-bold text-white">
                        Change
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
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileModal;
