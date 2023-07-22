import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native";

// interface Props {
//     fieldName,
//     handleChange,
//     handleBlur,
//     value,
//     keyboardType,
//     error,
//     errorValue,
//     secureTextEntry,
//     iconName,
// }

const InputField = ({
  fieldName,
  handleChange,
  handleBlur,
  value,
  keyboardType,
  error,
  errorValue,
  secureTextEntry,
  iconName,
  Icon,
  placeholder,
  isName,
  autoCapitalize,
}: any): any => {
  return (
    <View className="mt-3">
      <View className="relative">
        <View
          className={`${
            isName ? "left-3.5" : "left-2.5"
          } pointer-events-none absolute top-[25%] z-10 items-center   justify-center opacity-80`}
        >
          <Icon name={iconName} size={23} color={"#333"} />
        </View>
        <TextInput
          secureTextEntry={secureTextEntry}
          onChangeText={handleChange(fieldName)}
          onBlur={handleBlur(fieldName)}
          value={value} // values.password
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          className={` ${
            error
              ? "border-red-500  focus:border-red-500"
              : " border-gray-300  focus:border-blue-500"
          }
               block w-full  rounded-lg  border-2 bg-gray-50
          p-2.5 pl-10 text-sm text-gray-900  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white  dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
          placeholder={placeholder}
        />
      </View>
      {error && (
        <Text className="pl-1 text-xs  text-red-600">{errorValue}</Text>
      )}
    </View>
  );
};

export default InputField;
