import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  time: {
    fontSize: 10,
    opacity: 0.5,
  },
  textShadow: {
    textShadowColor: "#5EBAB0",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  boxShadow: {
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    // backgroundColor: "black",
  },
  imageBorder: {
    borderRadius: 100,
    borderColor: "red",
    borderWidth: 2,
  },
  cgnameinfo1: {
    padding: "1rem 1rem",
    background: "#22c55e",
    position: "absolute",
    top: 0,
    right: "-1.3rem",
  },
  you: {
    marginRight: "auto",
    backgroundColor: "#c4b5fd",
    marginLeft: 17,
    opacity: 1,
    // color: "white",
  },

  youSpan: {
    position: "absolute",
    left: -10,
    top: 4,
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 14,
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#c4b5fd",
    transform: [{ rotate: "-90deg" }],
    // backgroundColor: "rgba(245, 53, 229, 1)",
  },

  me: {
    marginLeft: "auto",
    // backgroundColor: "rgba(67, 95, 219, 1)",
    backgroundColor: "#7dd3fc",
    marginRight: 17,
    opacity: 1,
    // height: "auto",
    // color: "white",
  },

  meSpan: {
    position: "absolute",
    right: -10,
    top: 4,
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 14,
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#7dd3fc",
    transform: [{ rotate: "-270deg" }],
    // backgroundColor: "rgba(245, 53, 229, 1)",
  },
  light: {
    color: "black",
    backgroundColor: "white",
  },
  dark: {
    color: "white",
    backgroundColor: "black",
  },
});

export default style;
