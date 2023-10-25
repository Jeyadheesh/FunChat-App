import { StyleSheet, Pressable, View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const ExploreLoadingSkeleton = () => {
  return (
    <View className="mt-5">
      <MotiView
        transition={{
          type: "timing",
        }}
        //   animate={{ backgroundColor: dark ? "#000000" : "#ffffff" }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((data, i) => {
          return (
            <View key={i} className="p-2 py-2 flex-row gap-6">
              {/* 1 */}
              <View>
                <Skeleton
                  colorMode={"light"}
                  radius="round"
                  height={75}
                  width={75}
                />
                <Spacer />
              </View>

              {/* 2 */}
              <View className="borde  flex-row flex-1 border-black pt-4 w-full">
                <View className="w-[50%]">
                  <Skeleton colorMode={"light"} height={27} width={"80%"} />
                  <Spacer height={8} />
                </View>
                <View className="w-[50%] ">
                  <View className="w-fit ml-auto">
                    <Skeleton colorMode={"light"} height={27} width={"70%"} />
                    <Spacer height={8} />
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </MotiView>
    </View>
  );
};

export default ExploreLoadingSkeleton;
