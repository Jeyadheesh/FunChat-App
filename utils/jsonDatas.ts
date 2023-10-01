import Chats from "../screens/Chats";
import Explore from "../screens/Explore";
import Profile from "../screens/Profile";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ChatStack from "../components/ChatStack";

export const TabDatas = [
  {
    title: "Chats",
    activeIcon: "chatbubble-ellipses",
    inActiveIcon: "chatbubble-ellipses-outline",
    activeColor: "",
    inActiveColor: "gray",
    name: "Chats",
    component: ChatStack,
    icon: Ionicons,
  },
  {
    title: "Add Friends",
    activeIcon: "person-add-alt-1",
    inActiveIcon: "person-add-alt",
    activeColor: "",
    inActiveColor: "gray",
    name: "Explore",
    component: Explore,
    icon: MaterialIcons,
  },
  {
    title: "Profile",
    activeIcon: "settings",
    inActiveIcon: "settings-outline",
    activeColor: "",
    inActiveColor: "gray",
    name: "Profile",
    component: Profile,
    icon: Ionicons,
  },
];
