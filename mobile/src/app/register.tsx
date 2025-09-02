import { Text, TouchableOpacity, View } from "react-native"
import { router } from "expo-router"

export default function Register() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-900">
      <Text className="font-roboto text-lg text-white">Register Screen</Text>

      <TouchableOpacity
        className="mt-4 rounded bg-blue-500 p-2"
        onPress={() => router.back()}
      >
        <Text className="font-roboto text-lg text-white">Go to Login</Text>
      </TouchableOpacity>
    </View>
  )
}
