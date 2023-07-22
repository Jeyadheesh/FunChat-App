import { FC, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useColorScheme } from "nativewind";
import { Switch, Text } from "react-native";
import Dark from "react-native-vector-icons/Fontisto";
import Light from "react-native-vector-icons/Entypo";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";

interface Prop {
  isAuth: boolean;
}

const DarkBtn = ({ isAuth }: Prop) => {
  // console.log(isAuth);

  // const [theme, setTheme] = useState<string>("light");
  const [forRender, setForRender] = useState<boolean>(true);
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

  const controlTheme = async () => {
    {
      try {
        const lsTheme: any = await AsyncStorage.getItem("theme");
        // let lsTheme = null;
        if (lsTheme) {
          // console.log("LsTheme1 : ", lsTheme);
          setColorScheme(lsTheme);
        } else {
          // console.log("LsTheme2 : ", lsTheme);
          setColorScheme("system");
        }
      } catch (error: any) {
        console.log("1", error.message);
      }
      // function setMode() {
      // theme == "dark" ? setColorScheme("dark") : setColorScheme("light");
      // console.log(theme);
      // }
    }
  };

  useEffect(() => {
    controlTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme: any = colorScheme === "light" ? "dark" : "light";
      // console.log("LsTheme3 : ", newTheme);
      setColorScheme(newTheme);
      await AsyncStorage.setItem("theme", newTheme);
    } catch (error: any) {
      console.log("2", error.message);
    }
  };

  const handleClick = () => {
    toggleTheme();
    // toggleColorScheme();
    setForRender((forRender) => !forRender);
  };

  return isAuth ? (
    <TouchableOpacity
      onPress={() => toggleTheme()}
      className="my-0 ml-auto mr-5 mt-2 rounded-lg bg-actClr p-2 text-center text-black dark:p-5"
    >
      {colorScheme === "dark" ? (
        <Light name="light-up" size={20} color="white" />
      ) : (
        <Dark name="night-clear" size={20} color="white" />
      )}
    </TouchableOpacity>
  ) : (
    <View className="borde my-auto flex-row justify-between border-black px-1">
      <Text className="my-auto text-base font-bold ">Dark Mode</Text>
      <Switch value={colorScheme === "dark"} onChange={toggleTheme} />
    </View>
  );
};

export default DarkBtn;
