import { StyleSheet, Pressable, View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const ChatLoadingSkeleton = () => {
  return (
    <View className="mt-2">
      <MotiView
        transition={{
          type: "timing",
        }}
        //   animate={{ backgroundColor: dark ? "#000000" : "#ffffff" }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((data, i) => {
          return (
            <View key={i} className="p-2 py-2 flex-row gap-5 flex-1">
              {/* 1 */}
              <View className="pt-0.5">
                <Skeleton
                  colorMode={"light"}
                  radius="round"
                  height={75}
                  width={75}
                />
                <Spacer />
              </View>

              {/* 2 */}
              <View className="borde border-black pt-2 ">
                <View>
                  <Skeleton colorMode={"light"} height={25} width={"60%"} />
                  <Spacer height={9} />
                </View>
                <View>
                  <Skeleton colorMode={"light"} height={27} width={"77%"} />
                  <Spacer height={8} />
                </View>
              </View>
            </View>
          );
        })}
      </MotiView>
    </View>
  );
};

export default ChatLoadingSkeleton;
