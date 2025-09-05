import { Image, View } from "react-native"

import { useKeyboardVisible } from "@/shared/hooks/use-keyboard-visible"

export const AuthHeader = () => {
  const isKeyboardVisible = useKeyboardVisible()

  if (isKeyboardVisible) {
    return null
  }

  return (
    <View className="min-h-40 w-full items-center justify-center">
      <Image
        source={require("@/assets/logo.png")}
        className="h-[48px] w-[255px]"
      />
    </View>
  )
}
