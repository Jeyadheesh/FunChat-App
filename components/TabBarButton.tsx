import { View, Text } from "react-native";
import React from "react";

const TabBarButton = (props: any) => {
  const { data } = props;
  console.log(props);
  const focused = props.accessibilityState.selected;
  return (
    <View>
      <data.icon
        name={focused ? data.activeIcon : data.inActiveIcon}
        color={focused ? data.activeColor : data.inActiveColor}
        size={40}
      />
    </View>
  );
};

export default TabBarButton;
