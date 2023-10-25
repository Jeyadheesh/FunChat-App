import { View, Text } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const ChatBoxLoadingSkeleton = () => {
  return (
    <View>
      <MotiView transition={{ type: "timing" }}>
        {[0, 1, 2].map((data, i) => {
          return (
            <View key={i} className="mt-2">
              <View className="mx-auto w-[30%]">
                <Skeleton colorMode="light" height={32} width={"100%"} />
                <Spacer height={13} />
              </View>

              <View className="ml-auto mr-5 w-[40%]">
                <Skeleton colorMode="light" height={32} width={"100%"} />
                <Spacer height={8} />
              </View>

              <View className="ml-auto mr-5 w-[60%]">
                <Skeleton colorMode="light" height={200} width={"100%"} />
                <Spacer height={8} />
              </View>

              <View className="mr-auto ml-5 w-[50%]">
                <Skeleton colorMode="light" height={32} width={"100%"} />
                <Spacer height={8} />
              </View>

              <View className="mr-auto ml-5 w-[30%]">
                <Skeleton colorMode="light" height={32} width={"100%"} />
                <Spacer height={8} />
              </View>

              <View className="mr-auto ml-5 w-[60%]">
                <Skeleton colorMode="light" height={200} width={"100%"} />
                <Spacer height={8} />
              </View>
            </View>
          );
        })}
      </MotiView>
    </View>
  );
};

export default ChatBoxLoadingSkeleton;
