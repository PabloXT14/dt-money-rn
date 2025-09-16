import { ActivityIndicator, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors } from "@/shared/colors"

export const Loading = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-20 bg-background-primary">
      <Image
        className="h-[48px] w-[255px]"
        source={require("@/assets/logo.png")}
        alt="logo"
      />
      <ActivityIndicator color={colors.white} />
    </SafeAreaView>
  )
}
