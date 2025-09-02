import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"

import "@/styles/global.css"

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-900">
      <StatusBar style="auto" />
      <Text className="font-roboto text-lg text-white">Hello, World!</Text>
    </View>
  )
}
